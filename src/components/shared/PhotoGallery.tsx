"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { VIDEO_PATTERN } from "@/data/people";
import type { GalleryItem } from "@/data/people";

const CHEVRON_PREV = "m15 18-6-6 6-6";
const CHEVRON_NEXT = "m9 18 6-6-6-6";

const chevronButton =
  "pointer-events-auto flex size-7 items-center justify-center rounded-full bg-white/85 text-ink shadow-sm backdrop-blur transition-colors hover:bg-white";

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

function GalleryTile({
  entry,
  index,
  name,
  onOpen,
}: {
  entry: GalleryItem;
  index: number;
  name: string;
  onOpen: (src: string) => void;
}) {
  const images = entry.images;
  const [imageIndex, setImageIndex] = useState(0);
  const hasCarousel = images.length > 1;
  const label = entry.description ?? `${name} — gallery item ${index + 1}`;

  useEffect(() => {
    if (!hasCarousel) return;
    const timer = setTimeout(() => {
      setImageIndex((current) => (current + 1) % images.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [imageIndex, hasCarousel, images.length]);

  const step = (delta: number) =>
    setImageIndex((current) => (current + delta + images.length) % images.length);

  return (
    <figure className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white p-3 transition-colors hover:border-accent-deep">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
        {images.map((path, i) => {
          const remote = path.startsWith("http");
          const isVideo = VIDEO_PATTERN.test(path);
          return (
            <span
              key={path}
              className={`absolute inset-0 transition-opacity duration-300 ${
                i === imageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              {isVideo && remote ? (
                <video
                  src={path}
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="metadata"
                  aria-label={label}
                  className="size-full object-cover"
                />
              ) : remote ? (
                <Image
                  src={path}
                  alt={label}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div
                  role="img"
                  aria-label={`Image placeholder: ${label}`}
                  className="flex size-full items-center justify-center border-2 border-dashed border-line p-6 text-center text-slate-400"
                >
                  <div className="max-w-xs">
                    <span className="mx-auto flex size-10 items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="size-6"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                    </span>
                    <p className="mt-2 text-sm font-medium">{label}</p>
                    <p className="mt-1 font-mono text-[11px] text-slate-400">
                      {path}
                    </p>
                  </div>
                </div>
              )}
            </span>
          );
        })}

        {/* Stretched control so the tile opens the lightbox — kept out of the
            carousel buttons' way with z-index rather than nesting them. */}
        <button
          type="button"
          onClick={() => onOpen(images[imageIndex])}
          aria-label={`View: ${label}`}
          className="absolute inset-0 z-0 cursor-zoom-in"
        />

        {hasCarousel ? (
          <span className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-2 opacity-0 transition-opacity duration-200 focus-within:opacity-100 group-hover:opacity-100 pointer-coarse:opacity-100">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className={chevronButton}
            >
              <Chevron path={CHEVRON_PREV} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className={chevronButton}
            >
              <Chevron path={CHEVRON_NEXT} />
            </button>
          </span>
        ) : null}
      </div>

      {entry.description ? (
        <figcaption className="min-h-10 shrink-0 whitespace-pre-line px-1 pb-1 pt-4 text-sm font-medium leading-snug text-ink">
          {entry.description}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default function PhotoGallery({
  entries,
  name,
}: {
  entries: GalleryItem[];
  name: string;
}) {
  const [active, setActive] = useState<{ src: string; caption?: string } | null>(
    null,
  );

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  const activeIsVideo = active ? VIDEO_PATTERN.test(active.src) : false;

  return (
    <>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {entries.map((entry, i) => (
          <GalleryTile
            key={entry.images[0] ?? i}
            entry={entry}
            index={i}
            name={name}
            onOpen={(src) =>
              setActive({ src, caption: entry.description })
            }
          />
        ))}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption ?? `${name} photo`}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-deep/90 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close"
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              className="size-5"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <div
            onClick={(event) => event.stopPropagation()}
            className="flex max-h-[90vh] w-full max-w-5xl flex-col items-center"
          >
            <div className="relative h-[75vh] w-full">
              {activeIsVideo ? (
                <video
                  src={active.src}
                  controls
                  playsInline
                  className="size-full object-contain"
                />
              ) : (
                <Image
                  src={active.src}
                  alt={active.caption ?? `${name} photo`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              )}
            </div>
            {active.caption ? (
              <p className="mt-3 text-center text-sm text-white/80">
                {active.caption}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
