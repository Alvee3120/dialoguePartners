/** Plain enums + labels shared by server validation and client UI (no zod). */

export const EMPLOYMENT_TYPES = [
  "full_time",
  "part_time",
  "contract",
  "internship",
] as const;

export const SALARY_PERIODS = ["monthly", "yearly"] as const;

export const JOB_STATUSES = ["draft", "open", "closed"] as const;

export const APPLICATION_STATUSES = [
  "new",
  "reviewed",
  "shortlisted",
  "rejected",
] as const;

export const EMPLOYMENT_TYPE_LABELS: Record<string, string> = {
  full_time: "Full-time",
  part_time: "Part-time",
  contract: "Contract",
  internship: "Internship",
};

export const SALARY_PERIOD_LABELS: Record<string, string> = {
  monthly: "per month",
  yearly: "per year",
};

export const JOB_STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  open: "Open",
  closed: "Closed",
};

export const APPLICATION_STATUS_LABELS: Record<string, string> = {
  new: "New",
  reviewed: "Reviewed",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
};
