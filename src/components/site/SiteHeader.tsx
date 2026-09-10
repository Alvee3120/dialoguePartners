import Link from "next/link";
import Logo from "./Logo";

const leftNav = [
  { label: "Who We Are", href: "/about" },
  { label: "Insights", href: "/insights" },
];

const rightNav = [
  { label: "People", href: "/people" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-background/90 backdrop-blur">
      <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left nav group (desktop) */}
        <ul className="hidden items-center gap-7 text-sm font-medium text-ink/80 lg:flex">
          {leftNav.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors hover:text-accent-deep"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile spacer */}
        <div className="lg:hidden" />

        {/* Center logo */}
        <div className="flex justify-center">
          <Logo />
        </div>

        {/* Right nav group + CTA (desktop) */}
        <div className="hidden items-center gap-7 lg:flex">
          <ul className="flex items-center gap-7 text-sm font-medium text-ink/80">
            {rightNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-accent-deep"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-soft"
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
          <summary className="flex size-10 list-none items-center justify-center rounded-lg text-ink [&::-webkit-details-marker]:hidden">
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
                  className="block rounded-full bg-ink px-4 py-2.5 text-center text-sm font-medium text-white"
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