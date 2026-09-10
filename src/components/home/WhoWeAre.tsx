import Link from "next/link";
import Container from "@/components/site/Container";
import ImageSlot from "@/components/site/ImageSlot";

const PHOTO_URL = "/images/home/who-we-are.jpg";

export default function WhoWeAre() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">
              Who We Are
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              The catalyst at the centre of the ecosystem
            </h2>
            <div className="mt-6 space-y-5 leading-relaxed">
              <p>
                After four decades of remarkable growth, Bangladesh&rsquo;s RMG
                sector stands at a pivotal crossroads. The market has matured —
                and staying competitive now means moving beyond low-cost
                manufacturing toward high-value, sustainable production that can
                compete on innovation, not just price.
              </p>
              <p>
                Dialogue Partners was founded to be the North Star for this
                transformation. We don&rsquo;t operate as a traditional
                consultancy sitting on the sidelines — we act as an ecosystem
                catalyst, sitting at the intersection of global brands, local
                manufacturers, and technology leaders, helping them speak the
                same language and move in the same direction.
              </p>
              <p>
                Our role is to open the conversations that matter — between
                buyers and factories, between regulators and investors, between
                legacy systems and digital futures — and turn those conversations
                into action that shapes the next phase of industrial advancement.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent-deep transition-colors hover:text-ink"
            >
              Learn more about our story
              <span aria-hidden="true">→</span>
            </Link>
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
  );
}