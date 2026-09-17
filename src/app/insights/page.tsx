import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/site/Container";
import PageHeader from "@/components/shared/PageHeader";
import PillarCard from "@/components/shared/PillarCard";
import { pillars } from "@/data/pillars";

const cellBorders = [
  "border-b border-line lg:border-e",
  "border-b border-line",
  "border-b border-line lg:border-b-0 lg:border-e",
  "",
];

export const metadata: Metadata = {
  title: "Insights",
  description:
    "The four pillars of Dialogue Partners: Sustainability, Investment & Trade Facilitation, RMG Supply Chain Ecosystem, and Operational Excellence.",
};

export default function InsightsPage() {
  return (
    <>
      <section className="border-b border-line bg-paper py-10 sm:py-14">
        <Container>
          <PageHeader
            eyebrow="Insight"
            title="Four pillars. One connected ecosystem."
            lede="Four interconnected pillars mapping the pressures reshaping the RMG sector today. Engage any one independently — the impact compounds when you address them together."
          />
        </Container>
      </section>

      <section className="pb-12 pt-8 sm:pb-16 sm:pt-10">
        <Container>
          <div className="overflow-hidden rounded-3xl border border-line bg-white lg:grid lg:grid-cols-2">
            {pillars.map((pillar, i) => (
              <PillarCard
                key={pillar.slug}
                pillar={pillar}
                className={cellBorders[i]}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-navy-soft"
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