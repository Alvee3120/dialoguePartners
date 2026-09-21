import Link from "next/link";
import Container from "@/components/site/Container";
import ValueCards from "@/components/shared/ValueCards";
import Reveal from "@/components/site/Reveal";

export default function Values() {
  return (
    <section className="relative overflow-hidden bg-paper py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 size-[30rem] rounded-full border border-accent/15" />
        <div className="absolute -right-40 -top-40 size-[30rem] rounded-full border border-accent/15" />
        <div className="absolute -bottom-40 -left-40 size-[30rem] rounded-full border border-accent/15" />
        <div className="absolute -bottom-40 -right-40 size-[30rem] rounded-full border border-accent/15" />
      </div>

      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-deep">
            Our Values
          </p>
          <h2 className="mt-3 text-[28px] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[32px] lg:text-[40px]">
            A Value-Driven Organization
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground">
            Everything we do is anchored in four principles that define how we
            work, who we work with, and the outcomes we&rsquo;re accountable
            for.
          </p>
        </Reveal>

        <div className="mt-12">
          <ValueCards />
        </div>

        <div className="mt-10 text-center">
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
