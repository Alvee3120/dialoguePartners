import type { Metadata } from "next";
import Container from "@/components/site/Container";
import PageHeader from "@/components/shared/PageHeader";
import JobCard from "@/components/career/JobCard";
import { getOpenJobs } from "@/lib/jobs";
import { site } from "@/data/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Career",
  description: "Open roles and opportunities at Dialogue Partners.",
};

export default async function CareerPage() {
  const jobs = await getOpenJobs();

  return (
    <>
      <section className="border-b border-line bg-paper py-16 sm:py-20">
        <Container>
          <PageHeader
            eyebrow="Career"
            title="Build the future of Bangladesh's RMG sector with us."
            lede="We work with global brands, manufacturers and policymakers on the sector's next chapter. If that's the kind of work you want to do, we'd like to hear from you."
          />
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container>
          {jobs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
              <p className="text-sm font-medium text-ink">
                There are no open roles right now.
              </p>
              <p className="mt-1 text-sm text-foreground">
                Check back soon, or write to{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-accent-deep hover:underline"
                >
                  {site.email}
                </a>
                .
              </p>
            </div>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-deep">
                {jobs.length} open {jobs.length === 1 ? "role" : "roles"}
              </p>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </ul>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
