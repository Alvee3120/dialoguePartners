import Container from "@/components/site/Container";
import ImageSlot from "@/components/site/ImageSlot";

type Tile = {
  description: string;
  path: string;
  /** Real image to render instead of the placeholder. */
  url?: string;
};

// Each tile renders its real image; `path` remains the local fallback slot.
const tiles: Tile[] = [
  {
    description: "Consultants in discussion at a roundtable",
    path: "/images/home/who-we-are.jpg",
    url: "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/solar.jpg",
  },
  {
    description: "A modern RMG production floor in Bangladesh",
    path: "/images/about/factory-floor.jpg",
    url: "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/dialoguesession.png",
  },
  {
    description: "A dialogue session between brands and manufacturers",
    path: "/images/about/dialogue-session.jpg",
    url: "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/workfloor.png",
  },
];

export default function AboutHero() {
  return (
    <section className="bg-paper pt-12 pb-16 sm:pb-24">
      <Container>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">
            Who We Are
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            The catalyst at the centre of the ecosystem
          </h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground sm:text-xl">
            <p>
              After four decades of remarkable growth, Bangladesh&rsquo;s RMG
              sector stands at a pivotal crossroads. As the market matures,
              maintaining competitiveness requires moving beyond low-cost
              manufacturing to high-value, sustainable production.
            </p>
            <p>
              The industry has to move beyond mastering low-hanging
              opportunities in manufacturing excellence. Bangladesh&rsquo;s RMG
              sector has to adopt product development and innovation to change
              game plans for the next decade.
            </p>
            <p>
              Dialogue Partners was founded to be the North Star for this
              transformation. We act as an ecosystem catalyst, sitting at the
              intersection of global brands, local manufacturers, and
              technology leaders, bridging gaps and creating leverage to be
              ready for the coming decades.
            </p>
          </div>
        </div>

        {/* Collage — middle tile raised, outer tiles dropped for rhythm */}
        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-3 sm:gap-6">
          {tiles.map((tile, index) => (
            <div
              key={tile.path}
              className={`relative aspect-[4/5] overflow-hidden rounded-3xl ${
                index === 1 ? "sm:-mt-8" : "sm:mt-6"
              }`}
            >
              <ImageSlot
                description={tile.description}
                suggestedPath={tile.path}
                url={tile.url}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
