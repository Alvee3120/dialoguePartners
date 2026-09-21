import Link from "next/link";
import Container from "@/components/site/Container";
import Reveal from "@/components/site/Reveal";
import PeopleCard from "@/components/shared/PeopleCard";
import { buttonNavy } from "@/components/site/button";
import { people } from "@/data/people";

export default function People() {
  return (
    <section className="bg-paper py-20 sm:py-28">
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
            <Reveal key={person.slug} delay={i * 90} className="h-full">
              <PeopleCard person={person} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
