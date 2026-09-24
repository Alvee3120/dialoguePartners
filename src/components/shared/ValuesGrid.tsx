import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "@/components/site/Reveal";
import { asset } from "@/lib/assets";

export type Value = {
  name: string;
  /** Short description shown on the home value cards. */
  summary: string;
  /** Longer description used on the About and Values pages. */
  expanded: string;
  icon: "eye" | "bulb" | "route" | "activity";
  /** Remote image URL used by the Values page grid. */
  image: string;
  /** Remote image URL used by the home "Our Values" cards. */
  homeImage: string;
};

const values: Value[] = [
  {
    name: "Transparency",
    summary: "We believe trust is built through openness, not polish.",
    expanded:
      "We believe trust is built through openness, not polish. We share data honestly, communicate risk clearly, and hold ourselves to the same standards of accountability we ask of our clients.",
    icon: "eye",
    image:
      asset("tran-values.png"),
    homeImage:
      asset("trans.png"),
  },
  {
    name: "Innovation",
    summary:
      "The RMG sector's next chapter will be won by those willing to rethink old models",
    expanded:
      "The RMG sector's next chapter will be won by those willing to rethink old models. We bring fresh, technology-enabled, forward-looking approaches to challenges the industry has historically treated as fixed costs of doing business.",
    icon: "bulb",
    image:
      asset("innovation-values%20(1).png"),
    homeImage:
      asset("innov.png"),
  },
  {
    name: "Simplicity",
    summary:
      "Regulatory frameworks, ESG reporting standards, and digital transformation roadmaps can be overwhelming.",
    expanded:
      "Regulatory frameworks, ESG reporting standards, and digital transformation roadmaps can be overwhelming. We specialize in cutting through that complexity and giving our partners a clear, sequenced path forward.",
    icon: "route",
    image:
      asset("simplicity-values.png"),
    homeImage:
      asset("simplicity.png"),
  },
  {
    name: "Vitality",
    summary:
      "Bangladesh's RMG sector employs millions and anchors the national economy.",
    expanded:
      "Bangladesh's RMG sector employs millions and anchors the national economy. The pace of change happening around it — climate policy, trade shifts, automation — is not slowing down. We match that pace with energy, responsiveness, and a bias toward action.",
    icon: "activity",
    image:
      asset("vitality-values.png"),
    homeImage:
      asset("viltality.png"),
  },
];
  
const iconMap: Record<Value["icon"], ReactNode> = {
  eye: (
    <>
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  bulb: (
    <>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.2 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </>
  ),
  activity: (
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  ),
};

export function ValueIcon({ name }: { name: Value["icon"] }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-6"
    >
      {iconMap[name]}
    </svg>
  );
}

export default function ValuesGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {values.map((value, i) => (
        <Reveal key={value.name} delay={i * 90} className="h-full">
          <article className="group relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-xl border border-accent/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-navy/20 motion-reduce:hover:translate-y-0 sm:min-h-[20rem] sm:p-8">
            <Image
              src={value.image}
              alt=""
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="relative">
              <h2 className="text-[26px] font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                {value.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
                {value.expanded}
              </p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export { values };