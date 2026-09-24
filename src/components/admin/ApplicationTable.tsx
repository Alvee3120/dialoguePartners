import Link from "next/link";
import StatusSelect from "@/components/admin/StatusSelect";
import type { ApplicationWithJob } from "@/lib/applications";
import { formatDate } from "@/lib/format";

export default function ApplicationTable({
  applications,
}: {
  applications: ApplicationWithJob[];
}) {
  if (applications.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
        <p className="text-sm font-medium text-ink">No applications here.</p>
        <p className="mt-1 text-sm text-foreground">
          New applications will appear as candidates apply.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-white">
      <table className="w-full min-w-[48rem] text-left text-sm">
        <thead className="bg-paper text-xs uppercase tracking-[0.15em] text-foreground/60">
          <tr>
            <th className="px-4 py-3 font-semibold">Candidate</th>
            <th className="px-4 py-3 font-semibold">Role</th>
            <th className="px-4 py-3 font-semibold">Mobile</th>
            <th className="px-4 py-3 font-semibold">Applied</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">CV</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id} className="border-t border-line align-top">
              <td className="px-4 py-4">
                <Link
                  href={`/admin/applications/${application.id}`}
                  className="font-medium text-ink transition-colors hover:text-accent-deep"
                >
                  {application.name}
                </Link>
                <p className="mt-0.5 text-xs text-foreground/70">
                  {application.email}
                </p>
              </td>
              <td className="px-4 py-4">
                <Link
                  href={`/admin/applications?jobId=${application.jobId}`}
                  className="text-foreground transition-colors hover:text-accent-deep"
                >
                  {application.jobTitle}
                </Link>
              </td>
              <td className="px-4 py-4 text-foreground">
                {application.phone}
              </td>
              <td className="px-4 py-4 text-foreground">
                {formatDate(application.createdAt)}
              </td>
              <td className="px-4 py-4">
                <StatusSelect id={application.id} status={application.status} />
              </td>
              <td className="px-4 py-4">
                <a
                  href={`/api/admin/applications/${application.id}/cv`}
                  className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-accent"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
