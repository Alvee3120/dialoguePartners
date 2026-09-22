import Image from "next/image";
import Reveal from "@/components/site/Reveal";
import { site } from "@/data/site";

/**
 * Brand motto banner — a wide photo card whose tint deepens from left to
 * right so the copy sits on solid navy. The closing word of the motto is
 * picked out in the bright accent.
 */
export default function MottoBanner({ className = "" }: { className?: string }) {
  const words = site.motto.split(" ");
  const lead = words.slice(0, -1).join(" ");
  const tail = words[words.length - 1];

  return (
    <Reveal
      className={`relative isolate overflow-hidden rounded-xl shadow-xl shadow-navy/15 ${className}`}
    >
      <Image
        src={site.mottoBackground}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-navy-deep/70"
      />

      <Image
        src="/images/logo.svg"
        alt=""
        aria-hidden="true"
        width={661}
        height={429}
        className="pointer-events-none absolute -right-8 top-1/2 h-auto w-64 -translate-y-1/2 opacity-10 brightness-0 invert sm:-right-12 sm:w-80"
      />

      <div className="relative flex justify-center px-6 py-16 sm:py-24">
        <div className="max-w-3xl text-center">
          <p className="text-2xl font-semibold leading-snug tracking-tight text-white sm:text-[32px]">
            &ldquo;{lead} <span className="text-accent-bright">{tail}</span>
            &rdquo;
          </p>

          <span
            aria-hidden="true"
            className="mx-auto mt-6 block h-px w-16 bg-accent-bright"
          />

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
            {site.mottoKicker}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
