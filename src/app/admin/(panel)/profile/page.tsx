import PasswordForm from "@/components/admin/PasswordForm";
import ProfileForm from "@/components/admin/ProfileForm";
import { requireAdmin } from "@/lib/auth";
import { ADMIN_ROLE_LABELS } from "@/lib/job-options";

export default async function ProfilePage() {
  const session = await requireAdmin();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-ink">
        Profile
      </h1>
      <p className="mt-1 text-sm text-foreground">
        Update your name or change your password.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-start">
        <section className="rounded-2xl border border-line bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-accent-deep">
            Account
          </h2>
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-foreground/60">Email</dt>
              <dd className="text-ink">{session.email}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-foreground/60">Role</dt>
              <dd className="text-ink">{ADMIN_ROLE_LABELS[session.role]}</dd>
            </div>
          </dl>
          <div className="mt-6 border-t border-line pt-6">
            <ProfileForm name={session.name} />
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-accent-deep">
            Change password
          </h2>
          <div className="mt-5">
            <PasswordForm />
          </div>
        </section>
      </div>
    </div>
  );
}
