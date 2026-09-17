import type { Metadata } from "next";
import Link from "next/link";
import { Leaf, Circuitry, Scales, Gauge } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/site/Container";
import PageHeader from "@/components/shared/PageHeader";
import Reveal from "@/components/site/Reveal";
import { corePillars } from "@/data/corePillars";

const iconMap = { Leaf, Circuitry, Scales, Gauge } as const;

export const metadata: Metadata = {
  title: "Pillars",
  description:
    "The four service pillars of Dialogue Partners: Climate Resilience & Decarbonization, Technology Solutions, Trade & Policy Advocacy, and Operational Excellence & Digitalization.",
};

export default function PillarsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-soft-navy py-16 sm:py-24">
        <div aria-hidden="true" className="bg-blob -right-20 top-0 size-72 bg-accent/15" />
        <Container className="relative">
          <Reveal>
            <PageHeader
              eyebrow="What We Do"
              title="Four pillars, one transformation."
              lede="Every engagement starts with a conversation about where you sit in the ecosystem. From there, we work across one or all four pillars to build a sequenced path from cost-driven manufacturing to high-value, sustainable production."
            />
          </Reveal>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {corePillars.map((pillar, i) => {
              const Icon = iconMap[pillar.icon];
              return (
                <Reveal key={pillar.slug} delay={i * 90}>
                  <Link
                    href={`/pillars/${pillar.slug}`}
                    className="group flex flex-col rounded-3xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 motion-reduce:hover:translate-y-0"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-soft to-white text-accent-deep transition-transform duration-300 group-hover:scale-110">
                        <Icon size={28} weight="duotone" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-sm text-accent-deep/70">
                        {pillar.number}
                      </span>
                    </div>
                    <h2 className="mt-6 text-2xl font-semibold tracking-tight text-ink">
                      {pillar.title}
                    </h2>
                    <p className="mt-2 text-base font-medium text-accent-deep">
                      {pillar.tagline}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-foreground">
                      {pillar.summary}
                    </p>
                    <p className="mt-6 text-sm font-semibold text-accent-deep transition-transform group-hover:translate-x-1">
                      See how we deliver <span aria-hidden="true">→</span>
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-navy-soft"
            >
              Talk to us about your priorities
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
