import Link from "next/link";
import Container from "./Container";
import { site } from "@/data/site";

/** Slim utility strip above the nav — contact details + a short CTA. */
export default function TopBar() {
  return (
    <div className="hidden bg-navy text-white/70 md:block">
      <Container className="flex h-9 items-center justify-between text-xs">
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-white"
          >
            {site.email}
          </a>
          <span aria-hidden="true" className="text-white/25">
            |
          </span>
          <span>{site.city}</span>
        </div>
        <Link
          href="/contact"
          className="font-semibold text-accent-soft transition-colors hover:text-white"
        >
          Connect With Us <span aria-hidden="true">→</span>
        </Link>
      </Container>
    </div>
  );
}
