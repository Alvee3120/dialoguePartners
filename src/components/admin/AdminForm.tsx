"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createAdminAction, type AdminFormState } from "@/lib/actions/admins";
import { ADMIN_ROLES, ADMIN_ROLE_LABELS } from "@/lib/job-options";

const inputClass =
  "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-foreground/50 focus:border-accent-deep focus:ring-2 focus:ring-accent-soft";
const labelClass =
  "text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-600">{message}</p>;
}

export default function AdminForm() {
  const [state, formAction, pending] = useActionState<AdminFormState, FormData>(
    createAdminAction,
    undefined,
  );
  const errors = state?.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-8">
      {state?.error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.error}
        </p>
      ) : null}

      <section className="rounded-2xl border border-line bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-accent-deep">
          Admin details
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Full name</span>
            <input
              name="name"
              required
              placeholder="Jane Doe"
              className={inputClass}
            />
            <FieldError message={errors.name} />
          </label>

          <label className="block">
            <span className={labelClass}>Email</span>
            <input
              name="email"
              type="email"
              required
              placeholder="jane@dialoguepartners.com"
              className={inputClass}
            />
            <FieldError message={errors.email} />
          </label>

          <label className="block">
            <span className={labelClass}>Temporary password</span>
            <input
              name="password"
              type="password"
              required
              minLength={8}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              className={inputClass}
            />
            <FieldError message={errors.password} />
          </label>

          <label className="block">
            <span className={labelClass}>Role</span>
            <select name="role" defaultValue="admin" className={inputClass}>
              {ADMIN_ROLES.map((role) => (
                <option key={role} value={role}>
                  {ADMIN_ROLE_LABELS[role]}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-foreground/60">
              Owners can manage other admins; admins can&rsquo;t.
            </p>
          </label>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-accent-deep px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Creating…" : "Create admin"}
          {pending ? null : <span aria-hidden="true">→</span>}
        </button>
        <Link
          href="/admin/admins"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-accent"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
