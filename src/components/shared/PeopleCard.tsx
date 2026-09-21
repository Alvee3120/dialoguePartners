import Link from "next/link";
import Image from "next/image";
import SocialLinks from "./SocialLinks";
import type { Person } from "@/data/people";

export default function PeopleCard({ person }: { person: Person }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl bg-white p-3 shadow-[0_18px_40px_-26px_rgba(16,32,47,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_50px_-26px_rgba(16,32,47,0.45)] motion-reduce:hover:translate-y-0">
      <Link
        href={`/people/${person.slug}`}
        className="flex flex-1 flex-col"
        aria-label={`Profile of ${person.name}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
          <Image
            src={person.imagePath}
            alt={`Portrait of ${person.name}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute bottom-3 left-3 rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
            {person.position}
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center px-2 pt-5 pb-1 text-center">
          <h3 className="text-[18px] font-semibold tracking-tight text-ink">
            {person.name}
          </h3>
        </div>
      </Link>

      <div className="flex justify-center px-2 pb-1 pt-4">
        <SocialLinks socials={person.socials} compact />
      </div>
    </article>
  );
}
