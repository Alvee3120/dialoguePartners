import type { Person } from "@/data/people";

const linkIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="size-4"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1-.001-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452z" />
  </svg>
);

const emailIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="size-4"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

type SocialLinksProps = {
  socials: Person["socials"];
  /** Compact (small icon buttons) or spacious (icon + label) layout. */
  compact?: boolean;
};

export default function SocialLinks({ socials, compact = false }: SocialLinksProps) {
  if (!socials.linkedin && !socials.email) return null;

  const items = [
    { href: socials.linkedin, label: "LinkedIn profile", icon: linkIcon },
    { href: socials.email, label: "Email", icon: emailIcon },
  ].filter((item) => item.href);

  return (
    <ul
      className={`flex items-center gap-2 ${
        compact ? "" : "mt-6"
      }`}
    >
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            aria-label={item.label}
            className={
              compact
                ? "flex size-9 items-center justify-center rounded-lg border border-line text-navy transition-colors hover:border-accent-deep hover:text-accent-deep"
                : "inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent-deep hover:text-accent-deep"
            }
          >
            {item.icon}
            {compact ? null : <span>{item.label}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
