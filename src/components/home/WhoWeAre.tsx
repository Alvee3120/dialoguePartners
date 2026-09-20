import Link from "next/link";
import Container from "@/components/site/Container";
import ImageSlot from "@/components/site/ImageSlot";
import Reveal from "@/components/site/Reveal";

const PHOTO_URL = "/images/home/who-we-are.jpg";

export default function WhoWeAre() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-deep">
              Who We Are
            </p>
            <h2 className="mt-3 text-[28px] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[32px] lg:text-[40px]">
              The catalyst at the centre of the ecosystem
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed">
              <p>
                After 40 years of remarkable growth, the Bangladesh RMG sector
                stands at a pivotal crossroads. As the market matures,
                maintaining competitiveness requires moving beyond low-cost
                manufacturing toward high-value, sustainable production.
              </p>
              <p>
                Dialogue Partners was founded to serve as a North Star for this
                transformation. We act as an ecosystem catalyst&mdash;connecting
                global brands, local manufacturers, and technology leaders to
                shape the next phase of industrial advancement.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent-deep transition-colors hover:text-ink"
            >
              Learn more about our story
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <Reveal delay={150} className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-xl lg:max-w-none">
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
