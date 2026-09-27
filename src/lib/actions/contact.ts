"use server";

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

  if (!isMailConfigured()) {
    return { error: "Messages can't be sent right now. Please email us directly." };
  }

  try {
    await sendContactMessage(parsed.data);
  } catch (error) {
    console.error("Contact email failed", error);
    return { error: "We couldn't send your message. Please try again." };
  }

  return { ok: true };
}
