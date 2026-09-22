import type { Metadata } from "next";
import Container from "@/components/site/Container";
import ImageSlot from "@/components/site/ImageSlot";
import SectionHeading from "@/components/site/SectionHeading";
import ValuesGrid, { values } from "@/components/shared/ValuesGrid";
import AboutHero from "@/components/about/AboutHero";
import OurRoleSection from "@/components/about/OurRoleSection";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "How Dialogue Partners was founded — a consultancy and ecosystem catalyst for Bangladesh's RMG sector.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      {/* Our Mission */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">
              Our Mission
            </p>
            <p className="mt-6 text-3xl font-medium leading-snug tracking-tight text-ink sm:text-4xl">
              Dialogue Partners exists to guide Bangladesh&rsquo;s RMG sector
              from cost-driven manufacturing to a high-value, sustainable, and
              digitally connected industry.
            </p>
          </div>
        </Container>
      </section>

      {/* Our Values */}
      <section className="bg-paper py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our Values"
            title="What we stand for"
            lede="Four principles that define how we work, who we work with, and the outcomes we are accountable for."
            center
          />
          <div className="mt-14">
            <ValuesGrid />
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.name}
                className="rounded-3xl border border-line bg-white p-7 sm:p-8"
              >
                <p className="text-xl font-semibold tracking-tight text-ink">
                  {value.name}
                </p>
                <p className="mt-3 leading-relaxed text-foreground">
                  {value.expanded}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Role */}
      <OurRoleSection />

      {/* Our Work */}
      <section className="bg-paper py-20 sm:py-28">
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">
              Our Work
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              Beyond mastering manufacturing excellence
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground">
              The industry has to move beyond low-hanging opportunities in
              manufacturing excellence. Bangladesh&rsquo;s RMG sector has to
              adopt product development and innovation to change the game plan
              for the next decade.
            </p>
          </div>
          <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-3xl">
            <ImageSlot
              description="Dialogue Partners convening global brands, local manufacturers, and technology partners around one table"
              suggestedPath="/images/about/what-we-do.jpg"
              url="https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/151A7580.jpg"
            />
          </div>
        </Container>
      </section>

      {/* Our Philosophy */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl bg-navy px-8 py-12 text-center sm:px-12 sm:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Our Philosophy
            </p>
            <p className="mt-5 text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl">
              &ldquo;Transforming the RMG ecosystem through engagement.&rdquo;
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              We believe transformation doesn&rsquo;t come from top-down
              mandates or one-off audits. It comes from sustained engagement,
              conversations &amp; commitments for real change. We act as a
              catalyst, aiming to be The North Star of Bangladesh&rsquo;s RMG
              industry.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
