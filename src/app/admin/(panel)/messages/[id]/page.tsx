import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/auth";
import { getContactMessageById } from "@/lib/contact-messages";
import { formatDateTime } from "@/lib/format";
import { CONTACT_INTEREST_LABELS, CONTACT_ROLE_LABELS } from "@/lib/job-options";
import { isUuid } from "@/lib/validation";

type PageProps = {
  params: Promise<{ id: string }>;
};

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/50">
        {label}
      </dt>
      <dd className="text-sm text-ink">{children}</dd>
    </div>
  );
}

export default async function MessageDetailPage({ params }: PageProps) {
  await requireAdmin();

  const { id } = await params;
  if (!isUuid(id)) notFound();

  const message = await getContactMessageById(id);
  if (!message) notFound();

  return (
    <div>
      <Link
        href="/admin/messages"
        className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-deep hover:underline"
      >
        ← All messages
      </Link>

      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
        {message.name}
      </h1>
      <p className="mt-1 text-sm text-foreground">
        Received {formatDateTime(message.createdAt)} ·{" "}
        {message.emailSentAt
          ? `notification emailed ${formatDateTime(message.emailSentAt)}`
          : "notification email not sent"}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-line bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-accent-deep">
            Contact
          </h2>
          <dl className="mt-5 space-y-5">
            <Detail label="Email">
              <a
                href={`mailto:${message.email}`}
                className="text-accent-deep hover:underline"
              >
                {message.email}
              </a>
            </Detail>
            {message.phone ? (
              <Detail label="Phone">
                <a
                  href={`tel:${message.phone.replace(/\s/g, "")}`}
                  className="text-accent-deep hover:underline"
                >
                  {message.phone}
                </a>
              </Detail>
            ) : null}
            {message.company ? (
              <Detail label="Company">{message.company}</Detail>
            ) : null}
          </dl>
        </section>

        <section className="rounded-2xl border border-line bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-accent-deep">
            About the sender
          </h2>
          <dl className="mt-5 space-y-5">
            <Detail label="I am a">
              {message.role
                ? (CONTACT_ROLE_LABELS[message.role] ?? message.role)
                : "—"}
            </Detail>
            <Detail label="Area of interest">
              {message.interest
                ? (CONTACT_INTEREST_LABELS[message.interest] ??
                  message.interest)
                : "—"}
            </Detail>
          </dl>
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-line bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-accent-deep">
          Message
        </h2>
        <p className="mt-4 whitespace-pre-line break-words text-sm leading-relaxed text-foreground">
          {message.message}
        </p>
      </section>
    </div>
  );
}
