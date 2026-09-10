import Link from "next/link";
import Image from "next/image";
import Container from "@/components/site/Container";
import ImageSlot from "@/components/site/ImageSlot";
import { people } from "@/data/people";
import type { Person } from "@/data/people";

function PersonPhoto({ person }: { person: Person }) {
  const isRemote = person.imagePath.startsWith("http");
  return (
    <div className="relative aspect-[4/5] overflow-hidden">
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
          description={`Professional portrait of ${person.name}`}
          suggestedPath={person.imagePath}
        />
      )}
    </div>
  );
}

export default function People() {
  return (
    <section className="border-y border-line bg-paper py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">
              Our Advisors
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Meet Our Advisors
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground">
              Dialogue Partners is built on decades of combined experience
              across manufacturing, sustainability, trade policy, and digital
              transformation. Our advisors have sat on both sides of the table —
              inside global brands and inside the factories that supply them —
              which is exactly why our advice works in the real world, not just
              on paper.
            </p>
          </div>
          <Link
            href="/people"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink-soft"
          >
            Meet the team
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => (
            <article
              key={person.slug}
              className="overflow-hidden rounded-3xl border border-line bg-white transition-shadow duration-300 hover:shadow-lg"
            >
              <Link href={`/people/${person.slug}`} className="block">
                <PersonPhoto person={person} />
                <div className="p-6">
                  <h3 className="font-serif text-lg font-semibold tracking-tight text-ink">
                    {person.name}
                  </h3>
                  <p className="mt-1 text-sm text-foreground">
                    {person.position}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}