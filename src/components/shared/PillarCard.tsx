import Link from "next/link";
import ImageSlot from "@/components/site/ImageSlot";
import type { Pillar } from "@/data/pillars";

export default function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <Link
      href={`/insights/${pillar.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-shadow duration-300 hover:shadow-lg"
    >
      {/* Card photograph */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <ImageSlot
          description={pillar.imageDescription}
          suggestedPath={pillar.imagePath}
          url={pillar.imagePath}
        />
      </div>

      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-accent-deep">
            {pillar.number}
          </span>
          <h3 className="text-xl font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent-deep">
            {pillar.title}
          </h3>
        </div>
        <p className="mt-4 leading-relaxed text-foreground">
          {pillar.summary}
        </p>
        <p className="mt-6 pt-1 text-sm font-semibold text-accent-deep">
          Explore this pillar{" "}
          <span
            aria-hidden="true"
            className="inline-block transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </p>
      </div>
    </Link>
  );
}