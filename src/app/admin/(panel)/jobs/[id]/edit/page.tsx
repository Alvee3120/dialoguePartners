import Link from "next/link";
import { notFound } from "next/navigation";
import JobForm, { type JobFormValues } from "@/components/admin/JobForm";
import { getJobById } from "@/lib/jobs";
import { isUuid } from "@/lib/validation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditJobPage({ params }: PageProps) {
  const { id } = await params;
  if (!isUuid(id)) notFound();

  const job = await getJobById(id);
  if (!job) notFound();

  const initialValues: JobFormValues = {
    slug: job.slug,
    title: job.title,
    department: job.department ?? "",
    employmentType: job.employmentType,
    location: job.location,
    experienceLevel: job.experienceLevel ?? "",
    salaryMin: job.salaryMin != null ? String(job.salaryMin) : "",
    salaryMax: job.salaryMax != null ? String(job.salaryMax) : "",
    salaryCurrency: job.salaryCurrency,
    salaryPeriod: job.salaryPeriod,
    salaryNegotiable: job.salaryNegotiable,
    description: job.description,
    responsibilities: job.responsibilities.join("\n"),
    requirements: job.requirements.join("\n"),
    benefits: job.benefits.join("\n"),
    applicationDeadline: job.applicationDeadline ?? "",
    status: job.status,
  };

  return (
    <div>
      <Link
        href="/admin/jobs"
        className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-deep hover:underline"
      >
        ← Back to job posts
      </Link>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
        Edit job post
      </h1>
      <p className="mt-1 text-sm text-foreground">
        Changes go live on the public career page as soon as you save.
      </p>

      <div className="mt-8">
        <JobForm id={job.id} initialValues={initialValues} />
      </div>
    </div>
  );
}
