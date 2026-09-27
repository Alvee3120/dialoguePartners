"use client";

import { useActionState } from "react";
import { updateProfileAction, type ProfileFormState } from "@/lib/actions/profile";

const inputClass =
  "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-foreground/50 focus:border-accent-deep focus:ring-2 focus:ring-accent-soft";
const labelClass =
  "text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60";

export default function ProfileForm({ name }: { name: string }) {
  const [state, formAction, pending] = useActionState<ProfileFormState, FormData>(
    updateProfileAction,
    undefined,
  );
  const errors = state?.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-5">
      <label className="block">
        <span className={labelClass}>Full name</span>
        <input
          name="name"
          defaultValue={name}
          required
          className={inputClass}
        />
        {errors.name ? (
          <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>
        ) : null}
      </label>

      {state?.error ? (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      ) : null}
      {state?.ok ? (
        <p role="status" className="text-sm text-accent-deep">
          Saved.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-full bg-accent-deep px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save name"}
      </button>
    </form>
  );
}
