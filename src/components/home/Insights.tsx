import Link from "next/link";
import Container from "@/components/site/Container";
import ImageSlot from "@/components/site/ImageSlot";
import { pillars } from "@/data/pillars";
import type { Pillar } from "@/data/pillars";

/** Large feature card with a full-bleed image placeholder. */
function LargeCard({ pillar }: { pillar: Pillar }) {
  return (
    <Link
      href={`/insights/${pillar.slug}`}
      className="group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl border border-line bg-white transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="absolute inset-0">
        <ImageSlot
          description={pillar.imageDescription}
          suggestedPath={pillar.imagePath}
          url={pillar.imagePath}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="relative p-8">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          {pillar.shortTitle}
        </span>
        <h3 className="mt-3 max-w-md text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {pillar.tagline}
        </h3>
        <p className="mt-2 text-sm font-medium text-white/90 transition-transform group-hover:translate-x-1">
          Explore this pillar <span aria-hidden="true">→</span>
        </p>
      </div>
    </Link>
  );
}

/** Compact tinted card with icon ring + copy. */
function TintedCard({ pillar }: { pillar: Pillar }) {
  return (
    <Link
      href={`/insights/${pillar.slug}`}
      className="group flex flex-col justify-between rounded-3xl bg-card p-8 transition-shadow duration-300 hover:shadow-lg"
    >
      <div>
        <span className="font-mono text-sm text-accent-deep">
          {pillar.number}
        </span>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {pillar.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          {pillar.summary}
        </p>
      </div>
      <p className="mt-8 text-sm font-semibold text-accent-deep transition-transform group-hover:translate-x-1">
        Explore this pillar <span aria-hidden="true">→</span>
      </p>
    </Link>
  );
}

export default function Insights() {
  const [large1, tint1, tint2, large2] = pillars;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">
              Our Insight
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Four pillars, one connected ecosystem
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground">
              We advise across four interconnected pillars that together define
              the future competitiveness of the RMG sector.
            </p>
          </div>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink-soft"
          >
            See the full Insight framework
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 md:row-span-2">
            <LargeCard pillar={large1} />
          </div>
          <div>
            <TintedCard pillar={tint1} />
          </div>
          <div>
            <TintedCard pillar={tint2} />
          </div>
          <div className="md:col-span-2">
            <LargeCard pillar={large2} />
          </div>
        </div>
      </Container>
    </section>
  );
}