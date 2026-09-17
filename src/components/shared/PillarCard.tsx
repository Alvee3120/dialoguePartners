import Link from "next/link";
import ImageSlot from "@/components/site/ImageSlot";
import type { Pillar } from "@/data/pillars";

export default function PillarCard({
  pillar,
  className = "",
}: {
  pillar: Pillar;
  className?: string;
}) {
  return (
    <Link
      href={`/insights/${pillar.slug}`}
      className={`group flex flex-col gap-4 p-6 transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-deep sm:flex-row sm:items-center sm:gap-5 ${className}`}
    >
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-2xl sm:aspect-square sm:w-24">
        <ImageSlot
          description={pillar.imageDescription}
          suggestedPath={pillar.imagePath}
          url={pillar.imagePath}
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm text-accent-deep">
            {pillar.number}
          </span>
          <span
            aria-hidden="true"
            className="text-accent-deep transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </div>
        <h3 className="mt-1.5 text-lg font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent-deep">
          {pillar.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground">
          {pillar.tagline}
        </p>
      </div>
    </Link>
  );
}
