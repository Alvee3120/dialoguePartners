"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import { corePillars } from "@/data/corePillars";

const leftNav = [
  { label: "Who We Are", href: "/about" },
  { label: "Values", href: "/values" },
];

const rightNav = [
  { label: "Insight", href: "/pillars", dropdown: true },
  { label: "People", href: "/people", dropdown: false },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the home page the hero sits under the header, so the nav has to render
  // light while it overlaps the dark video. Everywhere else it sits on light
  // surfaces and keeps the ink palette.
  const overHero = pathname === "/" && !scrolled;

  const navLinkClass = overHero
    ? "transition-colors hover:text-white"
    : "transition-colors hover:text-accent-deep";

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 motion-reduce:transition-none ${
        scrolled
          ? "bg-background/85 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:px-8">
        {/* Left nav group (desktop) */}
        <ul
          className={`hidden items-center gap-7 text-sm font-medium lg:flex lg:justify-start ${
            overHero ? "text-white/85" : "text-ink/80"
          }`}
        >
          {leftNav.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile spacer */}
        <div className="lg:hidden" />

        {/* Center logo — inverted to white while it overlaps the hero video */}
        <div
          className={`flex justify-center ${
            overHero ? "brightness-0 invert" : ""
          }`}
        >
          <Logo />
        </div>

        {/* Right nav group + CTA (desktop) */}
        <div className="hidden items-center gap-7 lg:flex lg:justify-end">
          <ul
            className={`flex items-center gap-7 text-sm font-medium ${
              overHero ? "text-white/85" : "text-ink/80"
            }`}
          >
            {rightNav.map((link) =>
              link.dropdown ? (
                <li key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    aria-haspopup="true"
                    className={`inline-flex items-center gap-1.5 ${navLinkClass}`}
                  >
                    {link.label}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-300 group-hover:rotate-180 motion-reduce:transition-none"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </Link>

                  {/* Pillar submenu — opens on hover and keyboard focus */}
                  <div className="pointer-events-none absolute left-0 top-full z-50 w-max translate-y-1 pt-5 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none">
                    <ul className="overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-xl shadow-navy/10">
                      {corePillars.map((pillar) => (
                        <li key={pillar.slug}>
                          <Link
                            href={`/pillars/${pillar.slug}`}
                            className="block whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-paper hover:text-accent-deep"
                          >
                            {pillar.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={link.href}>
                  <Link href={link.href} className={navLinkClass}>
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>
          <Link
            href="/contact"
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              overHero
                ? "bg-white text-ink hover:bg-white/90"
                : "bg-navy text-white hover:bg-navy-soft"
            }`}
          >
            Get Started
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="size-4"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <details className="group relative lg:hidden">
          <summary
            className={`flex size-10 list-none items-center justify-center rounded-lg [&::-webkit-details-marker]:hidden ${
              overHero ? "text-white" : "text-ink"
            }`}
          >
            <span className="sr-only">Open menu</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              className="size-6"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" className="group-open:hidden" />
              <path
                d="m6 6 12 12M18 6 6 18"
                className="hidden group-open:block"
              />
            </svg>
          </summary>
          <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-line bg-white p-2 shadow-lg">
            <ul className="flex flex-col">
              {[...leftNav, ...rightNav].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-lg px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-1 border-t border-line pt-2">
                <Link
                  href="/contact"
                  className="block rounded-full bg-navy px-4 py-2.5 text-center text-sm font-medium text-white"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </details>
      </nav>
    </header>
  );
}
