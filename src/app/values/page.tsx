import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/site/Container";
import PageHeader from "@/components/shared/PageHeader";
import ValuesGrid, { values } from "@/components/shared/ValuesGrid";
import Reveal from "@/components/site/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Values",
  description:
    "The four principles behind Dialogue Partners: Transparency, Innovation, Simplicity, and Vitality.",
};

export default function ValuesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-soft-radial py-16 sm:py-24">
        <div aria-hidden="true" className="bg-blob -left-16 top-0 size-72 bg-accent/15" />
        <Container className="relative">
          <Reveal>
            <PageHeader
              eyebrow="Our Values"
              title="A value-driven organization."
              lede="Everything we do is anchored in four principles that define how we work, who we work with, and the outcomes we're accountable for."
            />
          </Reveal>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <ValuesGrid />

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.name} delay={i * 90}>
                <div className="rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10 motion-reduce:hover:translate-y-0 sm:p-8">
                  <p className="text-xl font-semibold tracking-tight text-ink">
                    {value.name}
                  </p>
                  <p className="mt-3 leading-relaxed text-foreground">
                    {value.expanded}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-16 max-w-3xl rounded-3xl bg-gradient-to-br from-navy to-navy-deep px-8 py-10 text-center shadow-xl shadow-navy/15 sm:px-12 sm:py-14">
            <p className="text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl">
              &ldquo;{site.motto}&rdquo;
            </p>
          </Reveal>

          <div className="mt-10 text-center">
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
    </>
  );
}
