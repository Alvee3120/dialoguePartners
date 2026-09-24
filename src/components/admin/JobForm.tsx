"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  createJobAction,
  updateJobAction,
  type JobFormState,
} from "@/lib/actions/jobs";
import {
  EMPLOYMENT_TYPES,
  EMPLOYMENT_TYPE_LABELS,
  JOB_STATUSES,
  JOB_STATUS_LABELS,
  SALARY_PERIODS,
} from "@/lib/job-options";

export type JobFormValues = {
  slug: string;
  title: string;
  department: string;
  employmentType: string;
  location: string;
  experienceLevel: string;
  salaryMin: string;
  salaryMax: string;
  salaryCurrency: string;
  salaryPeriod: string;
  salaryNegotiable: boolean;
  description: string;
  responsibilities: string;
  requirements: string;
  benefits: string;
  applicationDeadline: string;
  status: string;
};

const emptyValues: JobFormValues = {
  slug: "",
  title: "",
  department: "",
  employmentType: "full_time",
  location: "",
  experienceLevel: "",
  salaryMin: "",
  salaryMax: "",
  salaryCurrency: "BDT",
  salaryPeriod: "monthly",
  salaryNegotiable: false,
  description: "",
  responsibilities: "",
  requirements: "",
  benefits: "",
  applicationDeadline: "",
  status: "draft",
};

const inputClass =
  "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-foreground/50 focus:border-accent-deep focus:ring-2 focus:ring-accent-soft";
const labelClass =
  "text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-600">{message}</p>;
}

export default function JobForm({
  id,
  initialValues,
}: {
  id?: string;
  initialValues?: JobFormValues;
}) {
  const values = initialValues ?? emptyValues;
  const action = id ? updateJobAction : createJobAction;
  const [state, formAction, pending] = useActionState<JobFormState, FormData>(
    action,
    undefined,
  );
  const [negotiable, setNegotiable] = useState(values.salaryNegotiable);

  const errors = state?.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-8">
      {id ? <input type="hidden" name="id" value={id} /> : null}

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
          Role
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className={labelClass}>Job title</span>
            <input
              name="title"
              defaultValue={values.title}
              required
              placeholder="Senior Merchandiser"
              className={inputClass}
            />
            <FieldError message={errors.title} />
          </label>

          <label className="block">
            <span className={labelClass}>Department / position</span>
            <input
              name="department"
              defaultValue={values.department}
              placeholder="Sourcing"
              className={inputClass}
            />
            <FieldError message={errors.department} />
          </label>

          <label className="block">
            <span className={labelClass}>Location</span>
            <input
              name="location"
              defaultValue={values.location}
              required
              placeholder="Dhaka, Bangladesh"
              className={inputClass}
            />
            <FieldError message={errors.location} />
          </label>

          <label className="block">
            <span className={labelClass}>Employment type</span>
            <select
              name="employmentType"
              defaultValue={values.employmentType}
              className={inputClass}
            >
              {EMPLOYMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {EMPLOYMENT_TYPE_LABELS[type]}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className={labelClass}>Experience level</span>
            <input
              name="experienceLevel"
              defaultValue={values.experienceLevel}
              placeholder="5+ years"
              className={inputClass}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-accent-deep">
          Compensation
        </h2>
        <label className="mt-5 flex items-center gap-3">
          <input
            type="checkbox"
            name="salaryNegotiable"
            checked={negotiable}
            onChange={(event) => setNegotiable(event.target.checked)}
            className="size-4 rounded border-line text-accent-deep focus:ring-accent-soft"
          />
          <span className="text-sm font-medium text-ink">
            Salary is negotiable (hide the numbers on the public page)
          </span>
        </label>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className={labelClass}>Minimum</span>
            <input
              name="salaryMin"
              type="number"
              min={0}
              step={1000}
              defaultValue={values.salaryMin}
              disabled={negotiable}
              placeholder="60000"
              className={`${inputClass} disabled:bg-paper disabled:text-foreground/40`}
            />
            <FieldError message={errors.salaryMin} />
          </label>

          <label className="block">
            <span className={labelClass}>Maximum</span>
            <input
              name="salaryMax"
              type="number"
              min={0}
              step={1000}
              defaultValue={values.salaryMax}
              disabled={negotiable}
              placeholder="80000"
              className={`${inputClass} disabled:bg-paper disabled:text-foreground/40`}
            />
            <FieldError message={errors.salaryMax} />
          </label>

          <label className="block">
            <span className={labelClass}>Currency</span>
            <input
              name="salaryCurrency"
              defaultValue={values.salaryCurrency}
              placeholder="BDT"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className={labelClass}>Period</span>
            <select
              name="salaryPeriod"
              defaultValue={values.salaryPeriod}
              className={inputClass}
            >
              {SALARY_PERIODS.map((period) => (
                <option key={period} value={period}>
                  {period === "monthly" ? "Monthly" : "Yearly"}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-accent-deep">
          Description
        </h2>
        <label className="mt-5 block">
          <span className={labelClass}>Overview</span>
          <textarea
            name="description"
            defaultValue={values.description}
            required
            rows={6}
            placeholder="What the role involves and who it's for…"
            className={`${inputClass} resize-y`}
          />
          <FieldError message={errors.description} />
        </label>

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <label className="block">
            <span className={labelClass}>Responsibilities (one per line)</span>
            <textarea
              name="responsibilities"
              defaultValue={values.responsibilities}
              rows={6}
              className={`${inputClass} resize-y`}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Requirements (one per line)</span>
            <textarea
              name="requirements"
              defaultValue={values.requirements}
              rows={6}
              className={`${inputClass} resize-y`}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Benefits (one per line)</span>
            <textarea
              name="benefits"
              defaultValue={values.benefits}
              rows={6}
              className={`${inputClass} resize-y`}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-line bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-accent-deep">
          Publishing
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Status</span>
            <select
              name="status"
              defaultValue={values.status}
              className={inputClass}
            >
              {JOB_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {JOB_STATUS_LABELS[status]}
                </option>
              ))}
            </select>
            <FieldError message={errors.status} />
          </label>

          <label className="block">
            <span className={labelClass}>Application deadline</span>
            <input
              name="applicationDeadline"
              type="date"
              defaultValue={values.applicationDeadline}
              className={inputClass}
            />
            <FieldError message={errors.applicationDeadline} />
          </label>

          <label className="block sm:col-span-2">
            <span className={labelClass}>Custom URL slug (optional)</span>
            <input
              name="slug"
              defaultValue={values.slug}
              placeholder="auto-generated from the title"
              className={inputClass}
            />
            <FieldError message={errors.slug} />
          </label>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-accent-deep px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Saving…" : id ? "Save changes" : "Create job"}
          {pending ? null : <span aria-hidden="true">→</span>}
        </button>
        <Link
          href="/admin/jobs"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-accent"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
