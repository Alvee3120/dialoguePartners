import Container from "@/components/site/Container";
import Reveal from "@/components/site/Reveal";
import { site } from "@/data/site";

export default function CtaBand({
  title = "Let’s start a conversation",
  lede = "Tell us where you want to take the RMG sector next — we are listening.",
}: {
  title?: string;
  lede?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-deep py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="bg-blob left-1/2 top-0 size-80 -translate-x-1/2 bg-accent/15"
      />
      <Container className="relative">
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-white/70">{lede}</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 rounded-full bg-accent-deep px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-navy-soft hover:shadow-lg hover:shadow-accent/30"
          >
            {site.email}
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
