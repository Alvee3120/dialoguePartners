import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/site/Container";
import CtaBand from "@/components/shared/CtaBand";
import { getPerson, people } from "@/data/people";
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

const iconMap = {
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-6">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  bolt: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-6"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
  compass: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-6"><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" /></svg>,
  link: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-6"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-6"><path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3z" /></svg>,
  chart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-6"><path d="M3 3v18h18" /><path d="M7 15v-3" /><path d="M12 15V8" /><path d="M17 15v-5" /></svg>,
  users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-6"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  arrow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>,
  graduation: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-6"><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1 2.7 2 6 2s6-1 6-2v-5" /><path d="M22 10v6" /></svg>,
  camera: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-6"><rect width="18" height="18" x="3" y="3" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>,
};

const VIDEO_PATTERN = /\.(mov|mp4|m4v|webm)$/i;

function ImageHolder({ imagePath, label, fill = false }: { imagePath: string; label: string; fill?: boolean }) {
  const isVideo = VIDEO_PATTERN.test(imagePath);
  const remote = imagePath.startsWith("http");
  return (
    <div className={`relative w-full overflow-hidden bg-slate-100 ${fill ? "min-h-0 flex-1" : "aspect-[4/3]"}`}>
      {remote && isVideo ? (
        <video
          src={imagePath}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          aria-label={label}
          className="absolute inset-0 size-full object-cover"
        />
      ) : remote ? (
        <Image src={imagePath} alt={label} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
      ) : (
        <div role="img" aria-label={`Image placeholder: ${label}`} className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-line p-6 text-center text-slate-400">
          <div className="max-w-xs">
            <span className="mx-auto flex size-10 items-center justify-center">{iconMap.camera}</span>
            <p className="mt-2 text-sm font-medium">{label}</p>
            <p className="mt-1 font-mono text-[11px] text-slate-400">{imagePath}</p>
          </div>
        </div>
      )}
      {remote && isVideo ? (
        <span className="pointer-events-none absolute bottom-2 left-2 rounded-full bg-navy/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur">
          Video
        </span>
      ) : null}
    </div>
  );
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

  const isDetailed = person.competencies.length > 4;

  const videoCount = person.gallery.filter((img) => VIDEO_PATTERN.test(img.imagePath)).length;
  const photoCount = person.gallery.length - videoCount;

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
              ) : (
                <p className="mt-1 text-sm text-white/70">Focus: {person.focus}</p>
              )}

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

      {isDetailed ? (
        <>
          {/* Core competencies */}
          <section className="py-16 sm:py-20">
            <Container>
              <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-16">
                <SectionLabel>Core Competencies</SectionLabel>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {person.competencies.map((item, i) => (
                    <div key={item} className="rounded-2xl border border-line bg-white p-6">
                      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent-deep">
                        {[iconMap.target, iconMap.bolt, iconMap.compass, iconMap.link, iconMap.shield, iconMap.chart, iconMap.users, iconMap.graduation][i % 8]}
                      </span>
                      <p className="mt-4 text-sm font-medium leading-snug text-ink">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </section>

          {/* Portfolio */}
          <section className="bg-paper py-16 sm:py-20">
            <Container>
              <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-16">
                <SectionLabel>Current Portfolio</SectionLabel>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {person.portfolio.map((item, i) => (
                    <li key={item} className="flex gap-3 rounded-2xl border border-line bg-white p-6">
                      <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-foreground">
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Container>
          </section>

          {/* Career timeline */}
          <section className="py-16 sm:py-20">
            <Container>
              <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-16">
                <SectionLabel>Career Snapshot</SectionLabel>
                <ol className="relative border-l border-line pl-8">
                  {person.experience.map((job) => (
                    <li key={`${job.role}-${job.org}-${job.period}`} className="relative pb-10 last:pb-0">
                      <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full border-2 border-accent bg-white" />
                      <p className="text-sm font-semibold text-accent-deep">{job.period}</p>
                      <h3 className="mt-1 text-lg font-semibold tracking-tight text-ink">{job.role} · {job.org}</h3>
                      {job.scope ? <p className="mt-0.5 text-sm font-medium text-foreground/70">{job.scope}</p> : null}
                      <p className="mt-2 text-sm leading-relaxed text-foreground">{job.description}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Container>
          </section>
        </>
      ) : (
        <>
          {/* Simple experience (fallback for other advisors) */}
          <section className="py-16 sm:py-20">
            <Container>
              <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-16">
                <SectionLabel>Experience</SectionLabel>
                <ol className="relative border-l border-line pl-8">
                  {person.experience.map((item) => (
                    <li key={`${item.role}-${item.org}`} className="relative pb-10 pl-2 last:pb-0">
                      <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full border-2 border-accent bg-white" />
                      <p className="font-semibold text-ink">{item.role}</p>
                      <p className="mt-0.5 text-sm text-foreground">{item.org}{item.period ? ` · ${item.period}` : ""}</p>
                      {item.description ? <p className="mt-2 text-sm text-foreground/80">{item.description}</p> : null}
                    </li>
                  ))}
                </ol>
              </div>
            </Container>
          </section>
        </>
      )}

      {/* Education / credentials */}
      {person.education.length > 0 && (
        <section className="bg-paper py-16 sm:py-20">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-16">
              <SectionLabel>Academic Credentials</SectionLabel>
              <ul className="space-y-3">
                {person.education.map((item) => (
                  <li key={item} className="flex gap-3 rounded-2xl border border-line bg-white p-5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-deep">{iconMap.graduation}</span>
                    <span className="text-sm font-medium leading-snug text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

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
              {person.media.map((m) => {
                const isVideo = Boolean(
                  m.url && /youtube\.com|youtu\.be/.test(m.url),
                );
                return (
                  <li key={m.title} className="h-full">
                    <a
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-colors hover:border-accent-deep"
                    >
                      <span className="relative block aspect-[16/10] w-full overflow-hidden bg-slate-100">
                        {m.image ? (
                          <Image
                            src={m.image}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                          />
                        ) : null}
                      </span>
                      <span className="flex flex-1 flex-col p-5">
                        <span className="text-sm font-semibold leading-snug text-ink group-hover:text-accent-deep">
                          {m.title}
                        </span>
                        {m.source ? (
                          <span className="mt-1.5 text-xs text-foreground/70">
                            {m.source}
                          </span>
                        ) : null}
                        <span className="mt-auto flex items-center gap-1.5 pt-4 text-xs font-semibold uppercase tracking-[0.15em] text-accent-deep">
                          {isVideo ? "Watch video" : "Read article"}
                          <span className="transition-transform group-hover:translate-x-1">
                            {iconMap.arrow}
                          </span>
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      )}

      {/* Photo gallery — 10+ placeholders */}
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
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {person.gallery.map((img, i) => (
              <figure
                key={img.imagePath}
                className={i === 0 ? "flex flex-col row-span-2" : ""}
              >
                <ImageHolder
                  imagePath={img.imagePath}
                  label={img.description ?? `${person.name} — gallery item ${i + 1}`}
                  fill={i === 0}
                />
                {img.description ? (
                  <figcaption className="mt-2 shrink-0 text-xs text-foreground/70">
                    {img.description}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title={`Work with ${person.name}`} />
    </>
  );
}
