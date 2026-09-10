import type { Metadata } from "next";
import Container from "@/components/site/Container";
import ImageSlot from "@/components/site/ImageSlot";
import PageHeader from "@/components/shared/PageHeader";
import ValuesGrid, { values } from "@/components/shared/ValuesGrid";

const PHOTO_URL = "/images/home/who-we-are.jpg";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "How Dialogue Partners was founded — a consultancy and ecosystem catalyst for Bangladesh's RMG sector.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-paper py-16 sm:py-24">
        <Container>
          <PageHeader
            eyebrow="Who We Are"
            title="Forty years of growth. One pivotal moment. A new kind of partner."
            lede="Dialogue Partners is the ecosystem catalyst guiding Bangladesh\u2019s Ready-Made Garments sector from cost-driven manufacturing to a high-value, sustainable, and digitally connected industry."
          />
        </Container>
      </section>

      {/* Our Origin */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">
                Our Origin
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Built shipment by shipment, factory by factory
              </h2>
              <div className="mt-6 space-y-5 leading-relaxed">
                <p>
                  Bangladesh&rsquo;s RMG sector didn&rsquo;t happen by accident —
                  it was built, shipment by shipment, factory by factory, over
                  four decades of relentless growth into one of the largest
                  garment-exporting industries in the world. That growth was
                  extraordinary. But it was built primarily on one advantage:
                  cost.
                </p>
                <p>
                  That advantage is no longer enough. Global buyers now expect
                  traceability. Regulators demand climate accountability.
                  Workers expect dignity and voice. And competing sourcing
                  markets are closing the cost gap fast. The sector isn&rsquo;t
                  failing — it&rsquo;s maturing. And maturity requires a
                  different kind of leadership.
                </p>
                <p>
                  Dialogue Partners was founded to provide exactly that: a
                  steady, informed, connective presence guiding the industry
                  through its next transformation.
                </p>
              </div>
            </div>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl lg:max-w-none">
              <ImageSlot
                description="Consultants in discussion, or an aerial view of a modern RMG facility"
                suggestedPath="/images/home/who-we-are.jpg"
                url={PHOTO_URL}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* What We Do */}
      <section className="bg-paper py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">
              What We Do
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              An ecosystem catalyst, not a traditional consultancy
            </h2>
            <div className="mt-6 space-y-5 leading-relaxed">
              <p>
                We call ourselves an ecosystem catalyst because that&rsquo;s
                precisely the gap we fill. Global brands need confidence that
                their sourcing partners meet rising standards. Local
                manufacturers need the strategy, capital access, and technical
                capability to meet those standards. Technology providers need a
                bridge into an industry that is often difficult to enter.
                Policymakers need informed input to design regulation that works
                in practice, not just in theory.
              </p>
              <p>
                Dialogue Partners sits in the middle of all of it — convening the
                right people, translating between technical and commercial
                language, and turning dialogue into deliverable strategy.
              </p>
            </div>
          </div>

          {/* Our Philosophy */}
          <div className="mx-auto mt-14 max-w-3xl rounded-3xl bg-ink px-8 py-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Our Philosophy
            </p>
            <p className="mt-4 text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl">
              &ldquo;Transforming the RMG ecosystem through engagement.&rdquo;
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              We believe transformation doesn&rsquo;t come from top-down mandates
              or one-off audits. It comes from sustained engagement — real
              conversations between the people who set standards and the people
              who have to meet them.
            </p>
          </div>
        </Container>
      </section>

      {/* Our Values */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">
              Our Values
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              What we stand for
            </h2>
          </div>
          <div className="mt-14">
            <ValuesGrid />
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.name} className="rounded-3xl border border-line bg-paper p-7 sm:p-8">
                <p className="text-xl font-semibold tracking-tight text-ink">{value.name}</p>
                <p className="mt-3 leading-relaxed text-foreground">
                  {value.expanded}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}