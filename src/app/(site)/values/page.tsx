import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/site/Container";
import PageHeader from "@/components/shared/PageHeader";
import ValuesGrid from "@/components/shared/ValuesGrid";
import MottoBanner from "@/components/shared/MottoBanner";
import Reveal from "@/components/site/Reveal";

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

          <MottoBanner className="mt-16" />

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
