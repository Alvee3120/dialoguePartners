import Container from "@/components/site/Container";
import { site } from "@/data/site";

export default function CtaBand({
  title = "Let\u2019s start a conversation",
  lede = "Tell us where you want to take the RMG sector next — we are listening.",
}: {
  title?: string;
  lede?: string;
}) {
  return (
    <section className="bg-ink py-16 sm:py-20">
      <Container className="flex flex-col items-center text-center">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-white/70">{lede}</p>
        <a
          href={`mailto:${site.email}`}
          className="mt-8 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-soft"
        >
          {site.email}
        </a>
      </Container>
    </section>
  );
}
