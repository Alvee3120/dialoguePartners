import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/site/Container";
import ApplyForm from "@/components/career/ApplyForm";
import { getOpenJobBySlug } from "@/lib/jobs";
import { employmentTypeLabel, formatDate, formatSalary } from "@/lib/format";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getOpenJobBySlug(slug);
  if (!job) return {};
  return {
    title: job.title,
    description: `${job.title} — ${job.location}. Apply now at Dialogue Partners.`,
  };
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs uppercase tracking-[0.15em] text-foreground/50">
        {label}
      </dt>
      <dd className="text-sm font-medium text-ink">{value}</dd>
    </div>
  );
}

function BulletList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed">
            <span
              aria-hidden="true"
              className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-deep"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await getOpenJobBySlug(slug);
  if (!job) notFound();

  return (
    <>
      <section className="border-b border-line bg-paper py-14 sm:py-16">
        <Container>
          <Link
            href="/career"
            className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-deep hover:underline"
          >
            ← All open roles
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-accent-soft px-3 py-1 font-semibold text-accent-deep">
              {employmentTypeLabel(job.employmentType)}
            </span>
            {job.department ? (
              <span className="rounded-full bg-white px-3 py-1 font-medium text-foreground">
                {job.department}
              </span>
            ) : null}
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {job.title}
          </h1>
          <p className="mt-2 text-base text-foreground">{job.location}</p>

          <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <MetaRow label="Salary" value={formatSalary(job)} />
            <MetaRow
              label="Experience"
              value={job.experienceLevel ?? "Not specified"}
            />
            <MetaRow label="Posted" value={formatDate(job.postedAt)} />
            <MetaRow
              label="Apply by"
              value={
                job.applicationDeadline
                  ? formatDate(job.applicationDeadline)
                  : "Open until filled"
              }
            />
          </dl>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
            <div>
              <h2 className="text-lg font-semibold text-ink">About the role</h2>
              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-foreground">
                {job.description}
              </p>

              <BulletList
                title="Responsibilities"
                items={job.responsibilities}
              />
              <BulletList title="Requirements" items={job.requirements} />
              <BulletList title="What we offer" items={job.benefits} />
            </div>

            <div id="apply" className="lg:sticky lg:top-28 lg:self-start">
              <ApplyForm jobSlug={job.slug} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
