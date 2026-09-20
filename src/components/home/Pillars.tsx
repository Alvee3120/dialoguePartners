import Link from "next/link";
import {
  Leaf,
  Circuitry,
  HandHeart,
  Gauge,
  Scales,
} from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/site/Container";
import Reveal from "@/components/site/Reveal";
import { buttonNavy } from "@/components/site/button";
import { corePillars } from "@/data/corePillars";
import type { CorePillar } from "@/data/corePillars";

const iconMap = {
  Leaf,
  Circuitry,
  HandHeart,
  Gauge,
  Scales,
} as const;

function PillarCard({ pillar }: { pillar: CorePillar }) {
  const Icon = iconMap[pillar.icon];
  return (
    <Link
      href={`/pillars/${pillar.slug}`}
      className="group flex h-full flex-col rounded-xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg motion-reduce:hover:translate-y-0"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex size-12 items-center justify-center rounded-xl bg-accent-soft text-accent-deep">
          <Icon size={24} weight="duotone" aria-hidden="true" />
        </span>
        <span className="font-mono text-sm text-accent-deep/70">
          {pillar.number}
        </span>
      </div>
      <h3 className="mt-5 text-[20px] font-semibold leading-snug tracking-tight text-ink">
        {pillar.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-foreground">
        {pillar.summary}
      </p>
      <p className="mt-5 text-sm font-semibold text-accent-deep transition-transform group-hover:translate-x-1">
        See how we deliver <span aria-hidden="true">→</span>
      </p>
    </Link>
  );
}

export default function Pillars() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-deep">
              What We Do
            </p>
            <h2 className="mt-3 text-[28px] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[32px] lg:text-[40px]">
              Five pillars, one transformation
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground">
              Practical advisory work organized around the pressures that
              define competitiveness in the RMG sector today — engaged
              individually or as one connected program.
            </p>
          </div>
          <Link href="/pillars" className={buttonNavy}>
            Explore our pillars
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
