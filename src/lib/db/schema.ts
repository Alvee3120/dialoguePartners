import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const adminRoleEnum = pgEnum("admin_role", ["admin", "owner"]);

export const employmentTypeEnum = pgEnum("employment_type", [
  "full_time",
  "part_time",
  "contract",
  "internship",
]);

export const salaryPeriodEnum = pgEnum("salary_period", ["monthly", "yearly"]);

export const jobStatusEnum = pgEnum("job_status", ["draft", "open", "closed"]);

export const applicationStatusEnum = pgEnum("application_status", [
  "new",
  "reviewed",
  "shortlisted",
  "rejected",
]);

export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  role: adminRoleEnum("role").notNull().default("admin"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tokenHash: text("token_hash").notNull().unique(),
    adminUserId: uuid("admin_user_id")
      .notNull()
      .references(() => adminUsers.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("sessions_admin_user_idx").on(table.adminUserId)],
);

export const jobs = pgTable(
  "jobs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    department: text("department"),
    employmentType: employmentTypeEnum("employment_type")
      .notNull()
      .default("full_time"),
    location: text("location").notNull(),
    experienceLevel: text("experience_level"),
    salaryMin: integer("salary_min"),
    salaryMax: integer("salary_max"),
    salaryCurrency: text("salary_currency").notNull().default("BDT"),
    salaryPeriod: salaryPeriodEnum("salary_period")
      .notNull()
      .default("monthly"),
    salaryNegotiable: boolean("salary_negotiable").notNull().default(false),
    description: text("description").notNull(),
    responsibilities: jsonb("responsibilities")
      .$type<string[]>()
      .notNull()
      .default([]),
    requirements: jsonb("requirements")
      .$type<string[]>()
      .notNull()
      .default([]),
    benefits: jsonb("benefits").$type<string[]>().notNull().default([]),
    applicationDeadline: date("application_deadline"),
    status: jobStatusEnum("status").notNull().default("draft"),
    postedAt: timestamp("posted_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    createdBy: uuid("created_by").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
  },
  (table) => [
    index("jobs_status_idx").on(table.status),
    index("jobs_posted_at_idx").on(table.postedAt),
  ],
);

export const applications = pgTable(
  "applications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    jobId: uuid("job_id")
      .notNull()
      .references(() => jobs.id, { onDelete: "restrict" }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    coverLetter: text("cover_letter"),
    linkedinUrl: text("linkedin_url"),
    cvKey: text("cv_key").notNull(),
    cvFilename: text("cv_filename").notNull(),
    cvMime: text("cv_mime").notNull(),
    cvSize: integer("cv_size").notNull(),
    status: applicationStatusEnum("status").notNull().default("new"),
    ipHash: text("ip_hash"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("applications_job_idx").on(table.jobId),
    index("applications_status_idx").on(table.status),
  ],
);

export type AdminUser = typeof adminUsers.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
export type JobStatus = Job["status"];
export type Application = typeof applications.$inferSelect;
export type ApplicationStatus = Application["status"];
