import Link from "next/link";
import { desc } from "drizzle-orm";
import AdminTable from "@/components/admin/AdminTable";
import { requireOwner } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";

type PageProps = {
  searchParams: Promise<{ saved?: string }>;
};

export default async function AdminsPage({ searchParams }: PageProps) {
  const [session, { saved }] = await Promise.all([
    requireOwner(),
    searchParams,
  ]);

  const db = getDb();
  const admins = await db
    .select()
    .from(adminUsers)
    .orderBy(desc(adminUsers.createdAt));

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">
            Admins
          </h1>
          <p className="mt-1 text-sm text-foreground">
            Manage who can sign in to this dashboard.
          </p>
        </div>
        <Link
          href="/admin/admins/new"
          className="inline-flex items-center gap-2 rounded-full bg-accent-deep px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy"
        >
          Add admin
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {saved ? (
        <p className="mt-6 rounded-xl border border-accent-soft bg-accent-soft/50 px-4 py-3 text-sm text-accent-deep">
          Admin created.
        </p>
      ) : null}

      <div className="mt-6">
        <AdminTable admins={admins} currentUserId={session.userId} />
      </div>
    </div>
  );
}
