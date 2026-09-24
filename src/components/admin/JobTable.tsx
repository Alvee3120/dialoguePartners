import Link from "next/link";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import { deleteJobAction, setJobStatusAction } from "@/lib/actions/jobs";
import type { Job, JobStatus } from "@/lib/db/schema";
import {
  employmentTypeLabel,
  formatDate,
  formatSalary,
} from "@/lib/format";
import { JOB_STATUS_LABELS } from "@/lib/job-options";

const badgeStyles: Record<JobStatus, string> = {
  draft: "bg-paper text-foreground",
  open: "bg-accent-soft text-accent-deep",
  closed: "bg-slate-200 text-slate-600",
};

function StatusBadge({ status }: { status: JobStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[status]}`}
    >
      {JOB_STATUS_LABELS[status]}
    </span>
  );
}

export default function JobTable({
  jobs,
  applicationCounts,
}: {
  jobs: Job[];
  applicationCounts: Record<string, number>;
}) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
        <p className="text-sm font-medium text-ink">No job posts yet.</p>
        <p className="mt-1 text-sm text-foreground">
          Create your first opening to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-white">
      <table className="w-full min-w-[52rem] text-left text-sm">
        <thead className="bg-paper text-xs uppercase tracking-[0.15em] text-foreground/60">
          <tr>
            <th className="px-4 py-3 font-semibold">Role</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Location</th>
            <th className="px-4 py-3 font-semibold">Salary</th>
            <th className="px-4 py-3 font-semibold">Apps</th>
            <th className="px-4 py-3 font-semibold">Posted</th>
            <th className="px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => {
            const apps = applicationCounts[job.id] ?? 0;
            return (
              <tr key={job.id} className="border-t border-line align-top">
                <td className="px-4 py-4">
                  <Link
                    href={`/admin/jobs/${job.id}/edit`}
                    className="font-medium text-ink transition-colors hover:text-accent-deep"
                  >
                    {job.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-foreground/70">
                    {job.department ? `${job.department} · ` : ""}
                    {employmentTypeLabel(job.employmentType)}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-foreground/50">
                    /career/{job.slug}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={job.status} />
                </td>
                <td className="px-4 py-4 text-foreground">{job.location}</td>
                <td className="px-4 py-4 text-foreground">
                  {formatSalary(job)}
                </td>
                <td className="px-4 py-4">
                  {apps > 0 ? (
                    <Link
                      href={`/admin/applications?jobId=${job.id}`}
                      className="font-medium text-accent-deep hover:underline"
                    >
                      {apps}
                    </Link>
                  ) : (
                    <span className="text-foreground/50">0</span>
                  )}
                </td>
                <td className="px-4 py-4 text-foreground">
                  {formatDate(job.postedAt)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/admin/jobs/${job.id}/edit`}
                      className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-accent"
                    >
                      Edit
                    </Link>

                    <form action={setJobStatusAction}>
                      <input type="hidden" name="id" value={job.id} />
                      <input
                        type="hidden"
                        name="status"
                        value={job.status === "open" ? "closed" : "open"}
                      />
                      <button
                        type="submit"
                        className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-accent"
                      >
                        {job.status === "open" ? "Close" : "Publish"}
                      </button>
                    </form>

                    <form action={deleteJobAction}>
                      <input type="hidden" name="id" value={job.id} />
                      <ConfirmSubmitButton
                        message={`Delete "${job.title}"? This cannot be undone.`}
                        className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:border-red-400 hover:bg-red-50"
                      >
                        Delete
                      </ConfirmSubmitButton>
                    </form>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
