import Link from "next/link";
import AdminForm from "@/components/admin/AdminForm";
import { requireOwner } from "@/lib/auth";

export default async function NewAdminPage() {
  await requireOwner();

  return (
    <div>
      <Link
        href="/admin/admins"
        className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-deep hover:underline"
      >
        ← Back to admins
      </Link>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
        Add admin
      </h1>
      <p className="mt-1 text-sm text-foreground">
        They can sign in right away with the password below — share it with
        them securely (not over email or chat).
      </p>

      <div className="mt-8 max-w-2xl">
        <AdminForm />
      </div>
    </div>
  );
}
