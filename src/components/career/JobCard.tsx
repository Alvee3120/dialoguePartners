import Link from "next/link";
import type { Job } from "@/lib/db/schema";
import { employmentTypeLabel, formatSalary } from "@/lib/format";

export default function JobCard({ job }: { job: Job }) {
  return (
    <li className="group h-full">
      <Link
        href={`/career/${job.slug}`}
        className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-colors hover:border-accent-deep"
      >
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-accent-soft px-3 py-1 font-semibold text-accent-deep">
            {employmentTypeLabel(job.employmentType)}
          </span>
          {job.department ? (
            <span className="rounded-full bg-paper px-3 py-1 font-medium text-foreground">
              {job.department}
            </span>
          ) : null}
        </div>

        <h2 className="mt-4 text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-accent-deep">
          {job.title}
        </h2>
        <p className="mt-1 text-sm text-foreground">{job.location}</p>

        <dl className="mt-5 space-y-2 text-sm">
          <div className="flex items-start justify-between gap-4">
            <dt className="text-foreground/60">Salary</dt>
            <dd className="text-right font-medium text-ink">
              {formatSalary(job)}
            </dd>
          </div>
          {job.experienceLevel ? (
            <div className="flex items-start justify-between gap-4">
              <dt className="text-foreground/60">Experience</dt>
              <dd className="text-right text-foreground">
                {job.experienceLevel}
              </dd>
            </div>
          ) : null}
        </dl>

        <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-accent-deep">
          View role
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </Link>
    </li>
  );
}
