import { z } from "zod";
import {
  APPLICATION_STATUSES,
  EMPLOYMENT_TYPES,
  JOB_STATUSES,
  SALARY_PERIODS,
} from "@/lib/job-options";

export { APPLICATION_STATUSES, EMPLOYMENT_TYPES, JOB_STATUSES, SALARY_PERIODS };

const emptyToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

/** Guard route params / form ids before they reach a uuid column. */
export function isUuid(value: string | undefined | null): value is string {
  return typeof value === "string" && z.uuid().safeParse(value).success;
}

const optionalInt = z.preprocess(
  emptyToUndefined,
  z.coerce.number().int().nonnegative().optional(),
);

const optionalText = (max: number) =>
  z.preprocess(emptyToUndefined, z.string().trim().max(max).optional());

/** Textarea → array of trimmed, non-empty lines. */
const stringList = z.preprocess((value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    return value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }
  return [];
}, z.array(z.string().min(1).max(500)).max(50));

/** Checkboxes arrive as "on" (checked) or absent (null). */
const checkbox = z.preprocess(
  (value) => value === "on" || value === "true" || value === true,
  z.boolean(),
);

export const loginSchema = z.object({
  email: z.email({ error: "Enter a valid email address." }),
  password: z.string().min(1, { error: "Enter your password." }),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const jobInputSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(2, { error: "Give the role a title." })
      .max(160),
    slug: optionalText(120),
    department: optionalText(120),
    employmentType: z.enum(EMPLOYMENT_TYPES),
    location: z
      .string()
      .trim()
      .min(2, { error: "Where is this role based?" })
      .max(160),
    experienceLevel: optionalText(120),
    salaryMin: optionalInt,
    salaryMax: optionalInt,
    salaryCurrency: z.string().trim().min(1).max(8).default("BDT"),
    salaryPeriod: z.enum(SALARY_PERIODS),
    salaryNegotiable: checkbox,
    description: z
      .string()
      .trim()
      .min(20, { error: "Write a short description (at least 20 characters)." })
      .max(20000),
    responsibilities: stringList,
    requirements: stringList,
    benefits: stringList,
    applicationDeadline: z.preprocess(
      emptyToUndefined,
      z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { error: "Use a valid date." })
        .optional(),
    ),
    status: z.enum(JOB_STATUSES),
  })
  .superRefine((value, ctx) => {
    if (
      value.salaryMin != null &&
      value.salaryMax != null &&
      value.salaryMin > value.salaryMax
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["salaryMax"],
        message: "Maximum salary must be greater than the minimum.",
      });
    }
  });

export type JobInput = z.infer<typeof jobInputSchema>;

export const applicationInputSchema = z.object({
  jobId: z.uuid(),
  name: z
    .string()
    .trim()
    .min(2, { error: "Enter your full name." })
    .max(120),
  email: z.email({ error: "Enter a valid email address." }),
  phone: z
    .string()
    .trim()
    .min(6, { error: "Enter a valid mobile number." })
    .max(24, { error: "Enter a valid mobile number." })
    .regex(/^[0-9+()\-.\s]+$/, { error: "Enter a valid mobile number." }),
  coverLetter: z.preprocess(
    emptyToUndefined,
    z.string().trim().max(5000).optional(),
  ),
  linkedinUrl: z.preprocess(
    emptyToUndefined,
    z.url({ error: "Enter a valid URL." }).optional(),
  ),
});

export type ApplicationInput = z.infer<typeof applicationInputSchema>;

/** Flatten zod issues into `{ field: firstMessage }` for form rendering. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

/** Read a job form into the shape `jobInputSchema` expects. */
export function jobFormToInput(formData: FormData) {
  return {
    title: getString(formData, "title"),
    slug: getString(formData, "slug"),
    department: getString(formData, "department"),
    employmentType: getString(formData, "employmentType") || "full_time",
    location: getString(formData, "location"),
    experienceLevel: getString(formData, "experienceLevel"),
    salaryMin: getString(formData, "salaryMin"),
    salaryMax: getString(formData, "salaryMax"),
    salaryCurrency: getString(formData, "salaryCurrency") || "BDT",
    salaryPeriod: getString(formData, "salaryPeriod") || "monthly",
    salaryNegotiable: formData.get("salaryNegotiable"),
    description: getString(formData, "description"),
    responsibilities: getString(formData, "responsibilities"),
    requirements: getString(formData, "requirements"),
    benefits: getString(formData, "benefits"),
    applicationDeadline: getString(formData, "applicationDeadline"),
    status: getString(formData, "status") || "draft",
  };
}

/** Read the public apply form into the shape `applicationInputSchema` expects. */
export function applicationFormToInput(formData: FormData, jobId: string) {
  return {
    jobId,
    name: getString(formData, "name"),
    email: getString(formData, "email"),
    phone: getString(formData, "phone"),
    coverLetter: getString(formData, "coverLetter"),
    linkedinUrl: getString(formData, "linkedinUrl"),
  };
}
