import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Urbanist } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
