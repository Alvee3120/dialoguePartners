import type { ReactNode } from "react";

export type Value = {
  name: string;
  expanded: string;
  icon: "eye" | "bulb" | "route" | "activity";
  /** Remote image URL for the value card. */
  image: string;
};

const VALUE_IMAGE =
  "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/Gemini_Generated_Image_r4qn42r4qn42r4qn.jpeg";

const values: Value[] = [
  {
    name: "Transparency",
    expanded:
      "We believe trust is built through openness, not polish. We share data honestly, communicate risk clearly, and hold ourselves to the same standards of accountability we ask of our clients.",
    icon: "eye",
    image: VALUE_IMAGE,
  },
  {
    name: "Innovation",
    expanded:
      "The RMG sector's next chapter will be won by those willing to rethink old models. We bring fresh, technology-enabled, forward-looking approaches to challenges the industry has historically treated as fixed costs of doing business.",
    icon: "bulb",
    image: VALUE_IMAGE,
  },
  {
    name: "Simplicity",
    expanded:
      "Regulatory frameworks, ESG reporting standards, and digital transformation roadmaps can be overwhelming. We specialize in cutting through that complexity and giving our partners a clear, sequenced path forward.",
    icon: "route",
    image: VALUE_IMAGE,
  },
  {
    name: "Vitality",
    expanded:
      "Bangladesh's RMG sector employs millions and anchors the national economy. The pace of change happening around it — climate policy, trade shifts, automation — is not slowing down. We match that pace with energy, responsiveness, and a bias toward action.",
    icon: "activity",
    image: VALUE_IMAGE,
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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {values.map((value) => (
        <div
          key={value.name}
          className="group rounded-xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg motion-reduce:hover:translate-y-0"
        >
          <span className="inline-flex size-12 items-center justify-center rounded-xl bg-accent-soft text-accent-deep transition-transform duration-300 group-hover:scale-110">
            <ValueIcon name={value.icon} />
          </span>
          <h3 className="mt-4 text-[18px] font-semibold text-ink">{value.name}</h3>
        </div>
      ))}
    </div>
  );
}

export { values };