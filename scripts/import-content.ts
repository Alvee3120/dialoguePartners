import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { z } from "zod";
import { getDb } from "../src/lib/db";
import { jobs } from "../src/lib/db/schema";
import {
  EMPLOYMENT_TYPES,
  JOB_STATUSES,
  SALARY_PERIODS,
} from "../src/lib/job-options";
import { loadEnv } from "./load-env";

loadEnv();

const fileSchema = z.object({
  jobs: z.array(
    z.object({
      slug: z.string().min(1),
      title: z.string().min(1),
      department: z.string().nullable().optional(),
      employmentType: z.enum(EMPLOYMENT_TYPES),
      location: z.string().min(1),
      experienceLevel: z.string().nullable().optional(),
      salaryMin: z.number().int().nullable().optional(),
      salaryMax: z.number().int().nullable().optional(),
      salaryCurrency: z.string().default("BDT"),
      salaryPeriod: z.enum(SALARY_PERIODS),
      salaryNegotiable: z.boolean(),
      description: z.string(),
      responsibilities: z.array(z.string()).default([]),
      requirements: z.array(z.string()).default([]),
      benefits: z.array(z.string()).default([]),
      applicationDeadline: z.string().nullable().optional(),
      status: z.enum(JOB_STATUSES),
      postedAt: z.string().optional(),
    }),
  ),
});

/**
 * Import job posts from a JSON file produced by `content:export`, upserting by
 * slug so it's idempotent and safe to re-run. Points at whatever DATABASE_URL
 * is configured — set it to production to promote content.
 */
async function main(): Promise<void> {
  const inputPath = resolve(
    process.cwd(),
    process.argv[2] ?? "content/jobs.json",
  );

  const parsed = fileSchema.safeParse(
    JSON.parse(await readFile(inputPath, "utf8")),
  );
  if (!parsed.success) {
    console.error(`Invalid content file: ${inputPath}`);
    console.error(parsed.error.issues.slice(0, 10));
    process.exit(1);
  }

  const db = getDb();
  const { jobs: entries } = parsed.data;

  for (const entry of entries) {
    const values = {
      slug: entry.slug,
      title: entry.title,
      department: entry.department ?? null,
      employmentType: entry.employmentType,
      location: entry.location,
      experienceLevel: entry.experienceLevel ?? null,
      salaryMin: entry.salaryMin ?? null,
      salaryMax: entry.salaryMax ?? null,
      salaryCurrency: entry.salaryCurrency,
      salaryPeriod: entry.salaryPeriod,
      salaryNegotiable: entry.salaryNegotiable,
      description: entry.description,
      responsibilities: entry.responsibilities,
      requirements: entry.requirements,
      benefits: entry.benefits,
      applicationDeadline: entry.applicationDeadline ?? null,
      status: entry.status,
      postedAt: entry.postedAt ? new Date(entry.postedAt) : new Date(),
      updatedAt: new Date(),
    };

    await db
      .insert(jobs)
      .values(values)
      .onConflictDoUpdate({ target: jobs.slug, set: values });
  }

  console.log(`Imported ${entries.length} job(s) from ${inputPath}`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
