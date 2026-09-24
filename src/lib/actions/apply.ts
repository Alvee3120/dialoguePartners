"use server";

import { createHash, randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { applications } from "@/lib/db/schema";
import { getOpenJobBySlug } from "@/lib/jobs";
import { isR2Configured, uploadObject } from "@/lib/r2";
import {
  applicationFormToInput,
  applicationInputSchema,
  fieldErrors,
} from "@/lib/validation";

export type ApplyState =
  | { ok?: boolean; error?: string; fieldErrors?: Record<string, string> }
  | undefined;

const MAX_CV_BYTES = 5 * 1024 * 1024;

const ALLOWED_CV_TYPES: Record<string, string> = {
  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    ".docx",
};

export async function submitApplicationAction(
  _prev: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  // Honeypot: real users never fill this hidden field.
  if (String(formData.get("company_website") ?? "").trim() !== "") {
    return { ok: true };
  }

  const slug = String(formData.get("jobSlug") ?? "");
  const job = await getOpenJobBySlug(slug);
  if (!job) {
    return { error: "This role is no longer accepting applications." };
  }

  const parsed = applicationInputSchema.safeParse(
    applicationFormToInput(formData, job.id),
  );
  if (!parsed.success) {
    return {
      error: "Please fix the highlighted fields.",
      fieldErrors: fieldErrors(parsed.error),
    };
  }

  const cv = formData.get("cv");
  if (!(cv instanceof File) || cv.size === 0) {
    return {
      error: "Please attach your CV.",
      fieldErrors: { cv: "Attach your CV (PDF, DOC or DOCX)." },
    };
  }
  if (cv.size > MAX_CV_BYTES) {
    return {
      error: "Your CV is too large.",
      fieldErrors: { cv: "Maximum file size is 5MB." },
    };
  }
  const extension = ALLOWED_CV_TYPES[cv.type];
  if (!extension) {
    return {
      error: "Unsupported file type.",
      fieldErrors: { cv: "Upload a PDF, DOC or DOCX file." },
    };
  }
  if (!isR2Configured()) {
    return { error: "Applications can't be accepted yet. Please try again later." };
  }

  const key = `cv/${job.id}/${randomUUID()}${extension}`;

  try {
    await uploadObject({
      key,
      body: Buffer.from(await cv.arrayBuffer()),
      contentType: cv.type,
    });
  } catch (error) {
    console.error("CV upload to R2 failed", error);
    return { error: "We couldn't upload your CV. Please try again." };
  }

  const forwardedFor = (await headers()).get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim();
  const ipHash = ip
    ? createHash("sha256").update(ip).digest("hex").slice(0, 32)
    : null;

  const db = getDb();
  await db.insert(applications).values({
    jobId: job.id,
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    coverLetter: parsed.data.coverLetter ?? null,
    linkedinUrl: parsed.data.linkedinUrl ?? null,
    cvKey: key,
    cvFilename: cv.name.slice(0, 200),
    cvMime: cv.type,
    cvSize: cv.size,
    ipHash,
  });

  revalidatePath("/admin/applications");
  return { ok: true };
}
