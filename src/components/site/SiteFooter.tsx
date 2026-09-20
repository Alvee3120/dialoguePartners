import Image from "next/image";
import Link from "next/link";
import { navLinks, site } from "@/data/site";
import { corePillars } from "@/data/corePillars";
import Container from "./Container";

export default function SiteFooter() {
  return (
    <footer className="bg-navy text-white/70">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex shrink-0 rounded-2xl bg-white p-2">
                <Image
                  src="/images/logo.svg"
                  alt=""
                  width={661}
                  height={429}
                  className="h-8 w-auto"
                />
              </span>
              <div>
                <p className="text-lg font-semibold tracking-tight text-white">
                  {site.name}
                </p>
                <p className="mt-0.5 text-sm font-medium text-accent-soft">
                  {site.tagline}
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              A consultancy and ecosystem catalyst for the RMG sector — from
              Dhaka to the global market.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-white"
                >
                  Connect With Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Pillars
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {corePillars.map((pillar) => (
                <li key={pillar.slug}>
                  <Link
                    href={`/pillars/${pillar.slug}`}
                    className="transition-colors hover:text-white"
                  >
                    {pillar.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="break-all transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </li>
              <li className="leading-relaxed">{site.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.city}</p>
        </div>
      </Container>
    </footer>
  );
}
