import Link from "next/link";
import {
  ArrowRight,
  ChartLineUp,
  Factory,
  Leaf,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/site/Container";
import { buttonAccent, buttonGhostLight } from "@/components/site/button";
import { site } from "@/data/site";

const stats = [
  { icon: UsersThree, value: "100+", label: "Industry Stakeholders" },
  { icon: ChartLineUp, value: "Strategic", label: "Insights" },
  { icon: Leaf, value: "Sustainable", label: "Growth" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative -mt-20 flex min-h-svh flex-col overflow-hidden bg-navy"
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
        <source src={site.heroVideo} type="video/mp4" />
      </video>

      {/* Dark overlay for legibility, tinted toward the brand teal */}
      <div className="absolute inset-0 bg-navy/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/70 via-navy/30 to-navy/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/65 via-transparent to-navy-deep/20" />

      <Container className="relative z-10 flex w-full flex-1 flex-col justify-center pt-36 pb-14">
        <div className="max-w-2xl">
          <p className="animate-fade-in-up text-xs font-semibold uppercase tracking-[0.28em] text-accent-bright">
            Ecosystem Catalyst
          </p>
          <p className="animate-fade-in-up mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/70 [animation-delay:80ms]">
            The North Star for Bangladesh&rsquo;s RMG Transformation
          </p>
          <h1 className="animate-fade-in-up mt-5 text-[40px] font-semibold leading-[1.04] tracking-tight text-white [animation-delay:160ms] sm:text-[56px] lg:text-[66px]">
            Connecting Through{" "}
            <span className="text-accent-bright">Conversation</span>
          </h1>
          <p className="animate-fade-in-up mt-6 max-w-xl text-base leading-relaxed text-white/85 [animation-delay:240ms] sm:text-lg">
            Dialogue Partners is the ecosystem catalyst guiding
            Bangladesh&rsquo;s Ready-Made Garments sector from cost-driven
            manufacturing to a high-value, sustainable, and digitally
            connected industry.
          </p>
          <div className="animate-fade-in-up mt-9 flex flex-wrap items-center gap-4 [animation-delay:320ms]">
            <Link href="/pillars" className={buttonAccent}>
              Explore Our Pillars
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/contact" className={buttonGhostLight}>
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </Container>

      {/* Stat strip */}
      <div className="relative z-10 border-t border-white/10 bg-navy-deep/40 backdrop-blur-sm">
        <Container className="flex flex-wrap items-center gap-x-14 gap-y-6 py-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-3">
                <Icon className="size-7 shrink-0 text-accent-bright" aria-hidden="true" />
                <div>
                  <p className="text-xl font-semibold leading-none text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </Container>
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden="true"
        className="relative z-10 flex flex-col items-center gap-2 pb-6 pt-5 text-white/55"
      >
        <span className="flex h-8 w-5 items-start justify-center rounded-full border border-white/40 pt-1.5">
          <span className="size-1 animate-bounce rounded-full bg-white/70 motion-reduce:animate-none" />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
          Scroll to Explore
        </span>
      </div>

      {/* Floating highlight card */}
      <Link
        href="/about"
        className="group absolute bottom-28 right-6 z-10 hidden max-w-xs items-center gap-4 rounded-2xl border border-white/15 bg-navy-deep/85 p-5 backdrop-blur transition-colors hover:bg-navy-deep xl:flex"
      >
        <Factory className="size-8 shrink-0 text-accent-bright" aria-hidden="true" />
        <p className="text-sm font-medium leading-snug text-white">
          A More Resilient, Inclusive &amp; Competitive RMG Bangladesh
        </p>
        <ArrowRight
          className="size-4 shrink-0 text-white/70 transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
          aria-hidden="true"
        />
      </Link>
    </section>
  );
}
