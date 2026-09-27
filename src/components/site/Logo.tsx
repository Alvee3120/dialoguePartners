import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

type LogoProps = {
  /** Use on dark surfaces so the mark and wordmark render in white. */
  inverted?: boolean;
};

export default function Logo({ inverted = false }: LogoProps) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label={`${site.name} — home`}
    >
      <Image
        src="/images/logo.svg"
        alt=""
        width={661}
        height={429}
        loading="eager"
        className={`h-9 w-auto ${inverted ? "brightness-0 invert" : ""}`}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`whitespace-nowrap text-[15px] font-bold uppercase leading-[1.15] tracking-[0.12em] ${
            inverted ? "text-white" : "text-navy"
          }`}
        >
          {site.name}
        </span>
        <span
          aria-hidden="true"
          className={`mt-1 flex w-full justify-between text-[8px] font-semibold uppercase ${
            inverted ? "text-white" : "text-accent-deep"
          }`}
        >
          {Array.from(site.tagline).map((char, index) => (
            <span key={index}>{char === " " ? " " : char}</span>
          ))}
        </span>
        <span className="sr-only">{site.tagline}</span>
      </span>
    </Link>
  );
}
