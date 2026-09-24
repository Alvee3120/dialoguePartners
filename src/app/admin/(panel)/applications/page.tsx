import Link from "next/link";
import ApplicationTable from "@/components/admin/ApplicationTable";
import { getApplicationStats, listApplications } from "@/lib/applications";
import type { ApplicationStatus } from "@/lib/db/schema";
import { getJobById } from "@/lib/jobs";
import {
  APPLICATION_STATUSES,
  APPLICATION_STATUS_LABELS,
} from "@/lib/job-options";

type PageProps = {
  searchParams: Promise<{ jobId?: string; status?: string }>;
};

function isApplicationStatus(value?: string): value is ApplicationStatus {
  return (
    !!value && (APPLICATION_STATUSES as readonly string[]).includes(value)
  );
}

export default async function AdminApplicationsPage({
  searchParams,
}: PageProps) {
  const { jobId, status } = await searchParams;
  const statusFilter = isApplicationStatus(status) ? status : undefined;

  const [applications, stats, job] = await Promise.all([
    listApplications({ jobId, status: statusFilter }),
    getApplicationStats(),
    jobId ? getJobById(jobId) : Promise.resolve(null),
  ]);

  const tabs: { label: string; value?: ApplicationStatus }[] = [
    { label: "All", value: undefined },
    ...APPLICATION_STATUSES.map((value) => ({
      label: APPLICATION_STATUS_LABELS[value],
      value,
    })),
  ];

  const hrefFor = (nextStatus?: ApplicationStatus) => {
    const params = new URLSearchParams();
    if (jobId) params.set("jobId", jobId);
    if (nextStatus) params.set("status", nextStatus);
    const query = params.toString();
    return `/admin/applications${query ? `?${query}` : ""}`;
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-ink">
        Applications
      </h1>
      <p className="mt-1 text-sm text-foreground">
        {stats.total} total · {stats.fresh} new
      </p>

      {job ? (
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-sm text-foreground">
          Filtered to <span className="font-medium text-ink">{job.title}</span>
          <Link
            href={hrefFor(statusFilter)}
            className="text-accent-deep hover:underline"
          >
            clear
          </Link>
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const active = tab.value === statusFilter;
          return (
            <Link
              key={tab.label}
              href={hrefFor(tab.value)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                active
                  ? "border-accent-deep bg-accent-deep text-white"
                  : "border-line bg-white text-ink hover:border-accent"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-6">
        <ApplicationTable applications={applications} />
      </div>
    </div>
  );
}
