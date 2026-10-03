import type { CSSProperties } from "react";
import Image from "next/image";
import { site } from "@/data/site";
import {
  Users,
  Tag,
  Building2,
  Landmark,
  Handshake,
  TrendingUp,
  Truck,
  ShieldCheck,
  Banknote,
  Search,
  HeartHandshake,
  GraduationCap,
  Newspaper,
  UsersRound,
} from "lucide-react";

type RingEntry = {
  title: string;
  icon: React.ElementType;
  angle: number;
  /** Gradient painted behind the icon chip. */
  gradient: string;
};

// Maths convention with y pointing down: 0° = right, 90° = bottom,
// 180° = left, 270° = top.
const baseStakeholders: RingEntry[] = [
  { title: "Brands", icon: Tag, angle: 270, gradient: "linear-gradient(135deg, #f97316, #ef4444)" },
  { title: "Government & Policy Makers", icon: Landmark, angle: 0, gradient: "linear-gradient(135deg, #3b82f6, #2563eb)" },
  { title: "Industry & Manufacturer", icon: Building2, angle: 90, gradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)" },
  { title: "Workers", icon: Users, angle: 180, gradient: "linear-gradient(135deg, #10b981, #047857)" },
];

// Offset from the inner ring's cardinals so no two rings stack cards radially.
const valueChainPartners: RingEntry[] = [
  { title: "Traders", icon: TrendingUp, angle: 297, gradient: "linear-gradient(135deg, #f59e0b, #d97706)" },
  { title: "Logistics", icon: Truck, angle: 9, gradient: "linear-gradient(135deg, #06b6d4, #0e7490)" },
  { title: "Compliance Body", icon: ShieldCheck, angle: 81, gradient: "linear-gradient(135deg, #ec4899, #be185d)" },
  { title: "Financial Organizations", icon: Banknote, angle: 153, gradient: "linear-gradient(135deg, #14b8a6, #0f766e)" },
  { title: "Development Partners", icon: Handshake, angle: 225, gradient: "linear-gradient(135deg, #6366f1, #4338ca)" },
];

const widerEcosystem: RingEntry[] = [
  { title: "Press & Media", icon: Newspaper, angle: 270, gradient: "linear-gradient(135deg, #ef4444, #b91c1c)" },
  { title: "Educational Institute", icon: GraduationCap, angle: 342, gradient: "linear-gradient(135deg, #a855f7, #d946ef)" },
  { title: "Chamber", icon: UsersRound, angle: 54, gradient: "linear-gradient(135deg, #0ea5e9, #0369a1)" },
  { title: "NGO", icon: HeartHandshake, angle: 126, gradient: "linear-gradient(135deg, #84cc16, #4d7c0f)" },
  { title: "Research Organization", icon: Search, angle: 198, gradient: "linear-gradient(135deg, #c026d3, #7e22ce)" },
];

type RingConfig = {
  items: RingEntry[];
  radius: number;
  zIndex: number;
};

// Listed outer-to-inner so smaller rings paint over larger ones.
const rings: RingConfig[] = [
  { items: widerEcosystem, radius: 41, zIndex: 1 },
  { items: valueChainPartners, radius: 30, zIndex: 2 },
  { items: baseStakeholders, radius: 18, zIndex: 3 },
];

// Colourful accent dots scattered along the rings — {radius, angle, r (units)}.
const accentDots = [
  { radius: 41, angle: 22, r: 5, color: "#ef4444" },
  { radius: 41, angle: 100, r: 4, color: "#f59e0b" },
  { radius: 41, angle: 222, r: 6, color: "#10b981" },
  { radius: 41, angle: 305, r: 4, color: "#3b82f6" },
  { radius: 30, angle: 50, r: 5, color: "#a855f7" },
  { radius: 30, angle: 178, r: 3.5, color: "#ec4899" },
  { radius: 30, angle: 262, r: 5.5, color: "#06b6d4" },
  { radius: 30, angle: 340, r: 3, color: "#22c55e" },
  { radius: 18, angle: 45, r: 4, color: "#f97316" },
  { radius: 18, angle: 135, r: 3.5, color: "#8b5cf6" },
  { radius: 18, angle: 215, r: 4.5, color: "#14b8a6" },
  { radius: 18, angle: 325, r: 3, color: "#e11d48" },
];

// The wheel is 16:10, so one 1600×1000 SVG overlays it with a single uniform
// scale — every ring keeps the same stroke weight and dot spacing.
const CX = 800;
const CY = 500;
const toUnitsX = (radius: number) => radius * 16;
const toUnitsY = (radius: number) => radius * 10;

function RingLines() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1600 1000"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ zIndex: 1 }}
    >
      {rings.map((ring) => (
        <g key={`ring-${ring.radius}`}>
          {/* Faint continuous guide */}
          <ellipse
            cx={CX}
            cy={CY}
            rx={toUnitsX(ring.radius)}
            ry={toUnitsY(ring.radius)}
            fill="none"
            stroke="#10202f"
            strokeOpacity="0.14"
            strokeWidth="2"
          />
          {/* Spaced dots along the path */}
          <ellipse
            cx={CX}
            cy={CY}
            rx={toUnitsX(ring.radius)}
            ry={toUnitsY(ring.radius)}
            fill="none"
            stroke="#10202f"
            strokeOpacity="0.45"
            strokeWidth="3"
            strokeDasharray="0.5 16"
            strokeLinecap="round"
          />
        </g>
      ))}

      {accentDots.map((dot, index) => (
        <circle
          key={`accent-${index}`}
          cx={CX + toUnitsX(dot.radius) * Math.cos((dot.angle * Math.PI) / 180)}
          cy={CY + toUnitsY(dot.radius) * Math.sin((dot.angle * Math.PI) / 180)}
          r={dot.r}
          fill={dot.color}
        />
      ))}
    </svg>
  );
}

function RingCard({ item, ring }: { item: RingEntry; ring: RingConfig }) {
  const Icon = item.icon;
  return (
    <div
      className="orbit-card -translate-x-1/2 -translate-y-1/2"
      style={
        {
          "--r": `${ring.radius}%`,
          "--start": `${item.angle}deg`,
          zIndex: ring.zIndex + 3,
        } as CSSProperties
      }
    >
      <div className="flex h-15 w-32 items-center gap-2 rounded-2xl bg-white px-2.5 text-left shadow-[0_8px_22px_rgba(16,32,47,0.16)] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1">
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-white"
          style={{ backgroundImage: item.gradient }}
        >
          <Icon aria-hidden="true" size={16} strokeWidth={2} />
        </span>
        <span className="text-[11px] font-medium leading-tight text-ink">
          {item.title}
        </span>
      </div>
    </div>
  );
}

export default function StakeholderWheel() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-14 md:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(16,32,47,0.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="bg-blob -left-16 -top-12 size-72 bg-accent/40" />
        <div className="bg-blob -right-20 top-1/3 size-80 bg-accent-bright/40" />
        <div className="bg-blob -bottom-20 left-1/3 size-72 bg-gold/30" />
      </div>

      <div className="relative mx-auto w-full max-w-320 px-4">
        <p className="mb-4 flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep">
          <span aria-hidden="true" className="h-px w-9 bg-accent-deep" />
          Stakeholders
          <span aria-hidden="true" className="h-px w-9 bg-accent-deep" />
        </p>

        <h2 className="mx-auto mb-10 max-w-4xl text-balance text-center text-2xl font-semibold leading-snug tracking-tight text-ink sm:mb-14 sm:text-4xl">
          Connecting the value chain, from fibre to fashion, to create impact
          that changes lives
        </h2>

        <div className="overflow-x-auto">
          <div className="relative mx-auto aspect-[16/10] w-full min-w-190 max-w-300">
            <RingLines />

            {rings.map((ring) =>
              ring.items.map((item) => (
                <RingCard key={item.title} item={item} ring={ring} />
              )),
            )}

            <div className="absolute left-1/2 top-1/2 z-40 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_12px_32px_rgba(16,32,47,0.2)] ring-1 ring-line sm:size-28">
              <Image
                src="/images/logo.svg"
                alt={site.name}
                width={661}
                height={429}
                className="h-10 w-auto sm:h-12"
              />
            </div>
          </div>
        </div>

        <Image
          src="https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/MacBook%20Air%20-%204.svg"
          alt="The value chain, from fibre to fashion — cotton, thread, fabric, sewing and the finished garment"
          width={1491}
          height={249}
          className="mx-auto mt-8 w-full max-w-4xl md:mt-12"
        />
      </div>
    </section>
  );
}
