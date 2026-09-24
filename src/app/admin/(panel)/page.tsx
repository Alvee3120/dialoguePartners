import Link from "next/link";
import { getApplicationStats } from "@/lib/applications";
import { getJobStats } from "@/lib/jobs";

export default async function AdminDashboardPage() {
  const [jobStats, applicationStats] = await Promise.all([
    getJobStats(),
    getApplicationStats(),
  ]);

  const cards = [
    { label: "Open roles", value: jobStats.open, href: "/admin/jobs" },
    { label: "Draft roles", value: jobStats.draft, href: "/admin/jobs" },
    { label: "Total applications", value: applicationStats.total, href: "/admin/applications" },
    { label: "New applications", value: applicationStats.fresh, href: "/admin/applications" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-foreground">
            Manage open roles and review candidate applications.
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

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-line bg-white p-5 transition-colors hover:border-accent-deep"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60">
              {card.label}
            </p>
            <p className="mt-2 text-3xl font-semibold text-ink">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/jobs"
          className="rounded-2xl border border-line bg-white p-6 transition-colors hover:border-accent-deep"
        >
          <p className="text-sm font-semibold text-ink">Job posts</p>
          <p className="mt-1 text-sm text-foreground">
            Create, edit, publish and close job openings.
          </p>
        </Link>
        <Link
          href="/admin/applications"
          className="rounded-2xl border border-line bg-white p-6 transition-colors hover:border-accent-deep"
        >
          <p className="text-sm font-semibold text-ink">Applications</p>
          <p className="mt-1 text-sm text-foreground">
            Review candidates, update status, download CVs.
          </p>
        </Link>
      </div>
    </div>
  );
}
