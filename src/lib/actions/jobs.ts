"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { jobs, type JobStatus } from "@/lib/db/schema";
import { countApplicationsForJob } from "@/lib/applications";
import { generateUniqueSlug } from "@/lib/jobs";
import { JOB_STATUSES } from "@/lib/job-options";
import {
  fieldErrors,
  isUuid,
  jobFormToInput,
  jobInputSchema,
} from "@/lib/validation";

export type JobFormState =
  | { error?: string; fieldErrors?: Record<string, string> }
  | undefined;

async function persistJob(
  id: string | null,
  formData: FormData,
): Promise<JobFormState> {
  const session = await requireAdmin();

  const parsed = jobInputSchema.safeParse(jobFormToInput(formData));
  if (!parsed.success) {
    return {
      error: "Please fix the highlighted fields.",
      fieldErrors: fieldErrors(parsed.error),
    };
  }

  const data = parsed.data;
  const db = getDb();
  const slug = await generateUniqueSlug(
    data.slug?.trim() || data.title,
    id ?? undefined,
  );

  const values = {
    slug,
    title: data.title,
    department: data.department ?? null,
    employmentType: data.employmentType,
    location: data.location,
    experienceLevel: data.experienceLevel ?? null,
    salaryMin: data.salaryNegotiable ? null : (data.salaryMin ?? null),
    salaryMax: data.salaryNegotiable ? null : (data.salaryMax ?? null),
    salaryCurrency: data.salaryCurrency,
    salaryPeriod: data.salaryPeriod,
    salaryNegotiable: data.salaryNegotiable,
    description: data.description,
    responsibilities: data.responsibilities,
    requirements: data.requirements,
    benefits: data.benefits,
    applicationDeadline: data.applicationDeadline ?? null,
    status: data.status,
    updatedAt: new Date(),
  };

  if (id) {
    await db.update(jobs).set(values).where(eq(jobs.id, id));
  } else {
    await db.insert(jobs).values({ ...values, createdBy: session.userId });
  }

  revalidatePath("/admin/jobs");
  revalidatePath("/career");
  revalidatePath(`/career/${slug}`);
  redirect("/admin/jobs?saved=1");
}

export async function createJobAction(
  _prev: JobFormState,
  formData: FormData,
): Promise<JobFormState> {
  return persistJob(null, formData);
}

export async function updateJobAction(
  _prev: JobFormState,
  formData: FormData,
): Promise<JobFormState> {
  const id = String(formData.get("id") ?? "");
  if (!isUuid(id)) return { error: "Missing job id." };
  return persistJob(id, formData);
}

function isJobStatus(value: string): value is JobStatus {
  return (JOB_STATUSES as readonly string[]).includes(value);
}

export async function setJobStatusAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!isUuid(id) || !isJobStatus(status)) return;

  const db = getDb();
  await db
    .update(jobs)
    .set({ status, updatedAt: new Date() })
    .where(eq(jobs.id, id));

  revalidatePath("/admin/jobs");
  revalidatePath("/career");
}

export async function deleteJobAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!isUuid(id)) return;

  // Applications reference the job with ON DELETE RESTRICT — close it instead.
  const applications = await countApplicationsForJob(id);
  if (applications > 0) {
    redirect("/admin/jobs?error=has-applications");
  }

  const db = getDb();
  await db.delete(jobs).where(eq(jobs.id, id));

  revalidatePath("/admin/jobs");
  revalidatePath("/career");
}
