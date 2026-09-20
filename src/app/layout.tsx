import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Urbanist } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import TopBar from "@/components/site/TopBar";

const bodyFont = Urbanist({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dialogue Partners",
    template: "%s | Dialogue Partners",
  },
  description:
    "Dialogue Partners is the ecosystem catalyst for Bangladesh’s RMG sector — connecting global brands, local manufacturers and technology leaders through conversation.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${bodyFont.variable} antialiased`}>
      <body className="flex min-h-svh flex-col bg-background text-foreground">
        <TopBar />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
