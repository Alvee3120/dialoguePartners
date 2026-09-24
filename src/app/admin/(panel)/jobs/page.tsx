import Link from "next/link";
import JobTable from "@/components/admin/JobTable";
import { countApplicationsByJob } from "@/lib/applications";
import { listJobs } from "@/lib/jobs";

type PageProps = {
  searchParams: Promise<{ saved?: string; error?: string }>;
};

export default async function AdminJobsPage({ searchParams }: PageProps) {
  const [{ saved, error }, jobs, applicationCounts] = await Promise.all([
    searchParams,
    listJobs(),
    countApplicationsByJob(),
  ]);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">
            Job posts
          </h1>
          <p className="mt-1 text-sm text-foreground">
            Open roles appear on the public career page.
          </p>
        </div>
        <Link
          href="/admin/jobs/new"
          className="inline-flex items-center gap-2 rounded-full bg-accent-deep px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy"
        >
          Post a job
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {saved ? (
        <p className="mt-6 rounded-xl border border-accent-soft bg-accent-soft/50 px-4 py-3 text-sm text-accent-deep">
          Job saved.
        </p>
      ) : null}

      {error === "has-applications" ? (
        <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          That role has applications, so it can&rsquo;t be deleted. Close it
          instead to hide it from the public page.
        </p>
      ) : null}

      <div className="mt-6">
        <JobTable jobs={jobs} applicationCounts={applicationCounts} />
      </div>
    </div>
  );
}
