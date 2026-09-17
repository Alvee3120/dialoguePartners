import type { ReactNode } from "react";

type Node = {
  label: string;
  detail: string;
  icon: "globe" | "factory" | "cpu" | "landmark";
  cell: string;
};

const nodes: Node[] = [
  {
    label: "Global Brands",
    detail: "Sourcing partners",
    icon: "globe",
    cell: "col-start-2 row-start-1",
  },
  {
    label: "Local Manufacturers",
    detail: "The RMG sector",
    icon: "factory",
    cell: "col-start-1 row-start-2",
  },
  {
    label: "Technology Providers",
    detail: "Digital enablement",
    icon: "cpu",
    cell: "col-start-3 row-start-2",
  },
  {
    label: "Policymakers",
    detail: "Regulation & trade",
    icon: "landmark",
    cell: "col-start-2 row-start-3",
  },
];

const iconMap: Record<Node["icon"], ReactNode> = {
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
    </>
  ),
  factory: (
    <>
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M17 18h1" />
      <path d="M12 18h1" />
      <path d="M7 18h1" />
    </>
  ),
  cpu: (
    <>
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </>
  ),
  landmark: (
    <>
      <path d="M10 18v-7" />
      <path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z" />
      <path d="M14 18v-7" />
      <path d="M18 18v-7" />
      <path d="M3 22h18" />
      <path d="M6 18v-7" />
    </>
  ),
};

function NodeIcon({ name }: { name: Node["icon"] }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4 sm:size-5"
    >
      {iconMap[name]}
    </svg>
  );
}

function StakeholderCard({
  node,
  className = "",
}: {
  node: Node;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center rounded-2xl border border-line bg-white px-3 py-4 text-center shadow-sm ${className}`}
    >
      <span className="inline-flex size-9 items-center justify-center rounded-full bg-accent-soft text-accent-deep sm:size-10">
        <NodeIcon name={node.icon} />
      </span>
      <p className="mt-2 text-sm font-semibold leading-tight text-ink">
        {node.label}
      </p>
      <p className="mt-1 text-xs text-foreground">{node.detail}</p>
    </div>
  );
}

function CentreNode({ className = "" }: { className?: string }) {
  return (
    <div
      className={`z-10 flex flex-col items-center justify-center rounded-full bg-navy p-3 text-center text-white ${className}`}
    >
      <p className="text-[11px] font-semibold leading-tight sm:text-sm">
        Dialogue Partners
      </p>
      <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-accent-soft sm:text-[10px] sm:tracking-[0.2em]">
        Ecosystem Catalyst
      </p>
    </div>
  );
}

export default function EcosystemMap() {
  return (
    <>
      {/* Stacked layout for narrow screens */}
      <div className="flex flex-col items-center sm:hidden">
        <CentreNode className="size-28" />
        <span aria-hidden="true" className="h-8 w-px bg-line" />
        <div className="grid w-full grid-cols-2 gap-3">
          {nodes.map((node) => (
            <StakeholderCard key={node.label} node={node} />
          ))}
        </div>
      </div>

      {/* Radial layout for wider screens */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-2xl grid-cols-3 grid-rows-3 items-center justify-items-center gap-4 sm:grid">
        {/* Connectors — each runs from a node centre to the middle of the grid */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[16.667%] h-[33.333%] w-px -translate-x-1/2 bg-line"
        />
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[33.333%] w-px -translate-x-1/2 bg-line"
        />
        <span
          aria-hidden="true"
          className="absolute left-[16.667%] top-1/2 h-px w-[33.333%] -translate-y-1/2 bg-line"
        />
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-px w-[33.333%] -translate-y-1/2 bg-line"
        />

        {/* Dashed orbit behind the centre node */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 size-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/40"
        />

        {nodes.map((node) => (
          <StakeholderCard
            key={node.label}
            node={node}
            className={`${node.cell} w-full max-w-[13rem]`}
          />
        ))}

        <CentreNode className="col-start-2 row-start-2 size-32" />
      </div>
    </>
  );
}
