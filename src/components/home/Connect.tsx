import Link from "next/link";
import Container from "@/components/site/Container";
import Reveal from "@/components/site/Reveal";
import { buttonAccent } from "@/components/site/button";
import { site } from "@/data/site";

export default function Connect() {
  return (
    <section className="bg-navy py-20 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-soft">
            Connect With Us
          </p>
          <h2 className="mt-3 text-[28px] font-semibold leading-[1.15] tracking-tight text-white sm:text-[32px] lg:text-[40px]">
            Let&rsquo;s Start the Conversation
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            Whether you&rsquo;re a brand exploring sourcing in Bangladesh, a
            manufacturer preparing for your next phase of growth, or a
            policymaker shaping the sector&rsquo;s future — we&rsquo;d like to
            hear from you.
          </p>
          <div className="mt-8">
            <Link href="/contact" className={buttonAccent}>
              Connect With Us
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="mt-7 text-sm text-white/55">
            {site.email} &nbsp;|&nbsp; {site.phone} &nbsp;|&nbsp; {site.city}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
