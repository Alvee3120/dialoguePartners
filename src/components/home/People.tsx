import Link from "next/link";
import Image from "next/image";
import Container from "@/components/site/Container";
import Reveal from "@/components/site/Reveal";
import { buttonNavy } from "@/components/site/button";
import { people } from "@/data/people";
import type { Person } from "@/data/people";

function PersonPhoto({ person }: { person: Person }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden">
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

export default function People() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-deep">
              Our Advisors
            </p>
            <h2 className="mt-3 text-[28px] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[32px] lg:text-[40px]">
              Meet Our Advisors
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground">
              Dialogue Partners is built on decades of combined experience
              across manufacturing, sustainability, trade policy, and digital
              transformation. Our advisors have sat on both sides of the table —
              inside global brands and inside the factories that supply them —
              which is exactly why our advice works in the real world, not just
              on paper.
            </p>
          </div>
          <Link href="/people" className={buttonNavy}>
            Meet the team
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person, i) => (
            <Reveal key={person.slug} delay={i * 90}>
              <article className="group overflow-hidden rounded-xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0">
                <Link href={`/people/${person.slug}`} className="block">
                  <div className="overflow-hidden">
                    <div className="transition-transform duration-500 group-hover:scale-105">
                      <PersonPhoto person={person} />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[18px] font-semibold tracking-tight text-ink">
                      {person.name}
                    </h3>
                    <p className="mt-1 text-sm text-foreground">
                      {person.position}
                    </p>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
