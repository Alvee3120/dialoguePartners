"use client";

import { useActionState, useEffect, useRef } from "react";
import { changePasswordAction, type ProfileFormState } from "@/lib/actions/profile";

const inputClass =
  "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-foreground/50 focus:border-accent-deep focus:ring-2 focus:ring-accent-soft";
const labelClass =
  "text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-600">{message}</p>;
}

export default function PasswordForm() {
  const [state, formAction, pending] = useActionState<ProfileFormState, FormData>(
    changePasswordAction,
    undefined,
  );
  const errors = state?.fieldErrors ?? {};
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      <label className="block">
        <span className={labelClass}>Current password</span>
        <input
          name="currentPassword"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
        />
        <FieldError message={errors.currentPassword} />
      </label>

      <label className="block">
        <span className={labelClass}>New password</span>
        <input
          name="newPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={inputClass}
        />
        <FieldError message={errors.newPassword} />
      </label>

      <label className="block">
        <span className={labelClass}>Confirm new password</span>
        <input
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={inputClass}
        />
        <FieldError message={errors.confirmPassword} />
      </label>

      {state?.error ? (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      ) : null}
      {state?.ok ? (
        <p role="status" className="text-sm text-accent-deep">
          Password changed.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-soft disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Updating…" : "Change password"}
      </button>
    </form>
  );
}
