import Link from "next/link";
import Image from "next/image";
import ImageSlot from "@/components/site/ImageSlot";
import SocialLinks from "./SocialLinks";
import type { Person } from "@/data/people";

function Headshot({ person }: { person: Person }) {
  const isRemote = person.imagePath.startsWith("http");
  return (
    <div className="relative aspect-square overflow-hidden">
      {isRemote ? (
        <Image
          src={person.imagePath}
          alt={`Portrait of ${person.name}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      ) : (
        <ImageSlot
          description={`Professional portrait of ${person.name} — head-and-shoulders shot`}
          suggestedPath={person.imagePath}
        />
      )}
    </div>
  );
}

export default function PeopleCard({ person }: { person: Person }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-line bg-white">
      <Link href={`/people/${person.slug}`} className="block" aria-label={`Profile of ${person.name}`}>
        <Headshot person={person} />
        <div className="p-6">
          <h3 className="font-serif text-lg font-semibold tracking-tight text-ink">
            {person.name}
          </h3>
          <p className="mt-1 text-sm text-foreground">{person.position}</p>
          <p className="mt-3 text-sm font-medium text-accent-deep">
            {person.focus}
          </p>
        </div>
      </Link>
      <div className="px-6 pb-6">
        <SocialLinks socials={person.socials} compact />
      </div>
    </article>
  );
}