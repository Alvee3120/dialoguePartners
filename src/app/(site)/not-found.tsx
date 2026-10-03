import type { Metadata } from "next";
import NotFoundContent from "@/components/site/NotFoundContent";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

/**
 * Handles `notFound()` thrown inside the (site) group (e.g. a closed job post).
 * The (site) layout already renders TopBar/SiteHeader/SiteFooter, so this only
 * supplies the body — otherwise the chrome would render twice.
 */
export default function SiteNotFound() {
  return <NotFoundContent />;
}
