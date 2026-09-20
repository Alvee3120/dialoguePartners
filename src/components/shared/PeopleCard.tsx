import Link from "next/link";
import Image from "next/image";
import SocialLinks from "./SocialLinks";
import type { Person } from "@/data/people";

function Headshot({ person }: { person: Person }) {
  return (
    <div className="relative aspect-square overflow-hidden">
      <Image
        src={person.imagePath}
        alt={`Portrait of ${person.name}`}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}

export default function PeopleCard({ person }: { person: Person }) {
  return (
    <article className="overflow-hidden rounded-xl border border-line bg-white">
      <Link href={`/people/${person.slug}`} className="block" aria-label={`Profile of ${person.name}`}>
        <Headshot person={person} />
        <div className="p-5">
          <h3 className="text-[18px] font-semibold tracking-tight text-ink">
            {person.name}
          </h3>
          <p className="mt-1 text-sm text-foreground">{person.position}</p>
          <p className="mt-3 text-sm font-medium text-accent-deep">
            {person.focus}
          </p>
        </div>
      </Link>
      <div className="px-5 pb-5">
        <SocialLinks socials={person.socials} compact />
      </div>
    </article>
  );
}