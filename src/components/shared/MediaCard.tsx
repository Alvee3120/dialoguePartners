"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { PersonMedia } from "@/data/people";

const VIDEO_URL_PATTERN = /youtube\.com|youtu\.be/;

function Chevron({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-3.5"
    >
      <path d={path} />
    </svg>
  );
}

export default function MediaCard({ item }: { item: PersonMedia }) {
  const images = item.images ?? [];
  const [index, setIndex] = useState(0);
  const hasCarousel = images.length > 1;
  const isVideo = Boolean(item.url && VIDEO_URL_PATTERN.test(item.url));

  const step = (delta: number) =>
    setIndex((current) => (current + delta + images.length) % images.length);

  // Re-armed on every index change, so a manual click gets a full interval
  // instead of being cut short by a fixed cadence.
  useEffect(() => {
    if (!hasCarousel) return;
    const timer = setTimeout(() => {
      setIndex((current) => (current + 1) % images.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [index, hasCarousel, images.length]);

  return (
    <li className="group relative h-full">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-colors group-hover:border-accent-deep">
        <span className="relative block aspect-[16/10] w-full overflow-hidden bg-slate-100">
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className={`object-cover transition-opacity duration-300 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {hasCarousel ? (
            <span className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-2 opacity-0 transition-opacity duration-200 focus-within:opacity-100 group-hover:opacity-100 pointer-coarse:opacity-100">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="pointer-events-auto flex size-7 items-center justify-center rounded-full bg-white/85 text-ink shadow-sm backdrop-blur transition-colors hover:bg-white"
              >
                <Chevron path="m15 18-6-6 6-6" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="pointer-events-auto flex size-7 items-center justify-center rounded-full bg-white/85 text-ink shadow-sm backdrop-blur transition-colors hover:bg-white"
              >
                <Chevron path="m9 18 6-6-6-6" />
              </button>
            </span>
          ) : null}
        </span>

        <span className="flex flex-1 flex-col p-5">
          <span className="text-sm font-semibold leading-snug text-ink group-hover:text-accent-deep">
            {item.title}
          </span>
          {item.source ? (
            <span className="mt-1.5 text-xs text-foreground/70">
              {item.source}
            </span>
          ) : null}
          <span className="mt-auto flex items-center gap-1.5 pt-4 text-xs font-semibold uppercase tracking-[0.15em] text-accent-deep">
            {isVideo ? "Watch video" : "Read article"}
            <span className="transition-transform group-hover:translate-x-1">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="size-4"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </span>
        </span>

        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.title}
          className="absolute inset-0"
        />
      </div>
    </li>
  );
}
