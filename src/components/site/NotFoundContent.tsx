import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/site/Container";
import { buttonNavy, buttonSecondary } from "@/components/site/button";
import Reveal from "@/components/site/Reveal";
import { navLinks } from "@/data/site";

/**
 * The 404 body only — no site chrome. The root not-found wraps this in its own
 * TopBar/SiteHeader/SiteFooter, while the (site) not-found relies on the
 * (site) layout for that chrome so it never renders twice.
 */
export default function NotFoundContent() {
  return (
    <section className="relative overflow-hidden bg-soft-radial py-24 sm:py-32">
      <div aria-hidden="true" className="bg-blob -left-16 top-10 size-72 bg-accent/15" />
      <div aria-hidden="true" className="bg-blob -right-20 bottom-0 size-80 bg-navy/10" />

      <Container className="relative flex flex-col items-center text-center">
        <Reveal className="flex flex-col items-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-deep">
            Error 404
          </p>
          <p className="mt-5 text-[88px] font-semibold leading-none tracking-tight text-navy sm:text-[128px]">
            4<span className="text-accent-bright">0</span>4
          </p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            This page hasn&rsquo;t joined the conversation.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-foreground">
            The page you&rsquo;re looking for may have moved or no longer
            exists. Let&rsquo;s get you back on track.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/" className={buttonNavy}>
              Back to Homepage
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/contact" className={buttonSecondary}>
              Talk to an Advisor
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-2 border-t border-line pt-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent-deep"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
