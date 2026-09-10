import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/site/Container";
import ImageSlot from "@/components/site/ImageSlot";
import CtaBand from "@/components/shared/CtaBand";
import { getPillar, pillars } from "@/data/pillars";
import type { Pillar } from "@/data/pillars";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return pillars.map((pillar: Pillar) => ({ slug: pillar.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) return {};
  return { title: pillar.shortTitle, description: pillar.tagline };
}

function ServiceItem({ name, description }: { name: string; description: string }) {
  return (
    <div className="rounded-3xl border border-line bg-white p-7 sm:p-8">
      <h3 className="text-lg font-semibold tracking-tight text-ink">{name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-foreground">{description}</p>
    </div>
  );
}

export default async function PillarPage({ params }: PageProps) {
  const { slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-paper py-16 sm:py-20">
        <Container>
          <nav className="text-sm text-foreground/70">
            <Link href="/insights" className="transition-colors hover:text-accent-deep">
              Insights
            </Link>
            <span aria-hidden="true" className="mx-2 text-foreground/40">/</span>
            <span className="text-ink">{pillar.shortTitle}</span>
          </nav>
          <div className="mt-8 max-w-3xl">
            <p className="font-mono text-sm text-accent-deep">
              Insight {pillar.number}
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              {pillar.title}
            </h1>
            <p className="mt-5 text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
              {pillar.heroLine}
            </p>
            <p className="mt-5 text-lg leading-relaxed text-foreground">
              {pillar.intro}
            </p>
          </div>
        </Container>
      </section>

      {/* Photograph */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl">
            <ImageSlot
              description={pillar.imageDescription}
              suggestedPath={pillar.imagePath}
              url={pillar.imagePath}
            />
          </div>
        </Container>
      </section>

      {/* Services */}
      {pillar.services.length > 0 ? (
        <section className="py-8 sm:py-12">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">
                  Our Services
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
                  What we deliver
                </h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {pillar.services.map((service) => (
                  <ServiceItem key={service.name} name={service.name} description={service.description} />
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Areas of work */}
      {pillar.areas.length > 0 ? (
        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">
                  Our Areas of Work
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
                  How we engage
                </h2>
              </div>
              <div className="space-y-10">
                {pillar.areas.map((area) => (
                  <div key={area.title}>
                    <h3 className="text-lg font-semibold tracking-tight text-ink">
                      {area.title}
                    </h3>
                    <div className="mt-5 grid gap-5">
                      {area.items.map((item) => (
                        <div key={item.name} className="rounded-3xl border border-line bg-paper p-6 sm:p-7">
                          <p className="font-semibold text-ink">{item.name}</p>
                          <p className="mt-2 text-sm leading-relaxed text-foreground">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBand title={`Engage us on ${pillar.shortTitle.toLowerCase()}`} />
    </>
  );
}
