import type { ReactNode } from "react";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import TopBar from "@/components/site/TopBar";

/** Public site chrome. Admin routes live outside this group and get their own. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TopBar />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
