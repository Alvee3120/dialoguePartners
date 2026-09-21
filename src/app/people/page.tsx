import type { Metadata } from "next";
import Container from "@/components/site/Container";
import PageHeader from "@/components/shared/PageHeader";
import PeopleCard from "@/components/shared/PeopleCard";
import { people } from "@/data/people";

export const metadata: Metadata = {
  title: "Our Advisors",
  description: "The advisors and partners behind Dialogue Partners.",
};

export default function PeoplePage() {
  return (
    <>
      <section className="border-b border-line bg-paper py-16 sm:py-24">
        <Container>
          <PageHeader
            eyebrow="Our Advisors"
            title="Advisors who've stood on both sides of the table."
            lede="Dialogue Partners is led by professionals with direct, hands-on experience across global sourcing, sustainability compliance, trade policy, and factory operations. We don't advise from theory — we advise from experience earned inside the industry we now help transform."
          />
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {people.map((person) => (
              <PeopleCard key={person.slug} person={person} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}