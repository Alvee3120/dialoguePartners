import type { ReactNode } from "react";

export type Value = {
  name: string;
  description: string;
  expanded: string;
  icon: "eye" | "bulb" | "feather" | "bolt";
};

const values: Value[] = [
  {
    name: "Transparency",
    description:
      "We say what we mean, share what we know, and build trust through open dialogue at every stage of engagement.",
    expanded:
      "We believe trust is built through openness, not polish. We share data honestly, communicate risk clearly, and hold ourselves to the same standards of accountability we ask of our clients.",
    icon: "eye",
  },
  {
    name: "Innovation",
    description:
      "We challenge conventional thinking and bring forward-looking, technology-enabled solutions to an industry ready for its next leap.",
    expanded:
      "The RMG sector's next chapter will be won by those willing to rethink old models. We bring fresh, technology-enabled, forward-looking approaches to challenges the industry has historically treated as fixed costs of doing business.",
    icon: "bulb",
  },
  {
    name: "Simplicity",
    description:
      "We turn complex regulatory, technical, and operational challenges into clear, actionable paths forward.",
    expanded:
      "Regulatory frameworks, ESG reporting standards, and digital transformation roadmaps can be overwhelming. We specialize in cutting through that complexity and giving our partners a clear, sequenced path forward.",
    icon: "feather",
  },
  {
    name: "Vitality",
    description:
      "We bring energy, urgency, and momentum to an ecosystem that cannot afford to stand still.",
    expanded:
      "Bangladesh's RMG sector employs millions and anchors the national economy. The pace of change happening around it — climate policy, trade shifts, automation — is not slowing down. We match that pace with energy, responsiveness, and a bias toward action.",
    icon: "bolt",
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
  feather: (
    <>
      <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z" />
      <path d="M16 8 2 22" />
      <path d="M17.5 15H9" />
    </>
  ),
  bolt: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
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
        <div key={value.name} className="rounded-3xl border border-line bg-white p-7">
          <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-deep">
            <ValueIcon name={value.icon} />
          </span>
          <h3 className="mt-5 text-lg font-semibold text-ink">{value.name}</h3>
          <p className="mt-2 text-sm leading-relaxed">{value.description}</p>
        </div>
      ))}
    </div>
  );
}

export { values };