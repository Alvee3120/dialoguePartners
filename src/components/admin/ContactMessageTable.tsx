import Link from "next/link";
import type { ContactMessage } from "@/lib/db/schema";
import { formatDateTime } from "@/lib/format";
import { CONTACT_INTEREST_LABELS } from "@/lib/job-options";

export default function ContactMessageTable({
  messages,
}: {
  messages: ContactMessage[];
}) {
  if (messages.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
        <p className="text-sm font-medium text-ink">No messages yet.</p>
        <p className="mt-1 text-sm text-foreground">
          Submissions from the contact form will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-white">
      <table className="w-full min-w-[52rem] text-left text-sm">
        <thead className="bg-paper text-xs uppercase tracking-[0.15em] text-foreground/60">
          <tr>
            <th className="px-4 py-3 font-semibold">From</th>
            <th className="px-4 py-3 font-semibold">Interest</th>
            <th className="px-4 py-3 font-semibold">Message</th>
            <th className="px-4 py-3 font-semibold">Received</th>
            <th className="px-4 py-3 font-semibold">Email</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id} className="border-t border-line align-top">
              <td className="px-4 py-4">
                <Link
                  href={`/admin/messages/${message.id}`}
                  className="font-medium text-ink transition-colors hover:text-accent-deep"
                >
                  {message.name}
                </Link>
                <p className="mt-0.5 text-xs text-foreground/70">
                  {message.email}
                </p>
                {message.company ? (
                  <p className="mt-0.5 text-xs text-foreground/50">
                    {message.company}
                  </p>
                ) : null}
              </td>
              <td className="px-4 py-4 text-foreground">
                {message.interest
                  ? (CONTACT_INTEREST_LABELS[message.interest] ??
                    message.interest)
                  : "—"}
              </td>
              <td className="max-w-xs px-4 py-4 text-foreground">
                <p className="line-clamp-2">{message.message}</p>
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-foreground">
                {formatDateTime(message.createdAt)}
              </td>
              <td className="px-4 py-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    message.emailSentAt
                      ? "bg-accent-soft text-accent-deep"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {message.emailSentAt ? "Sent" : "Not sent"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
