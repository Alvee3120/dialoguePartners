import Link from "next/link";
import Container from "@/components/site/Container";
import { site } from "@/data/site";

export default function Connect() {
  return (
    <section className="bg-ink py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
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
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-ink transition-colors hover:bg-accent-soft"
            >
              Connect With Us
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="mt-8 text-sm text-white/60">
            {site.email} &nbsp;|&nbsp; {site.phone} &nbsp;|&nbsp; {site.city}
          </p>
        </div>
      </Container>
    </section>
  );
}