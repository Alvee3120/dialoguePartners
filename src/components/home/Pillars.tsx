import Link from "next/link";
import Image from "next/image";
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
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line/70 bg-white shadow-[0_20px_45px_-28px_rgba(16,32,47,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_55px_-28px_rgba(16,32,47,0.45)] motion-reduce:hover:translate-y-0"
    >
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[20px] font-semibold leading-snug tracking-tight text-navy">
          {pillar.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground">
          {pillar.summary}
        </p>
        <span className="mt-auto pt-6 text-4xl font-semibold leading-none tracking-tight text-ink/15">
          {pillar.number}
        </span>
      </div>

      <div className="relative mx-3 mb-3 h-52 overflow-hidden rounded-2xl sm:h-56">
        <Image
          src={pillar.image}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />

        {/* Curved dashed divider + icon badge, per the reference card design. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[58%]">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full"
            aria-hidden="true"
          >
            <path d="M0,0 H100 V22 Q50,100 0,22 Z" fill="#ffffff" />
            <path
              d="M3,22 Q50,100 97,22"
              fill="none"
              stroke="#10202f"
              strokeOpacity="0.4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="5 6"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span className="absolute left-1/2 top-[61%] flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-navy shadow-md">
            <Icon size={22} weight="bold" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Pillars() {
  const firstRow = corePillars.slice(0, 3);
  const secondRow = corePillars.slice(3);

  return (
    <section className="bg-card py-20 sm:py-28">
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

        <div className="mt-12 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {firstRow.map((pillar, i) => (
              <Reveal key={pillar.slug} delay={i * 80} className="h-full">
                <PillarCard pillar={pillar} />
              </Reveal>
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {secondRow.map((pillar, i) => (
              <Reveal key={pillar.slug} delay={i * 80} className="h-full">
                <PillarCard pillar={pillar} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
