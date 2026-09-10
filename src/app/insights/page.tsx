import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/site/Container";
import PageHeader from "@/components/shared/PageHeader";
import PillarCard from "@/components/shared/PillarCard";
import { pillars } from "@/data/pillars";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "The four pillars of Dialogue Partners: Sustainability, Investment & Trade Facilitation, RMG Supply Chain Ecosystem, and Operational Excellence.",
};

export default function InsightsPage() {
  return (
    <>
      <section className="border-b border-line bg-paper py-16 sm:py-24">
        <Container>
          <PageHeader
            eyebrow="Insight"
            title="Four pillars. One connected ecosystem."
            lede="Our advisory work is organized around four pillars that map directly to the pressures reshaping the RMG sector today: sustainability expectations, capital and trade dynamics, supply chain volatility, and the operational shift toward digital manufacturing. Each pillar can be engaged independently — but the greatest impact comes from addressing them together."
          />
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {pillars.map((pillar) => (
              <PillarCard key={pillar.slug} pillar={pillar} />
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <p className="max-w-xl text-lg leading-relaxed text-foreground">
              Each pillar has its own detailed page exploring the services and
              areas of work behind it.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink-soft"
            >
              Talk to us about your priorities
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}