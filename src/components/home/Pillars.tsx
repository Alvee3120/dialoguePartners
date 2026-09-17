import Link from "next/link";
import { Leaf, Circuitry, Scales, Gauge } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/site/Container";
import Reveal from "@/components/site/Reveal";
import { corePillars } from "@/data/corePillars";
import type { CorePillar } from "@/data/corePillars";

const iconMap = {
  Leaf,
  Circuitry,
  Scales,
  Gauge,
} as const;

function PillarCard({ pillar }: { pillar: CorePillar }) {
  const Icon = iconMap[pillar.icon];
  return (
    <Link
      href={`/pillars/${pillar.slug}`}
      className="group flex flex-col rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 motion-reduce:hover:translate-y-0 sm:p-8"
    >
      <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-soft to-white text-accent-deep">
        <Icon size={28} weight="duotone" aria-hidden="true" />
      </span>
      <span className="mt-6 font-mono text-xs text-accent-deep/70">
        Pillar {pillar.number}
      </span>
      <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-ink">
        {pillar.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-foreground">
        {pillar.summary}
      </p>
      <p className="mt-6 text-sm font-semibold text-accent-deep transition-transform group-hover:translate-x-1">
        See how we deliver <span aria-hidden="true">→</span>
      </p>
    </Link>
  );
}

export default function Pillars() {
  return (
    <section className="relative overflow-hidden bg-soft-navy py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="bg-blob -right-24 top-1/3 size-80 bg-accent/15"
      />
      <Container className="relative">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">
              What We Do
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Four pillars, one transformation
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground">
              Practical advisory work organized around the pressures that
              define competitiveness in the RMG sector today — engaged
              individually or as one connected program.
            </p>
          </div>
          <Link
            href="/pillars"
            className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-navy-soft"
          >
            Explore our pillars
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {corePillars.map((pillar, i) => (
            <Reveal key={pillar.slug} delay={i * 80}>
              <PillarCard pillar={pillar} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
