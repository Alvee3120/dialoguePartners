import Container from "@/components/site/Container";
import Reveal from "@/components/site/Reveal";
import { site } from "@/data/site";

export default function Philosophy() {
  return (
    <section className="bg-navy py-20 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-soft">
            Our Philosophy
          </p>
          <p className="mt-5 text-[24px] font-medium leading-snug tracking-tight text-white sm:text-[32px]">
            &ldquo;{site.motto}&rdquo;
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75">
            We believe transformation doesn&rsquo;t come from top-down mandates
            or one-off audits. It comes from sustained engagement, conversations
            &amp; commitments for real change. We act as a catalyst, aiming to be
            The North Star of Bangladesh&rsquo;s RMG industry.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
