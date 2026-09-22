import Link from "next/link";
import {
  EnvelopeSimple,
  GlobeHemisphereWest,
  LinkedinLogo,
  MapPin,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import Container from "./Container";
import { site, socialLinks } from "@/data/site";

const socialIcons = {
  LinkedIn: LinkedinLogo,
  YouTube: YoutubeLogo,
  Website: GlobeHemisphereWest,
} as const;

/** Slim utility strip above the nav — contact details, CTA and social links. */
export default function TopBar() {
  return (
    <div className="hidden bg-navy-deep text-white/70 md:block">
      <Container className="flex h-10 items-center justify-between text-xs">
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-2 transition-colors hover:text-white"
          >
            <EnvelopeSimple className="size-3.5" aria-hidden="true" />
            {site.email}
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="size-3.5" aria-hidden="true" />
            {site.city}
          </span>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="/contact"
            className="font-semibold text-accent-soft transition-colors hover:text-white"
          >
            Connect With Us <span aria-hidden="true">→</span>
          </Link>
          <span aria-hidden="true" className="h-4 w-px bg-white/15" />
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href }) => {
              const Icon = socialIcons[label];
              return (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="transition-colors hover:text-white"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
