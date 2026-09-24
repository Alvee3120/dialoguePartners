import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import StatusSelect from "@/components/admin/StatusSelect";
import { getApplicationById } from "@/lib/applications";
import { formatDate } from "@/lib/format";
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

export default async function ApplicationDetailPage({ params }: PageProps) {
  const { id } = await params;
  if (!isUuid(id)) notFound();

  const application = await getApplicationById(id);
  if (!application) notFound();

  return (
    <div>
      <Link
        href="/admin/applications"
        className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-deep hover:underline"
      >
        ← All applications
      </Link>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">
            {application.name}
          </h1>
          <p className="mt-1 text-sm text-foreground">
            Applied for{" "}
            <Link
              href={`/admin/jobs/${application.jobId}/edit`}
              className="text-accent-deep hover:underline"
            >
              {application.jobTitle}
            </Link>{" "}
            on {formatDate(application.createdAt)}
          </p>
        </div>
        <StatusSelect id={application.id} status={application.status} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-line bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-accent-deep">
            Contact
          </h2>
          <dl className="mt-5 space-y-5">
            <Detail label="Email">
              <a
                href={`mailto:${application.email}`}
                className="text-accent-deep hover:underline"
              >
                {application.email}
              </a>
            </Detail>
            <Detail label="Mobile">
              <a
                href={`tel:${application.phone.replace(/\s/g, "")}`}
                className="text-accent-deep hover:underline"
              >
                {application.phone}
              </a>
            </Detail>
            {application.linkedinUrl ? (
              <Detail label="LinkedIn">
                <a
                  href={application.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-accent-deep hover:underline"
                >
                  {application.linkedinUrl}
                </a>
              </Detail>
            ) : null}
          </dl>
        </section>

        <section className="rounded-2xl border border-line bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-accent-deep">
            CV
          </h2>
          <p className="mt-5 break-all text-sm text-ink">
            {application.cvFilename}
          </p>
          <p className="mt-1 text-xs text-foreground/60">
            {(application.cvSize / 1024).toFixed(0)} KB · {application.cvMime}
          </p>
          <a
            href={`/api/admin/applications/${application.id}/cv`}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent-deep px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy"
          >
            Download CV
            <span aria-hidden="true">↓</span>
          </a>
        </section>
      </div>

      {application.coverLetter ? (
        <section className="mt-6 rounded-2xl border border-line bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-accent-deep">
            Note from candidate
          </h2>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-foreground">
            {application.coverLetter}
          </p>
        </section>
      ) : null}
    </div>
  );
}
