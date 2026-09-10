import Link from "next/link";
import Container from "@/components/site/Container";

const VIDEO_URL =
  "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/consultancy%20loop.mp4";

const arrowIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="size-4"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink">
      {/* Background video — silent looping clip */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

      <Container className="relative z-10 flex min-h-[640px] flex-col items-center justify-center py-24 text-center sm:min-h-[720px] sm:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-soft">
          RMG Sector Consultancy | Bangladesh
        </p>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-7xl">
          Connecting Through Conversation
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
          Dialogue Partners is the ecosystem catalyst guiding Bangladesh&rsquo;s
          Ready-Made Garments sector from cost-driven manufacturing to a
          high-value, sustainable, and digitally connected industry.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-ink transition-colors hover:bg-accent-soft"
          >
            Explore Our Insight
            {arrowIcon}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-4 text-base font-medium text-white transition-colors hover:border-white hover:bg-white/10"
          >
            Talk to an Advisor
          </Link>
        </div>
      </Container>
    </section>
  );
}