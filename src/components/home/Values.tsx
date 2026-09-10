import Link from "next/link";
import Container from "@/components/site/Container";
import ValuesGrid from "@/components/shared/ValuesGrid";

export default function Values() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">
            Our Values
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            A Value-Driven Organization
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-foreground">
            Everything we do is anchored in four principles that define how we
            work, who we work with, and the outcomes we&rsquo;re accountable
            for.
          </p>
        </div>

        <div className="mt-14">
          <ValuesGrid />
        </div>

        {/* Core motto callout */}
        <div className="mx-auto mt-14 max-w-3xl rounded-3xl bg-ink px-8 py-10 text-center">
          <p className="text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl">
            &ldquo;Transforming the RMG ecosystem through engagement.&rdquo;
          </p>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-deep transition-colors hover:text-ink"
          >
            More about who we are
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}