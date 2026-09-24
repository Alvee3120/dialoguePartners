import type { Job } from "@/lib/db/schema";
import {
  EMPLOYMENT_TYPE_LABELS,
  JOB_STATUS_LABELS,
} from "@/lib/job-options";

/** Turn a title into a URL-safe slug: "Senior Merchandiser (Knit)" → "senior-merchandiser-knit". */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const currencySymbols: Record<string, string> = {
  BDT: "BDT",
  USD: "USD",
  EUR: "EUR",
};

const periodLabels: Record<Job["salaryPeriod"], string> = {
  monthly: "month",
  yearly: "year",
};

export function employmentTypeLabel(type: Job["employmentType"]): string {
  return EMPLOYMENT_TYPE_LABELS[type];
}

export function jobStatusLabel(status: Job["status"]): string {
  return JOB_STATUS_LABELS[status];
}

function formatAmount(amount: number): string {
  return new Intl.NumberFormat("en-US").format(amount);
}

/**
 * Human salary line:
 *  - negotiable            → "Negotiable"
 *  - min and max           → "BDT 60,000 – 80,000 / month"
 *  - min only              → "From BDT 60,000 / month"
 *  - max only              → "Up to BDT 80,000 / month"
 *  - nothing               → "Not disclosed"
 */
export function formatSalary(
  job: Pick<
    Job,
    | "salaryMin"
    | "salaryMax"
    | "salaryCurrency"
    | "salaryPeriod"
    | "salaryNegotiable"
  >,
): string {
  if (job.salaryNegotiable) return "Negotiable";

  const currency = currencySymbols[job.salaryCurrency] ?? job.salaryCurrency;
  const period = periodLabels[job.salaryPeriod];
  const suffix = ` / ${period}`;

  const { salaryMin: min, salaryMax: max } = job;
  if (min != null && max != null) {
    return `${currency} ${formatAmount(min)} – ${formatAmount(max)}${suffix}`;
  }
  if (min != null) return `From ${currency} ${formatAmount(min)}${suffix}`;
  if (max != null) return `Up to ${currency} ${formatAmount(max)}${suffix}`;
  return "Not disclosed";
}

export function formatDate(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
