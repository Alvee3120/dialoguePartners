import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import {
  CONTACT_INTEREST_LABELS as INTEREST_LABELS,
  CONTACT_ROLE_LABELS as ROLE_LABELS,
} from "@/lib/job-options";
import type { ApplicationInput, ContactInput } from "@/lib/validation";

const DEFAULT_HOST = "mail.privateemail.com";
const DEFAULT_PORT = 465;

let cached: Transporter | undefined;

/** True when the SMTP credentials needed to send mail are present. */
export function isMailConfigured(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransport(): Transporter {
  if (cached) return cached;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    throw new Error(
      "Mail is not configured. Set SMTP_USER and SMTP_PASS (see .env.example).",
    );
  }

  const port = Number(process.env.SMTP_PORT ?? DEFAULT_PORT);

  cached = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? DEFAULT_HOST,
    port,
    // 465 is implicit TLS; 587/25 upgrade via STARTTLS.
    secure: port === 465,
    auth: { user, pass },
  });

  return cached;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Send a contact-form submission to the team inbox, with the sender as reply-to. */
export async function sendContactMessage(input: ContactInput): Promise<void> {
  const user = process.env.SMTP_USER as string;
  const to = process.env.CONTACT_TO_EMAIL ?? user;
  const from = process.env.SMTP_FROM ?? `"Dialogue Partners Website" <${user}>`;

  const rows: [string, string | undefined][] = [
    ["Name", input.name],
    ["Company", input.company],
    ["Email", input.email],
    ["Phone", input.phone],
    ["I am a", input.role ? (ROLE_LABELS[input.role] ?? input.role) : undefined],
    [
      "Area of interest",
      input.interest ? (INTEREST_LABELS[input.interest] ?? input.interest) : undefined,
    ],
  ];

  const textLines = rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`);
  textLines.push("", "Message:", input.message);

  const htmlRows = rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#445566">${escapeHtml(
          label,
        )}</td><td style="padding:4px 0;color:#10202f"><strong>${escapeHtml(
          value as string,
        )}</strong></td></tr>`,
    )
    .join("");

  await getTransport().sendMail({
    from,
    to,
    replyTo: input.email,
    subject: `New contact message from ${input.name}`,
    text: textLines.join("\n"),
    html: `<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${htmlRows}</table>
<p style="font-family:sans-serif;font-size:14px;color:#10202f;white-space:pre-wrap;margin-top:16px">${escapeHtml(
      input.message,
    )}</p>`,
  });
}

export type ApplicationNotificationInput = ApplicationInput & {
  jobTitle: string;
  cv: { filename: string; buffer: Buffer; contentType: string };
};

/** Send a job-application notification to the team inbox, with the applicant as reply-to. */
export async function sendApplicationNotification(
  input: ApplicationNotificationInput,
): Promise<void> {
  const user = process.env.SMTP_USER as string;
  const to = process.env.CONTACT_TO_EMAIL ?? user;
  const from = process.env.SMTP_FROM ?? `"Dialogue Partners Website" <${user}>`;

  const rows: [string, string | undefined][] = [
    ["Role", input.jobTitle],
    ["Name", input.name],
    ["Email", input.email],
    ["Phone", input.phone],
    ["LinkedIn", input.linkedinUrl],
  ];

  const textLines = rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`);
  if (input.coverLetter) {
    textLines.push("", "Cover letter:", input.coverLetter);
  }

  const htmlRows = rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#445566">${escapeHtml(
          label,
        )}</td><td style="padding:4px 0;color:#10202f"><strong>${escapeHtml(
          value as string,
        )}</strong></td></tr>`,
    )
    .join("");

  const coverLetterHtml = input.coverLetter
    ? `<p style="font-family:sans-serif;font-size:14px;color:#10202f;white-space:pre-wrap;margin-top:16px">${escapeHtml(
        input.coverLetter,
      )}</p>`
    : "";

  await getTransport().sendMail({
    from,
    to,
    replyTo: input.email,
    subject: `New application: ${input.name} for ${input.jobTitle}`,
    text: textLines.join("\n"),
    html: `<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${htmlRows}</table>${coverLetterHtml}`,
    attachments: [
      {
        filename: input.cv.filename,
        content: input.cv.buffer,
        contentType: input.cv.contentType,
      },
    ],
  });
}
