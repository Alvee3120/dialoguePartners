import Link from "next/link";
import Container from "@/components/site/Container";
import Reveal from "@/components/site/Reveal";
import { site } from "@/data/site";

export default function Connect() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-deep py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="bg-blob animate-float-slow -left-20 top-0 size-96 bg-accent/20"
      />
      <div
        aria-hidden="true"
        className="bg-blob -right-16 bottom-0 size-72 bg-accent-bright/10"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-bright">
            Connect With Us
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Let&rsquo;s Start the Conversation
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">
            Whether you&rsquo;re a brand exploring sourcing in Bangladesh, a
            manufacturer preparing for your next phase of growth, or a
            policymaker shaping the sector&rsquo;s future — we&rsquo;d like to
            hear from you.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent-deep px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-navy-soft hover:shadow-lg hover:shadow-accent/30"
            >
              Connect With Us
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="mt-8 text-sm text-white/60">
            {site.email} &nbsp;|&nbsp; {site.phone} &nbsp;|&nbsp; {site.city}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
