import Link from "next/link";
import Container from "@/components/site/Container";
import ImageSlot from "@/components/site/ImageSlot";
import Reveal from "@/components/site/Reveal";

const PHOTO_URL = "/images/home/who-we-are.jpg";

export default function WhoWeAre() {
  return (
    <section className="relative overflow-hidden bg-soft-teal py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="bg-blob animate-float-slow -left-24 top-10 size-72 bg-accent/20"
      />
      <div
        aria-hidden="true"
        className="bg-blob -right-32 bottom-0 size-96 bg-navy/10"
      />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">
              Who We Are
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              The catalyst at the centre of the ecosystem
            </h2>
            <div className="mt-6 space-y-5 leading-relaxed">
              <p>
                After four decades of remarkable growth, Bangladesh’s RMG sector stands at a pivotal crossroads. As the market matures, maintaining competitiveness requires moving beyond low-cost manufacturing to high-value, sustainable production.

              </p>
              <p>
                The industry has to move beyond mastering low-hanging opportunities in manufacturing excellence. Bangladesh&rsquo;s RMG sector has to adopt product development and innovation to change game plans for the next decade.

              </p>
              <p>
                Dialogue Partners was founded to be the North Star for this transformation. We act as an ecosystem catalyst, sitting at the intersection of global brands, local manufacturers, and technology leaders, bridging gaps and creating leverage to be ready for the coming decades.

              </p>
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent-deep transition-colors hover:text-ink"
            >
              Learn more about our story
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <Reveal delay={150} className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-xl shadow-navy/10 lg:max-w-none">
            <ImageSlot
              description="Consultants in discussion, or an aerial view of a modern RMG facility"
              suggestedPath="/images/home/who-we-are.jpg"
              url={PHOTO_URL}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}