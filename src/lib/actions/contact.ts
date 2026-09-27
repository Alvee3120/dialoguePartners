"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";
import { isMailConfigured, sendContactMessage } from "@/lib/mail";
import {
  contactFormToInput,
  contactInputSchema,
  fieldErrors,
} from "@/lib/validation";

export type ContactState =
  | { ok?: boolean; error?: string; fieldErrors?: Record<string, string> }
  | undefined;

export async function submitContactAction(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real users never fill this hidden field.
  if (String(formData.get("company_website") ?? "").trim() !== "") {
    return { ok: true };
  }

  const parsed = contactInputSchema.safeParse(contactFormToInput(formData));
  if (!parsed.success) {
    return {
      error: "Please fix the highlighted fields.",
      fieldErrors: fieldErrors(parsed.error),
    };
  }

  const forwardedFor = (await headers()).get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim();
  const ipHash = ip
    ? createHash("sha256").update(ip).digest("hex").slice(0, 32)
    : null;

  const db = getDb();
  let messageId: string;
  try {
    const [row] = await db
      .insert(contactMessages)
      .values({ ...parsed.data, ipHash })
      .returning({ id: contactMessages.id });
    messageId = row.id;
  } catch (error) {
    console.error("Saving contact message failed", error);
    return { error: "We couldn't send your message. Please try again." };
  }

  if (isMailConfigured()) {
    // Fire-and-forget: the message is already saved above, so the visitor
    // doesn't need to wait on the SMTP round-trip to see success.
    sendContactMessage(parsed.data)
      .then(() =>
        db
          .update(contactMessages)
          .set({ emailSentAt: new Date() })
          .where(eq(contactMessages.id, messageId)),
      )
      .catch((error) => {
        console.error("Contact email failed", error);
      });
  }

  return { ok: true };
}
