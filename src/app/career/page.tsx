import type { Metadata } from "next";
import Container from "@/components/site/Container";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Career",
  description: "Open roles and opportunities at Dialogue Partners.",
};

export default function CareerPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <PageHeader
          eyebrow="Career"
          title="Build the future of Bangladesh's RMG sector with us."
          lede="We are preparing this page — open roles and opportunities will be listed here."
        />
      </Container>
    </section>
  );
}
