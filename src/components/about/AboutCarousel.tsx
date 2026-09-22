import ImageSlot from "@/components/site/ImageSlot";

type Slide = {
  description: string;
  path: string;
  url?: string;
};

const slides: Slide[] = [
  {
    description: "Consultants in discussion at a roundtable",
    path: "/images/home/who-we-are.jpg",
    url: "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/solar.jpg",
  },
  {
    description: "A dialogue session between brands and manufacturers",
    path: "/images/about/dialogue-session.jpg",
    url: "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/dialoguesession.png",
  },
  {
    description: "A modern RMG production floor in Bangladesh",
    path: "/images/about/factory-floor.jpg",
    url: "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/workfloor.png",
  },
  {
    description: "Global trade networks connecting Bangladesh's RMG sector",
    path: "/images/about/trade.jpg",
    url: "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/tradenew.jpg",
  },
  {
    description: "Technology and innovation transforming garment manufacturing",
    path: "/images/about/tech.jpg",
    url: "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/tech.jpg",
  },
];

/**
 * Continuous image marquee. The track holds two identical copies of the slide
 * list and slides one copy-width (-50%), so the scroll loops seamlessly.
 * Hovering pauses it; reduced-motion users get a static row.
 */
export default function AboutCarousel() {
  const sets = [0, 1];

  return (
    <div
      className="group mt-12 overflow-hidden sm:mt-16"
      role="region"
      aria-label="Dialogue Partners in the field"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
        {sets.map((set) => (
          <div key={set} className="flex" aria-hidden={set === 1}>
            {slides.map((slide) => (
              <div
                key={`${set}-${slide.path}`}
                className="w-[86vw] shrink-0 pr-4 sm:w-[45vw] sm:pr-5 lg:w-[30vw] lg:pr-6"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                  <ImageSlot
                    description={slide.description}
                    suggestedPath={slide.path}
                    url={slide.url}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
