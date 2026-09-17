import Link from "next/link";
import Container from "@/components/site/Container";
import { aboutStats } from "@/data/about";

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
    <section
      id="top"
      className="relative isolate -mt-20 overflow-hidden bg-navy"
    >
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

      {/* Dark overlay for legibility, tinted toward the brand teal */}
      <div className="absolute inset-0 bg-navy/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-navy-deep/50" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent-deep/15 via-transparent to-transparent" />

      <Container className="relative z-10 flex min-h-svh flex-col items-center justify-center pt-32 pb-16 text-center">
        <p className="animate-fade-in-up text-xs font-semibold uppercase tracking-[0.3em] text-accent-bright">
          Ecosystem Catalyst | The North Star for Bangladesh&rsquo;s RMG Transformation
        </p>
        <h1 className="animate-fade-in-up mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-white [animation-delay:120ms] sm:text-7xl">
          Connecting Through Conversation
        </h1>
        <p className="animate-fade-in-up mt-7 max-w-2xl text-lg leading-relaxed text-white/85 [animation-delay:240ms] sm:text-xl">
          Dialogue Partners is the ecosystem catalyst guiding Bangladesh&rsquo;s
          Ready-Made Garments sector from cost-driven manufacturing to a
          high-value, sustainable, and digitally connected industry.
        </p>
        <div className="animate-fade-in-up mt-10 flex flex-wrap items-center justify-center gap-4 [animation-delay:360ms]">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 rounded-full bg-accent-deep px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-navy hover:shadow-lg hover:shadow-accent/30"
          >
            Explore Our Insight
            {arrowIcon}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-4 text-base font-medium text-white transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            Talk to an Advisor
          </Link>
        </div>

        <dl className="animate-fade-in-up mt-16 grid w-full max-w-2xl grid-cols-2 gap-x-6 gap-y-8 border-t border-white/15 pt-10 [animation-delay:480ms] sm:grid-cols-4">
          {aboutStats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1.5 text-center">
              <dd className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {stat.value}
              </dd>
              <dt className="text-xs leading-snug text-white/60">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </Container>

      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce motion-reduce:animate-none sm:block"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-white/60">
          <path d="M12 5v14" />
          <path d="m5 12 7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}