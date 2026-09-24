import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/** Bare shell for all /admin routes — no public header/footer. */
export default function AdminRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="flex min-h-svh flex-1 flex-col bg-paper">{children}</div>;
}
