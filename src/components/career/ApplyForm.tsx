"use client";

import { useActionState } from "react";
import { submitApplicationAction, type ApplyState } from "@/lib/actions/apply";

const inputClass =
  "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-foreground/50 focus:border-accent-deep focus:ring-2 focus:ring-accent-soft";
const labelClass =
  "text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-600">{message}</p>;
}

export default function ApplyForm({ jobSlug }: { jobSlug: string }) {
  const [state, action, pending] = useActionState<ApplyState, FormData>(
    submitApplicationAction,
    undefined,
  );

  if (state?.ok) {
    return (
      <div className="rounded-2xl border border-accent-soft bg-accent-soft/40 p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-deep">
          Application received
        </p>
        <h2 className="mt-3 text-xl font-semibold text-ink">
          Thank you — we&rsquo;ll be in touch.
        </h2>
        <p className="mt-2 text-sm text-foreground">
          Your application has been submitted. Our team reviews every CV and
          will reach out if there&rsquo;s a fit.
        </p>
      </div>
    );
  }

  const errors = state?.fieldErrors ?? {};

  return (
    <form
      action={action}
      encType="multipart/form-data"
      className="rounded-2xl border border-line bg-white p-6 sm:p-8"
    >
      <input type="hidden" name="jobSlug" value={jobSlug} />

      {/* Honeypot — hidden from humans, tempting to bots. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company website
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <h2 className="text-lg font-semibold text-ink">Apply for this role</h2>
      <p className="mt-1 text-sm text-foreground">
        Fields marked with * are required.
      </p>

      {state?.error ? (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.error}
        </p>
      ) : null}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Full name *</span>
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={inputClass}
          />
          <FieldError message={errors.name} />
        </label>

        <label className="block">
          <span className={labelClass}>Mobile number *</span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+880 1XXX-XXXXXX"
            className={inputClass}
          />
          <FieldError message={errors.phone} />
        </label>

        <label className="block sm:col-span-2">
          <span className={labelClass}>Email address *</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
          <FieldError message={errors.email} />
        </label>

        <label className="block sm:col-span-2">
          <span className={labelClass}>CV / Résumé * (PDF or Word, max 5MB)</span>
          <input
            name="cv"
            type="file"
            required
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className={`${inputClass} file:mr-3 file:rounded-full file:border-0 file:bg-navy file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white`}
          />
          <FieldError message={errors.cv} />
        </label>

        <label className="block sm:col-span-2">
          <span className={labelClass}>LinkedIn profile (optional)</span>
          <input
            name="linkedinUrl"
            type="url"
            placeholder="https://linkedin.com/in/…"
            className={inputClass}
          />
          <FieldError message={errors.linkedinUrl} />
        </label>

        <label className="block sm:col-span-2">
          <span className={labelClass}>
            Anything you&rsquo;d like us to know (optional)
          </span>
          <textarea
            name="coverLetter"
            rows={5}
            placeholder="A short note about your interest in the role…"
            className={`${inputClass} resize-y`}
          />
          <FieldError message={errors.coverLetter} />
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent-deep px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit application"}
        {pending ? null : <span aria-hidden="true">→</span>}
      </button>
    </form>
  );
}
