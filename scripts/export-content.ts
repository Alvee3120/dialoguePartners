import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { asc } from "drizzle-orm";
import { getDb } from "../src/lib/db";
import { jobs } from "../src/lib/db/schema";
import { loadEnv } from "./load-env";

loadEnv();

const OUTPUT = resolve(process.cwd(), "content/jobs.json");

/**
 * Export job posts as portable JSON so they can be imported into another
 * environment (e.g. production) without retyping. Applications are deliberately
 * excluded — they're per-environment.
 */
async function main(): Promise<void> {
  const db = getDb();
  const rows = await db.select().from(jobs).orderBy(asc(jobs.slug));

  const payload = {
    jobs: rows.map((job) => ({
      slug: job.slug,
      title: job.title,
      department: job.department,
      employmentType: job.employmentType,
      location: job.location,
      experienceLevel: job.experienceLevel,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      salaryCurrency: job.salaryCurrency,
      salaryPeriod: job.salaryPeriod,
      salaryNegotiable: job.salaryNegotiable,
      description: job.description,
      responsibilities: job.responsibilities,
      requirements: job.requirements,
      benefits: job.benefits,
      applicationDeadline: job.applicationDeadline,
      status: job.status,
      postedAt: job.postedAt.toISOString(),
    })),
  };

  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  console.log(`Exported ${rows.length} job(s) → ${OUTPUT}`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
