// The five Core Pillars — Dialogue Partners' core advisory offering.
//
// Copy sourced from the Company Content Brief v2. Text marked DRAFT was not
// supplied by the brief and is placeholder wording pending client confirmation.

export type ServiceItem = {
  name: string;
  description: string;
};

export type ServiceGroup = {
  title: string;
  /** Optional framing paragraph rendered under the group heading. */
  intro?: string;
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
  icon: "Leaf" | "Circuitry" | "HandHeart" | "Gauge" | "Scales";
  /** Remote image URL used on the home pillar cards. */
  image: string;
};

export const corePillars: CorePillar[] = [
  {
    number: "01",
    slug: "climate-resilience-decarbonization",
    title: "Climate Resilience & Decarbonization",
    shortTitle: "Climate & Decarbonization",
    // DRAFT: tagline and summary carried over from the previous brief.
    tagline: "From linear waste to circular value.",
    summary:
      "Science-based targets, end-to-end ESG reporting, and circularity strategy — built into how factories actually operate.",
    intro:
      "Every sustainability journey needs a starting point grounded in reality, not only aspiration. We work with manufacturers to build the strategy where sustainability is embedded as a business offer. We help partners bridge the critical gap between ambitious sustainability commitments and execution on the factory floor. By aligning corporate vision with actionable science and human-centric operational strategies, we help businesses build credible, future-ready operations that satisfy evolving global standards while driving long-term efficiency.",
    icon: "Leaf",
    image:
      "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/climet.jpg",
    groups: [
      {
        title: "Building Strategy",
        items: [
          {
            name: "Science Based Targets Initiative (SBTi)",
            description:
              "Grounding your decarbonization journey in rigorous, climate-aligned target setting.",
          },
          {
            name: "Road Map & Capacity Building",
            description:
              "Crafting realistic, step-by-step operational roadmaps to achieve transparent goals.",
          },
          {
            name: "Workforce Upskilling",
            description:
              "Empowering human capital through targeted skill development to sustain long-term growth.",
          },
        ],
      },
      {
        title: "End to End",
        intro:
          "We provide a complete, end-to-end framework to guide your business through every stage of sustainable transformation. Navigating global regulations and customer demands requires more than fragmented advice—it demands a cohesive strategy executed directly on the factory. We work side by side with your leadership team to design tailored strategies, assess operational gaps, build organizational capacity, and deliver credible reporting that earns global stakeholder trust. From initial diagnosis to final disclosure, we ensure your sustainability journey is seamless, compliant, and value-driven.",
        items: [
          {
            name: "Auditing",
            description:
              "We start with a simple auditing system and ensure the factory goes through the learning curve of self-auditing.",
          },
          {
            name: "Design & Building Capacity",
            description:
              "Developing actionable roadmaps and technical capacity-building initiatives so teams have the knowledge and tools to implement sustainable practices efficiently.",
          },
          {
            name: "ESG Reporting",
            description:
              "Translating complex data into verified, transparent, standardized ESG reports aligned with international frameworks to build credibility.",
          },
        ],
      },
      {
        title: "Decarbonization — Impact Areas",
        items: [
          // DRAFT: one-line descriptions pending client wording.
          {
            name: "Transition to Renewable Energy",
            description: "Shifting production to renewable energy sources.",
          },
          {
            name: "Energy Efficiency",
            description: "Reducing energy intensity across the factory floor.",
          },
          {
            name: "Water Uses & ETP",
            description:
              "Responsible water use and Effluent Treatment Plant performance.",
          },
          {
            name: "Chemical Impact",
            description:
              "Safer chemical management aligned with international standards.",
          },
        ],
      },
      {
        title: "Circular Economy",
        intro:
          "Transitioning from a linear production model to a circular manufacturing framework is essential for long-term viability in the apparel industry. Emerging eco-design directives and global circularity demands require manufacturers to rethink production streams, transforming operational waste into valuable resources.",
        items: [
          {
            name: "Waste – Resource Optimization",
            // DRAFT: one-line description pending client wording.
            description: "Turning operational waste into valuable resources.",
          },
          {
            name: "Close the Loop",
            // DRAFT: one-line description pending client wording.
            description: "Take-back and recycling models built into production.",
          },
          {
            name: "Traceability → Digital Product Passport (DPP)",
            description:
              "The European Union is making data transparency mandatory. Our digital tool helps manufacturers create credible and transparent data management systems.",
          },
        ],
      },
    ],
  },
  {
    number: "02",
    slug: "technology-solutions",
    title: "Technology Solution & Innovation",
    shortTitle: "Technology Solution",
    // DRAFT: tagline carried over from the previous brief.
    tagline: "Clean tech, tailored for industrial scale.",
    summary:
      "Connecting manufacturers with cutting-edge clean tech solutions — evaluated, implemented, and optimized across critical resource areas.",
    intro:
      "Achieving meaningful sustainability requires integrating modern, clean technologies directly into manufacturing operations. Adopting advanced technological solutions allows apparel producers to reduce environmental impact while enhancing factory productivity and cost-efficiency. At Dialogue Partners, we connect manufacturers with cutting-edge clean tech solutions tailored for industrial scale. We evaluate, implement, and optimize technology deployments across critical resource areas, ensuring your facilities achieve measurable operational gains and meet global environmental standards.",
    icon: "Circuitry",
    image:
      "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/techandinnova.jpg",
    groups: [
      {
        title: "Where We Deploy",
        items: [
          {
            name: "Tech & Digital Maturity",
            description:
              "Digital maturity is the new competitive edge. We help manufacturers turn technology into operational excellence — and turn EU due diligence and traceability requirements into a trust advantage, not a compliance burden.",
          },
          {
            name: "Solar & Battery Solutions",
            description:
              "Deploying solar PV systems paired with battery energy storage (BESS) to secure reliable, low-carbon power.",
          },
          {
            name: "Energy Efficiency",
            description:
              "Creating a roadmap for energy efficiency across every process of manufacturing.",
          },
          {
            name: "ETP Innovation",
            description:
              "Advanced Effluent Treatment Plant (ETP) technologies and zero liquid discharge (ZLD) systems to maximize water recovery, enable water recycling, and ensure safe discharge.",
          },
          {
            name: "Dyeing Technologies",
            description:
              "Low-liquor-ratio, waterless, and low-temperature dyeing innovations to reduce chemical usage, water consumption, and thermal energy load.",
          },
          {
            name: "Resource Optimization",
            description:
              "Smart monitoring, digital tracking, and automated process controls to eliminate material waste and maximize raw material yield.",
          },
          {
            name: "Eco Designing",
            description:
              "Design-for-circularity frameworks and sustainable material selection from concept to production, enabling easier recycling and extended product lifecycles.",
          },
        ],
      },
    ],
  },
  {
    number: "03",
    slug: "social",
    title: "Social",
    shortTitle: "Social",
    // DRAFT: tagline, summary and intro not supplied by the brief.
    tagline: "Decent work, rights, and responsible conduct.",
    summary:
      "Turning decent work, workplace rights, and responsible business conduct into practices that are credible on the factory floor and audit-ready for global buyers.",
    intro:
      "We help manufacturers turn responsible business conduct and due diligence into a credible, audit-ready practice — so regulation becomes proof of readiness, not a liability.",
    icon: "HandHeart",
    image:
      "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/social.jpg",
    groups: [
      {
        title: "Our Areas of Work",
        items: [
          {
            name: "Decent Work",
            // DRAFT: description pending client wording.
            description:
              "Strengthening day-to-day working conditions so factories remain attractive, productive, and aligned with global expectations.",
          },
          {
            name: "Responsible Business Conduct & Due Diligence",
            description:
              "Integrating ethical labor practices, human rights due diligence, and transparent governance frameworks to ensure full alignment with international brand expectations and regulatory mandates.",
          },
          {
            name: "Regulatory Compliance",
            description:
              "We turn shifting EU and global regulations into a clear compliance roadmap — so our clients are ready before the deadline arrives, not scrambling after it.",
          },
          {
            name: "Workplace & Rights",
            description:
              "Decent workplace and rights are fundamental human rights. We help manufacturers bridge the gaps.",
          },
        ],
      },
    ],
  },
  {
    number: "04",
    slug: "operational-excellence-digitalization",
    title: "Operational Excellence",
    shortTitle: "Operational Excellence",
    // DRAFT: tagline carried over from the previous brief.
    tagline: "Resilient operations, built for global compliance.",
    summary:
      "Streamlining production systems, driving product innovation, and implementing responsible operational practices across the shop floor.",
    intro:
      "Achieving long-term competitiveness in apparel manufacturing requires building resilient, high-efficiency operations that align with global compliance standards. Operational excellence is driven by continuous improvement across the shop floor, strategic market positioning, and ethical business management. At Dialogue Partners, we work directly with manufacturers to streamline production systems, drive product innovation, and implement responsible operational practices. By bridging performance gaps with advanced automation and sustainable management models, we help factories maximize output while maintaining high standards of integrity and buyer trust.",
    icon: "Gauge",
    image:
      "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/operational.jpg",
    groups: [
      {
        title: "Our Areas of Work",
        items: [
          {
            name: "Digitalization",
            // DRAFT: description pending client wording.
            description:
              "Embedding digital systems so production, quality, and compliance data flow into decisions rather than paperwork.",
          },
          {
            name: "Product Diversification",
            description:
              "RMG Product Diversification: expanding manufacturing capabilities into high-value, complex apparel segments and functional textiles to reduce market dependency on basic commodity garments.",
          },
          {
            name: "Manufacturing Excellence",
            description:
              "Optimizing line efficiency, implementing industrial automation and lean manufacturing principles to enhance total factor productivity on the factory floor.",
          },
          {
            name: "Production Efficiency",
            // DRAFT: description pending client wording.
            description:
              "Improving line balancing, throughput, and lead times across manufacturing.",
          },
          {
            name: "Automation",
            // DRAFT: description pending client wording.
            description:
              "Deploying industrial automation where it lifts output and consistency.",
          },
        ],
      },
    ],
  },
  {
    number: "05",
    slug: "trade-policy-advocacy",
    title: "Trade & Policy Advocacy",
    shortTitle: "Trade & Policy",
    // DRAFT: tagline carried over from the previous brief.
    tagline: "Building the ecosystem for what comes next.",
    summary:
      "Bridging national policy, global regulatory shifts, and ground-level manufacturing realities as Bangladesh navigates LDC graduation.",
    intro:
      "Navigating LDC graduation and a rapidly changing global market requires proactive policy alignment and resilient trade frameworks. Building a future-ready RMG ecosystem depends on bridging the gaps between national policy, global regulatory shifts, and ground-level manufacturing realities. We continuously connect regulatory bodies, international buyers, and strategic partners to shape forward-thinking policies that prepare the market for future trade dynamics.\n\nAt Dialogue Partners, we engage across the broader business ecosystem to drive strategic advocacy and policy formulation. We collaborate with international stakeholders, industry bodies, and financial partners to create sustainable trade pathways, secure competitive market access, and build financial structures that support long-term economic growth.",
    icon: "Scales",
    image: "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/trade.jpg",
    groups: [
      {
        title: "Our Areas of Work",
        items: [
          {
            name: "Trade Facilitation",
            description:
              "Streamlining cross-border supply chain procedures, optimizing customs operations, and reducing trade barriers to enhance overall export competitiveness.",
          },
          {
            name: "Free Trade Agreement: Post-LDC",
            description:
              "Guiding industry leaders through Bangladesh's LDC transition by developing strategic roadmaps for FTAs, preferential market access, and compliance with rules of origin.",
          },
          {
            name: "Trade Financing",
            description:
              "Designing innovative financial mechanisms and sustainability-linked financing solutions to fund green transitions and secure liquidity for market expansion.",
          },
          {
            name: "Green Financing",
            description:
              "We help manufacturers create bankable projects and connect with appropriate stakeholders.",
          },
        ],
      },
    ],
  },
];

export function getCorePillar(slug: string) {
  return corePillars.find((pillar) => pillar.slug === slug);
}
