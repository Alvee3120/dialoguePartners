import Link from "next/link";
import JobForm from "@/components/admin/JobForm";

export default function NewJobPage() {
  return (
    <div>
      <Link
        href="/admin/jobs"
        className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-deep hover:underline"
      >
        ← Back to job posts
      </Link>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
        New job post
      </h1>
      <p className="mt-1 text-sm text-foreground">
        Fill in the details and save as a draft, or publish straight away.
      </p>

      <div className="mt-8">
        <JobForm />
      </div>
    </div>
  );
}
