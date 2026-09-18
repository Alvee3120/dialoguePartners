// The four Core Pillars — Dialogue Partners' core advisory offering.

export type ServiceItem = {
  name: string;
  description: string;
};

export type ServiceGroup = {
  title: string;
  items: ServiceItem[];
};

export type CorePillar = {
  number: string;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  summary: string;
  intro: string;
  groups: ServiceGroup[];
  /** Phosphor icon name (PascalCase, matches @phosphor-icons/react export). */
  icon: "Leaf" | "Circuitry" | "Scales" | "Gauge";
};

export const corePillars: CorePillar[] = [
  {
    number: "01",
    slug: "climate-resilience-decarbonization",
    title: "Climate Resilience & Decarbonization",
    shortTitle: "Climate & Decarbonization",
    tagline: "From linear waste to circular value.",
    summary:
      "Science-based targets, end-to-end ESG reporting, and circularity strategy — built into how factories actually operate.",
    intro:
      "Transitioning from a linear production model to a circular manufacturing framework is essential for long-term viability in the apparel industry. Emerging eco-design directives and global circularity demands require manufacturers to rethink production streams, transforming operational waste into valuable resources.",
    icon: "Leaf",
    groups: [
      {
        title: "Building Strategy",
        items: [
          {
            name: "Science Based Targets Initiative (SBTi)",
            description:
              "Grounding decarbonization in rigorous, climate-aligned target setting.",
          },
          {
            name: "Roadmap & Capacity Building",
            description:
              "Realistic, step-by-step operational roadmaps toward transparent goals.",
          },
          {
            name: "Workforce Upskilling",
            description:
              "Targeted skill development to sustain long-term growth.",
          },
        ],
      },
      {
        title: "End-to-End Sustainability Solution",
        items: [
          {
            name: "Auditing",
            description:
              "A simple auditing system that guides factories through a self-auditing learning curve.",
          },
          {
            name: "Design & Building Capacity",
            description:
              "Actionable roadmaps and technical capacity-building so teams can implement sustainable practices.",
          },
          {
            name: "ESG Reporting",
            description:
              "Translating complex data into verified, transparent, standardized ESG reports aligned with international frameworks.",
          },
        ],
      },
      {
        title: "Decarbonization — Impact Areas",
        items: [
          { name: "Renewable Energy", description: "Transition to renewable energy sources across production." },
          { name: "Energy Efficiency", description: "Reducing energy intensity across the factory floor." },
          { name: "Water & ETP", description: "Water use and Effluent Treatment Plant performance." },
          { name: "Chemical Impact Management", description: "Safer chemical management aligned with international standards." },
        ],
      },
      {
        title: "Circularity Strategy",
        items: [
          { name: "Waste → Resource Optimization", description: "Turning operational waste into valuable resources." },
          { name: "“Close the Loop” Initiatives", description: "Take-back and recycling models built into production." },
          {
            name: "Digital Product Passport (DPP)",
            description:
              "Traceability that supports EU-mandated data transparency — helping manufacturers build credible, transparent data management systems.",
          },
          {
            name: "Green Finance",
            description:
              "Helping manufacturers qualify for and access green finance opportunities fairly.",
          },
        ],
      },
    ],
  },
  {
    number: "02",
    slug: "technology-solutions",
    title: "Technology Solutions",
    shortTitle: "Technology Solutions",
    tagline: "Clean tech, tailored for industrial scale.",
    summary:
      "Connecting manufacturers with cutting-edge clean-tech solutions — evaluated, implemented, and optimized across critical resource areas.",
    intro:
      "Achieving meaningful sustainability requires integrating modern, clean technologies directly into manufacturing operations. Adopting advanced technological solutions allows apparel producers to reduce environmental impact while enhancing factory productivity and cost-efficiency. We connect manufacturers with cutting-edge clean tech solutions tailored for industrial scale.",
    icon: "Circuitry",
    groups: [
      {
        title: "Where We Deploy",
        items: [
          {
            name: "Solar & Battery Solutions",
            description:
              "Solar PV and battery energy storage (BESS) for reliable, low-carbon power and reduced grid dependency.",
          },
          {
            name: "Energy Efficiency Systems",
            description:
              "Smart utility management, waste heat recovery, and high-efficiency machinery.",
          },
          {
            name: "ETP Innovation",
            description:
              "Advanced Effluent Treatment Plant technology and Zero Liquid Discharge (ZLD) systems for water recovery and safe discharge.",
          },
          {
            name: "Dyeing Technologies",
            description:
              "Low-liquor-ratio, waterless, and low-temperature dyeing to cut chemical use, water, and thermal energy load.",
          },
          {
            name: "Resource Optimization",
            description:
              "Smart monitoring, digital tracking, and automated process controls to eliminate waste and maximize raw material yield.",
          },
          {
            name: "Eco Designing",
            description:
              "Design-for-circularity frameworks and sustainable material selection from concept to production.",
          },
        ],
      },
    ],
  },
  {
    number: "03",
    slug: "trade-policy-advocacy",
    title: "Trade & Policy Advocacy",
    shortTitle: "Trade & Policy",
    tagline: "Building the ecosystem for what comes next.",
    summary:
      "Bridging national policy, global regulatory shifts, and ground-level manufacturing realities as Bangladesh navigates LDC graduation.",
    intro:
      "Navigating LDC graduation and a rapidly changing global market requires proactive policy alignment and resilient trade frameworks. Building a future-ready RMG ecosystem depends on bridging the gaps between national policy, global regulatory shifts, and ground-level manufacturing realities. We continuously connect regulatory bodies, international buyers, and strategic partners to shape forward-thinking policies that prepare the market for future trade dynamics.",
    icon: "Scales",
    groups: [
      {
        title: "Our Areas of Work",
        items: [
          {
            name: "Trade Facilitation",
            description:
              "Streamlining cross-border supply chain procedures, optimizing customs operations, and reducing trade barriers to boost export competitiveness.",
          },
          {
            name: "Free Trade Agreements / Post-LDC Graduation",
            description:
              "Guiding industry leaders through Bangladesh's LDC transition — strategic roadmaps for FTAs, preferential market access, and rules-of-origin compliance.",
          },
          {
            name: "Trade Financing",
            description:
              "Innovative financial mechanisms and sustainability-linked financing to fund green factory transitions and secure liquidity for expansion.",
          },
        ],
      },
    ],
  },
  {
    number: "04",
    slug: "operational-excellence-digitalization",
    title: "Operational Excellence & Digitalization",
    shortTitle: "Operational Excellence",
    tagline: "Resilient operations, built for global compliance.",
    summary:
      "Streamlining production systems, driving product innovation, and implementing responsible operational practices across the shop floor.",
    intro:
      "Achieving long-term competitiveness in apparel manufacturing requires building resilient, high-efficiency operations that align with global compliance standards. Operational excellence is driven by continuous improvement across the shop floor, strategic market positioning, and ethical business management. We work directly with manufacturers to streamline production systems, drive product innovation, and implement responsible operational practices.",
    icon: "Gauge",
    groups: [
      {
        title: "Our Areas of Work",
        items: [
          {
            name: "Product Diversification",
            description:
              "Expanding into high-value, complex apparel segments and functional textiles to reduce dependency on basic commodity garments.",
          },
          {
            name: "Responsible Business Conduct (RBC)",
            description:
              "Ethical labor practices, human rights due diligence, and transparent governance aligned with international brand expectations.",
          },
          {
            name: "Production Efficiency",
            description:
              "Optimizing line efficiency and cutting lead times across manufacturing.",
          },
          {
            name: "Automation",
            description:
              "Industrial automation and lean manufacturing principles to boost total factor productivity.",
          },
        ],
      },
    ],
  },
];

export function getCorePillar(slug: string) {
  return corePillars.find((pillar) => pillar.slug === slug);
}
