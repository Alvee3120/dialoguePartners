import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/site/Container";
import PageHeader from "@/components/shared/PageHeader";
import Reveal from "@/components/site/Reveal";
import { corePillars } from "@/data/corePillars";
import type { CorePillar } from "@/data/corePillars";

const CARD_IMAGE_WIDTH = 1672;
const CARD_IMAGE_HEIGHT = 941;

export const metadata: Metadata = {
  title: "Insight",
  description:
    "The five service pillars of Dialogue Partners: Climate Resilience & Decarbonization, Technology Solution & Innovation, Social, Operational Excellence, and Trade & Policy Advocacy.",
};

function PillarCard({
  pillar,
  sizes,
  imageClassName = "h-auto w-full",
}: {
  pillar: CorePillar;
  sizes: string;
  imageClassName?: string;
}) {
  return (
    <Link
      href={`/pillars/${pillar.slug}`}
      className="group flex h-full flex-col rounded-3xl border border-line bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 motion-reduce:hover:translate-y-0"
    >
      <Image
        src={pillar.pageImage}
        alt=""
        width={CARD_IMAGE_WIDTH}
        height={CARD_IMAGE_HEIGHT}
        sizes={sizes}
        className={`${imageClassName} rounded-2xl`}
      />
      <div className="flex flex-1 flex-col px-3 pb-2 pt-5 sm:px-4">
        <h2 className="text-xl font-semibold leading-snug tracking-tight text-ink">
          {pillar.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground">
          {pillar.summary}
        </p>
      </div>
    </Link>
  );
}

export default function PillarsPage() {
  const firstRow = corePillars.slice(0, 3);
  const secondRow = corePillars.slice(3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-soft-navy py-16 sm:py-24">
        <div aria-hidden="true" className="bg-blob -right-20 top-0 size-72 bg-accent/15" />
        <Container className="relative">
          <Reveal>
            <PageHeader
              eyebrow="What We Do"
              title="Five pillars, one transformation."
              lede="Every engagement starts with a conversation about where you sit in the ecosystem. From there, we work across one or all five pillars to build a sequenced path from cost-driven manufacturing to high-value, sustainable production."
            />
          </Reveal>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {firstRow.map((pillar, i) => (
              <Reveal key={pillar.slug} delay={i * 90} className="h-full">
                <PillarCard
                  pillar={pillar}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </Reveal>
            ))}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {secondRow.map((pillar, i) => (
              <Reveal
                key={pillar.slug}
                delay={i * 90}
                className={`h-full ${i === 1 ? "lg:col-span-2" : ""}`}
              >
                <PillarCard
                  pillar={pillar}
                  sizes={
                    i === 1
                      ? "(min-width: 1024px) 66vw, (min-width: 640px) 50vw, 100vw"
                      : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  }
                  imageClassName={
                    i === 1
                      ? "h-auto w-full lg:h-52 lg:object-cover lg:object-top"
                      : undefined
                  }
                />
              </Reveal>
            ))}
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
