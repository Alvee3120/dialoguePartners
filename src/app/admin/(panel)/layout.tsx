import type { ReactNode } from "react";
import AdminNav from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <AdminNav name={session.name} email={session.email} />
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10">
        {children}
      </main>
    </div>
  );
}
