import { and, desc, eq, ne, sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { jobs, type Job, type JobStatus } from "@/lib/db/schema";
import { slugify } from "@/lib/format";

export async function listJobs(): Promise<Job[]> {
  const db = getDb();
  return db
    .select()
    .from(jobs)
    .orderBy(desc(jobs.postedAt), desc(jobs.createdAt));
}

export async function getOpenJobs(): Promise<Job[]> {
  const db = getDb();
  return db
    .select()
    .from(jobs)
    .where(eq(jobs.status, "open"))
    .orderBy(desc(jobs.postedAt), desc(jobs.createdAt));
}

export async function getJobById(id: string): Promise<Job | null> {
  const db = getDb();
  const [job] = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
  return job ?? null;
}

export async function getOpenJobBySlug(slug: string): Promise<Job | null> {
  const db = getDb();
  const [job] = await db
    .select()
    .from(jobs)
    .where(and(eq(jobs.slug, slug), eq(jobs.status, "open")))
    .limit(1);
  return job ?? null;
}

export async function getJobStats() {
  const db = getDb();
  const [row] = await db
    .select({
      total: sql<number>`count(*)::int`,
      open: sql<number>`count(*) filter (where ${jobs.status} = 'open')::int`,
      draft: sql<number>`count(*) filter (where ${jobs.status} = 'draft')::int`,
      closed: sql<number>`count(*) filter (where ${jobs.status} = 'closed')::int`,
    })
    .from(jobs);
  return row ?? { total: 0, open: 0, draft: 0, closed: 0 };
}

/**
 * Slug from the title, made unique by appending `-2`, `-3`, … Pass `excludeId`
 * when editing so a job doesn't collide with itself.
 */
export async function generateUniqueSlug(
  title: string,
  excludeId?: string,
): Promise<string> {
  const db = getDb();
  const base = slugify(title) || "role";
  let candidate = base;
  let suffix = 2;

  for (;;) {
    const [clash] = await db
      .select({ id: jobs.id })
      .from(jobs)
      .where(
        excludeId
          ? and(eq(jobs.slug, candidate), ne(jobs.id, excludeId))
          : eq(jobs.slug, candidate),
      )
      .limit(1);

    if (!clash) return candidate;
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
}

export type JobStatusCounts = Record<JobStatus, number>;
