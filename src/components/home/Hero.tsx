import Link from "next/link";
import Container from "@/components/site/Container";
import { buttonAccent, buttonGhostLight } from "@/components/site/button";

const VIDEO_URL =
  "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/Hero-DialoguePartners.mp4";

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
        <p className="animate-fade-in-up text-xs font-semibold uppercase tracking-[0.25em] text-gold">
          Ecosystem Catalyst | The North Star for Bangladesh&rsquo;s RMG Transformation
        </p>
        <h1 className="animate-fade-in-up mt-5 max-w-4xl text-[36px] font-semibold leading-[1.06] tracking-tight text-white [animation-delay:120ms] sm:text-[52px] lg:text-[64px]">
          Connecting Through Conversation
        </h1>
        <p className="animate-fade-in-up mt-6 max-w-2xl text-base leading-relaxed text-white/85 [animation-delay:240ms] sm:text-lg">
          Dialogue Partners is the ecosystem catalyst guiding Bangladesh&rsquo;s
          Ready-Made Garments sector from cost-driven manufacturing to a
          high-value, sustainable, and digitally connected industry.
        </p>
        <div className="animate-fade-in-up mt-9 flex flex-wrap items-center justify-center gap-4 [animation-delay:360ms]">
          <Link href="/pillars" className={buttonAccent}>
            Explore Our Pillars
            {arrowIcon}
          </Link>
          <Link href="/contact" className={buttonGhostLight}>
            Talk to an Advisor
          </Link>
        </div>
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
