import { and, desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import {
  applications,
  jobs,
  type Application,
  type ApplicationStatus,
} from "@/lib/db/schema";

export type ApplicationWithJob = Application & {
  jobTitle: string;
  jobSlug: string;
};

export async function listApplications(filters: {
  jobId?: string;
  status?: ApplicationStatus;
} = {}): Promise<ApplicationWithJob[]> {
  const db = getDb();
  const conditions = [];
  if (filters.jobId) conditions.push(eq(applications.jobId, filters.jobId));
  if (filters.status) conditions.push(eq(applications.status, filters.status));

  return db
    .select({
      id: applications.id,
      jobId: applications.jobId,
      name: applications.name,
      email: applications.email,
      phone: applications.phone,
      coverLetter: applications.coverLetter,
      linkedinUrl: applications.linkedinUrl,
      cvKey: applications.cvKey,
      cvFilename: applications.cvFilename,
      cvMime: applications.cvMime,
      cvSize: applications.cvSize,
      status: applications.status,
      ipHash: applications.ipHash,
      createdAt: applications.createdAt,
      jobTitle: jobs.title,
      jobSlug: jobs.slug,
    })
    .from(applications)
    .innerJoin(jobs, eq(applications.jobId, jobs.id))
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(applications.createdAt));
}

export async function getApplicationById(
  id: string,
): Promise<ApplicationWithJob | null> {
  const db = getDb();
  const [row] = await db
    .select({
      id: applications.id,
      jobId: applications.jobId,
      name: applications.name,
      email: applications.email,
      phone: applications.phone,
      coverLetter: applications.coverLetter,
      linkedinUrl: applications.linkedinUrl,
      cvKey: applications.cvKey,
      cvFilename: applications.cvFilename,
      cvMime: applications.cvMime,
      cvSize: applications.cvSize,
      status: applications.status,
      ipHash: applications.ipHash,
      createdAt: applications.createdAt,
      jobTitle: jobs.title,
      jobSlug: jobs.slug,
    })
    .from(applications)
    .innerJoin(jobs, eq(applications.jobId, jobs.id))
    .where(eq(applications.id, id))
    .limit(1);
  return row ?? null;
}

export async function getApplicationStats() {
  const db = getDb();
  const [row] = await db
    .select({
      total: sql<number>`count(*)::int`,
      fresh: sql<number>`count(*) filter (where ${applications.status} = 'new')::int`,
    })
    .from(applications);
  return row ?? { total: 0, fresh: 0 };
}

export async function countApplicationsForJob(jobId: string): Promise<number> {
  const db = getDb();
  const [row] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(applications)
    .where(eq(applications.jobId, jobId));
  return row?.count ?? 0;
}

/** Application totals keyed by job id — for the admin job list. */
export async function countApplicationsByJob(): Promise<Record<string, number>> {
  const db = getDb();
  const rows = await db
    .select({
      jobId: applications.jobId,
      count: sql<number>`count(*)::int`,
    })
    .from(applications)
    .groupBy(applications.jobId);

  const counts: Record<string, number> = {};
  for (const row of rows) counts[row.jobId] = row.count;
  return counts;
}
