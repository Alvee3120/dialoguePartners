import Link from "next/link";
import Container from "@/components/site/Container";
import ValuesGrid from "@/components/shared/ValuesGrid";
import Reveal from "@/components/site/Reveal";

export default function Values() {
  return (
    <section className="relative overflow-hidden bg-soft-radial py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="bg-blob animate-float-slow left-1/2 top-0 size-96 -translate-x-1/2 bg-accent/15"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
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
        </Reveal>

        <Reveal delay={120} className="mt-14">
          <ValuesGrid />
        </Reveal>

        {/* Core motto callout */}
        <Reveal delay={200} className="mx-auto mt-14 max-w-3xl rounded-3xl bg-gradient-to-br from-navy to-navy-deep px-8 py-10 text-center shadow-xl shadow-navy/15">
          <p className="text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl">
            &ldquo;Transforming the RMG ecosystem through engagement.&rdquo;
          </p>
        </Reveal>

        <div className="mt-12 text-center">
          <Link
            href="/values"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-deep transition-colors hover:text-ink"
          >
            More on our values
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
