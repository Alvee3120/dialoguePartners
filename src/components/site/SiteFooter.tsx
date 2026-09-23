import Image from "next/image";
import Link from "next/link";
import {
  EnvelopeSimple,
  GlobeHemisphereWest,
  LinkedinLogo,
  MapPin,
  Phone,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import { navLinks, site, socialLinks } from "@/data/site";
import { corePillars } from "@/data/corePillars";
import Container from "./Container";
import Logo from "./Logo";

const socialIcons = {
  LinkedIn: LinkedinLogo,
  YouTube: YoutubeLogo,
  Website: GlobeHemisphereWest,
} as const;

function ColumnHeading({ children }: { children: string }) {
  return (
    <p className="inline-block border-b border-accent pb-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
      {children}
    </p>
  );
}

const linkClass = "transition-colors hover:text-accent-bright";

export default function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-navy-deep text-white">
      <Image
        src={site.footerBackground}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep/80 to-navy-deep/85"
      />

      <Container className="relative pt-14 pb-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-2 md:gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div className="col-span-2 md:col-span-1">
            <Logo inverted />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/75">
              A consultancy and ecosystem catalyst for the RMG sector — from
              Dhaka to the global market.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, href }) => {
                const Icon = socialIcons[label];
                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-navy"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <ColumnHeading>Explore</ColumnHeading>
            <ul className="mt-5 space-y-2.5 text-sm text-white/80">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className={linkClass}>
                  Connect With Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <ColumnHeading>Pillars</ColumnHeading>
            <ul className="mt-5 space-y-2.5 text-sm text-white/80">
              {corePillars.map((pillar) => (
                <li key={pillar.slug}>
                  <Link href={`/pillars/${pillar.slug}`} className={linkClass}>
                    {pillar.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <ColumnHeading>Contact</ColumnHeading>
            <ul className="mt-5 space-y-3.5 text-sm text-white/80">
              <li className="flex gap-3 leading-relaxed">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {site.address}
              </li>
              <li className="flex gap-3">
                <EnvelopeSimple
                  className="mt-0.5 size-4 shrink-0"
                  aria-hidden="true"
                />
                <a href={`mailto:${site.email}`} className={`break-all ${linkClass}`}>
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className={linkClass}
                >
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
