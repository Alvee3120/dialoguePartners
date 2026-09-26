import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/site/Container";
import CtaBand from "@/components/shared/CtaBand";
import MediaCard from "@/components/shared/MediaCard";
import PhotoGallery from "@/components/shared/PhotoGallery";
import { getPerson, people, VIDEO_PATTERN } from "@/data/people";
import type { Person } from "@/data/people";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return people.map((person: Person) => ({ slug: person.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) return {};
  return { title: `${person.name} | Dialogue Partners`, description: `${person.position} at Dialogue Partners.` };
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">{children}</p>;
}

export default async function PersonPage({ params }: PageProps) {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) notFound();

  if (person.comingSoon) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-paper py-20">
        <Container className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">
            Advisor Profile
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Coming Soon
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-foreground">
            {person.name}&rsquo;s full profile is on its way.
          </p>
          <Link
            href="/people"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-navy-soft"
          >
            <span aria-hidden="true">←</span>
            Back to People
          </Link>
        </Container>
      </section>
    );
  }

  const galleryImages = person.gallery.flatMap((entry) => entry.images);
  const videoCount = galleryImages.filter((path) => VIDEO_PATTERN.test(path)).length;
  const photoCount = galleryImages.length - videoCount;

  return (
    <>
      {/* Breadcrumb */}
      <section className="border-b border-line bg-paper py-6">
        <Container>
          <nav className="flex items-center gap-2 text-sm text-foreground/70">
            <Link href="/people" className="transition-colors hover:text-accent-deep">People</Link>
            <span aria-hidden="true" className="text-foreground/40">/</span>
            <span className="text-ink">{person.name}</span>
          </nav>
        </Container>
      </section>

      {/* Hero / profile card */}
      <section className="bg-navy text-white">
        <Container className="pt-14 pb-0 sm:pt-20">
          <div className="grid gap-10 lg:grid-cols-[360px_1fr] lg:gap-16">
            {/* Portrait */}
            <div className="relative w-full lg:max-w-[360px]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
                <Image src={person.imagePath} alt={`Portrait of ${person.name}`} fill sizes="(min-width: 1024px) 360px, 100vw" className="object-cover" />
              </div>
            </div>

            {/* Title block */}
            <div className="flex flex-col justify-center pb-10">
              <SectionLabel>Advisor Profile</SectionLabel>
              <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{person.name}</h1>
              <p className="mt-3 text-lg font-medium text-accent-soft">{person.position}</p>
              {person.tagline ? (
                <p className="mt-1 text-sm text-white/70">{person.tagline}</p>
              ) : null}

              <div className="mt-8 space-y-4 leading-relaxed text-white/80">
                {person.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href={person.socials.linkedin} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white/90">
                  LinkedIn
                </a>
                <a href={`mailto:${person.socials.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10">
                  Email
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership highlights */}
      <section className="border-b border-line bg-paper py-10">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {person.highlights.map((h) => (
              <div key={h.value} className="rounded-2xl border border-line bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-deep">{h.label}</p>
                <p className="mt-2 text-sm font-medium leading-snug text-ink">{h.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Media interviews — image cards */}
      {person.media.length > 0 && (
        <section className="py-16 sm:py-20">
          <Container>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-5">
              <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Media &amp; Interviews
              </h2>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
                {person.media.length} items
              </p>
            </div>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {person.media.map((m) => (
                <MediaCard key={m.title} item={m} />
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Photo gallery */}
      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-5">
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Photos
            </h2>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
              {videoCount > 0
                ? `${photoCount} photos · ${videoCount} videos`
                : `${photoCount} photos`}
            </p>
          </div>
          <PhotoGallery entries={person.gallery} name={person.name} />
        </Container>
      </section>

      <CtaBand title={`Work with ${person.name}`} />
    </>
  );
}
