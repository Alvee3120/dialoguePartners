"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/actions/auth";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/jobs", label: "Job posts" },
  { href: "/admin/applications", label: "Applications" },
];

export default function AdminNav({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col gap-4 border-b border-line bg-navy px-4 py-4 text-white lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
      <div className="flex items-baseline justify-between gap-3 lg:block">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-soft">
            Admin
          </p>
          <p className="mt-1 text-sm font-semibold">{name}</p>
          <p className="text-xs text-white/60">{email}</p>
        </div>
      </div>

      <nav className="-mx-1 flex flex-row gap-1 overflow-x-auto lg:mx-0 lg:flex-col">
        {links.map((link) => {
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-white/15 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <form action={logoutAction} className="lg:mt-auto">
        <button
          type="submit"
          className="w-full rounded-xl border border-white/25 px-3 py-2 text-sm font-medium text-white/85 transition-colors hover:border-white hover:bg-white/10"
        >
          Sign out
        </button>
      </form>
    </aside>
  );
}
