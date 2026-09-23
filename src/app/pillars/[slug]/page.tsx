import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Leaf,
  Circuitry,
  HandHeart,
  Gauge,
  Scales,
} from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/site/Container";
import CtaBand from "@/components/shared/CtaBand";
import { getCorePillar, corePillars } from "@/data/corePillars";
import type { CorePillar } from "@/data/corePillars";

const iconMap = { Leaf, Circuitry, HandHeart, Gauge, Scales } as const;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return corePillars.map((pillar: CorePillar) => ({ slug: pillar.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pillar = getCorePillar(slug);
  if (!pillar) return {};
  return { title: pillar.shortTitle, description: pillar.tagline };
}

export default async function CorePillarPage({ params }: PageProps) {
  const { slug } = await params;
  const pillar = getCorePillar(slug);
  if (!pillar) notFound();

  const Icon = iconMap[pillar.icon];

  return (
    <>
      <section className="border-b border-line bg-paper py-16 sm:py-20">
        <Container>
          <nav className="text-sm text-foreground/70">
            <Link href="/pillars" className="transition-colors hover:text-accent-deep">
              Insight
            </Link>
            <span aria-hidden="true" className="mx-2 text-foreground/40">/</span>
            <span className="text-ink">{pillar.shortTitle}</span>
          </nav>
          <div className="mt-8 max-w-3xl">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-soft to-white text-accent-deep">
              <Icon size={28} weight="duotone" aria-hidden="true" />
            </span>
            <p className="mt-6 font-mono text-sm text-accent-deep">
              Pillar {pillar.number}
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              {pillar.title}
            </h1>
            <p className="mt-5 text-2xl font-medium leading-snug tracking-tight text-accent-deep sm:text-3xl">
              {pillar.tagline}
            </p>
          </div>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-foreground">
            {pillar.intro.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </section>

      <div className="py-12 sm:py-16">
        <Container>
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-line bg-card">
            <Image
              src={pillar.pageImage}
              alt=""
              fill
              sizes="(min-width: 1280px) 1216px, (min-width: 1024px) calc(100vw - 64px), (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)"
              className="object-cover"
            />
          </div>
        </Container>
      </div>

      {pillar.groups.map((group) => (
        <section key={group.title} className="py-16 sm:py-20 [&:nth-of-type(even)]:bg-paper">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">
                  {pillar.shortTitle}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
                  {group.title}
                </h2>
                {group.intro ? (
                  <p className="mt-4 text-base leading-relaxed text-foreground">
                    {group.intro}
                  </p>
                ) : null}
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {group.items.map((item) => (
                  <div key={item.name} className="rounded-3xl border border-line bg-white p-7 sm:p-8">
                    <h3 className="text-lg font-semibold tracking-tight text-ink">
                      {item.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ))}

      <CtaBand title={`Engage us on ${pillar.shortTitle.toLowerCase()}`} />
    </>
  );
}
