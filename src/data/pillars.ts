// The four "Insight" pillars of Dialogue Partners.
// Home / /insights cards use `summary`/`tagline`; detail pages render the
// full `heroLine`, `intro`, and sectioned `areas`/`services`.

export type PillarArea = {
  title: string;
  items: { name: string; description: string }[];
};

export type PillarService = {
  name: string;
  description: string;
};

export type Pillar = {
  number: string;
  slug: string;
  /** Full pillar title. */
  title: string;
  /** Short form used in tight places (footer, cards). */
  shortTitle: string;
  /** One-line positioning statement shown on cards (home / /insights). */
  tagline: string;
  /** Bulkier summary used on the /insights index card. */
  summary: string;
  /** Bold hero line shown at the top of the detail page. */
  heroLine: string;
  /** Intro paragraph for the detail page. */
  intro: string;
  /** Numbered services with long descriptions (detail page). */
  services: PillarService[];
  /** Grouped areas of work with per-item descriptions (detail page). */
  areas: PillarArea[];
  /** Where the page photograph lives in /public (or remote URL). */
  imagePath: string;
  /** What that photograph should show. */
  imageDescription: string;
};

export const pillars: Pillar[] = [
  {
    number: "01",
    slug: "sustainability",
    title: "Sustainability (Digital Data Integration)",
    shortTitle: "Sustainability",
    tagline: "From compliance to competitive advantage.",
    summary:
      "Digital data integration, ESG readiness, and climate resilience built into how factories operate.",
    heroLine: "From compliance to competitive advantage.",
    intro:
      "Sustainability in the RMG sector has moved from a checkbox exercise to a core determinant of who wins business. Brands want verified, real-time data — not annual PDFs. We help manufacturers build the strategy, workforce capability, and digital infrastructure to meet that expectation and turn it into a genuine advantage.",
    services: [
      {
        name: "Building Strategy",
        description:
          "Every sustainability journey needs a starting point grounded in reality, not aspiration. We work with manufacturers to assess their current environmental and social performance, benchmark against buyer and regulatory expectations, and design a sustainability strategy that is ambitious but achievable — sequenced around available resources, technology, and workforce readiness.",
      },
      {
        name: "Roadmap & Capacity Building",
        description:
          "Strategy without execution is just a document. We translate high-level sustainability commitments into a phased operational roadmap — identifying the systems, training, and investment needed at each stage — and build internal capacity so factories can sustain progress long after our engagement ends.",
      },
      {
        name: "Workforce Upskilling",
        description:
          "Sustainable manufacturing depends on people who understand why it matters and how to deliver it. We design and deliver upskilling programs across management and shop-floor levels, covering everything from energy monitoring to social compliance protocols, so sustainability becomes embedded in daily practice, not a separate initiative.",
      },
      {
        name: "End-to-End ESG Reporting",
        description:
          "Buyers, investors, and regulators increasingly require standardized, verifiable ESG disclosures. We support manufacturers through the entire reporting lifecycle — data collection, framework alignment (GRI, SASB, and buyer-specific scorecards), verification readiness, and final reporting — so ESG performance can be communicated with confidence.",
      },
    ],
    areas: [
      {
        title: "Social Sustainability",
        items: [
          {
            name: "Workers' Rights Awareness",
            description:
              "We design awareness programs that help workers understand their rights and help management build fair, transparent workplace practices — reducing risk while strengthening workforce trust and retention.",
          },
          {
            name: "Industry Relationship & Grievance Mechanisms",
            description:
              "We help factories design and operate effective grievance mechanisms that give workers a genuine, safe channel to raise concerns — and help management resolve issues before they escalate into reputational or compliance risk.",
          },
        ],
      },
      {
        title: "Climate Resilience",
        items: [
          {
            name: "Science Based Targets Initiative (SBTi) Alignment",
            description:
              "We support manufacturers in setting emissions reduction targets aligned with the Science Based Targets Initiative, positioning them ahead of buyer requirements that are rapidly becoming industry standard.",
          },
          {
            name: "Decarbonization",
            description:
              "From energy audits to phased reduction plans, we help factories map their carbon footprint and build practical, cost-aware pathways to lower emissions across production.",
          },
          {
            name: "Renewable Energy",
            description:
              "We advise on the feasibility, financing, and implementation of renewable energy solutions — including rooftop solar and grid alternatives — tailored to individual factory contexts.",
          },
          {
            name: "Water Management",
            description:
              "We help manufacturers assess water usage and effluent treatment practices, and implement efficiency and recycling measures that reduce both environmental impact and operating cost.",
          },
          {
            name: "Chemical Management",
            description:
              "We support the adoption of safer chemical management practices aligned with international standards such as ZDHC, reducing risk to workers, communities, and downstream compliance.",
          },
        ],
      },
      {
        title: "Traceability & Circularity",
        items: [
          {
            name: "Digital Product Passport (DPP)",
            description:
              "With the EU and other markets moving toward mandatory product-level traceability, we help manufacturers prepare for Digital Product Passport requirements — mapping supply chain data, integrating tracking systems, and ensuring products can carry a verifiable, transparent history from fibre to finished garment.",
          },
          {
            name: "Circularity",
            description:
              "We advise on integrating circular economy principles into production — from material selection and waste reduction to take-back and recycling models — helping manufacturers align with the industry's shift away from linear take-make-dispose production.",
          },
        ],
      },
    ],
    imagePath: "/images/insights/solar-2.jpg",
    imageDescription:
      "Solar panels or a green, well-lit factory interior — sustainability in action",
  },
  {
    number: "02",
    slug: "investment-trade",
    title: "Investment & Trade Facilitation",
    shortTitle: "Investment & Trade",
    tagline: "Where capital meets confidence.",
    summary:
      "Helping global capital and trade policy align with local opportunity — from regulation to market entry.",
    heroLine: "Where capital meets confidence.",
    intro:
      "Bangladesh's RMG sector remains one of the most compelling manufacturing investment opportunities globally — but navigating its regulatory, trade, and market-entry landscape requires local insight that most outside investors don't have, and most local manufacturers don't have time to communicate. We sit in that gap, on both sides of the transaction.",
    services: [],
    areas: [
      {
        title: "Our Areas of Work",
        items: [
          {
            name: "Regulatory Navigation",
            description:
              "We help investors and manufacturers understand and move efficiently through Bangladesh's regulatory environment — from company registration and compliance requirements to sector-specific approvals — reducing delays that commonly stall market entry and expansion.",
          },
          {
            name: "Industrial Zone Alliance",
            description:
              "We connect manufacturers and investors with the right Economic Zones, Export Processing Zones, and industrial parks for their specific needs, leveraging our relationships to accelerate site selection, incentive access, and infrastructure alignment.",
          },
          {
            name: "Bilateral & Trade Policy Insight",
            description:
              "We track and interpret bilateral trade agreements, tariff structures, and evolving trade policy (including LDC graduation implications and GSP+ considerations) so our partners can plan ahead rather than react.",
          },
          {
            name: "Local Sourcing Synergies",
            description:
              "We identify and broker connections between international brands or investors and vetted local manufacturers, raw material suppliers, and service providers — building sourcing relationships grounded in due diligence, not guesswork.",
          },
          {
            name: "Building Strategies",
            description:
              "Whether entering the market for the first time or scaling an existing footprint, we help investors and manufacturers develop a market strategy that accounts for capital structure, risk tolerance, and long-term positioning within the sector.",
          },
          {
            name: "Market Entry Assurance",
            description:
              "We provide end-to-end support through the market entry process — from feasibility assessment to on-ground execution — giving investors confidence that their entry into Bangladesh's RMG ecosystem is grounded in accurate, current, and locally verified information.",
          },
        ],
      },
    ],
    imagePath: "/images/insights/port-harbor.jpg",
    imageDescription:
      "A handshake, port containers, or a business delegation — trade & investment in motion",
  },
  {
    number: "03",
    slug: "supply-chain",
    title: "RMG Supply Chain Ecosystem",
    shortTitle: "Supply Chain",
    tagline: "Resilience is the new competitiveness.",
    summary:
      "De-risking sourcing and logistics against macroeconomic and geopolitical shifts.",
    heroLine: "Resilience is the new competitiveness.",
    intro:
      "Global sourcing decisions are no longer made on unit price alone. Currency volatility, shifting trade alliances, freight disruption, and raw material dependency now shape where and how brands choose to manufacture. We help our partners understand these forces early — and build supply chains resilient enough to absorb them.",
    services: [],
    areas: [
      {
        title: "Our Areas of Work",
        items: [
          {
            name: "Macroeconomics",
            description:
              "We monitor and interpret the macroeconomic indicators most relevant to RMG sourcing — currency movement, inflation, interest rates, and labor cost trends — translating global economic shifts into practical implications for sourcing and pricing strategy.",
          },
          {
            name: "Geopolitical Impact",
            description:
              "From regional trade tensions to shifts in near-shoring and friend-shoring strategies among major buyers, we help manufacturers and brands understand how geopolitical developments could reshape demand for Bangladesh-made products — and how to position accordingly.",
          },
          {
            name: "Logistics Roadmap",
            description:
              "We assess freight routes, port capacity, and logistics bottlenecks affecting lead times, and help our partners design logistics strategies that reduce delays and build in contingency for disruption.",
          },
          {
            name: "De-Risking",
            description:
              "We help manufacturers and buyers identify concentration risk — in suppliers, markets, or logistics routes — and build diversification strategies that protect continuity of supply without sacrificing efficiency.",
          },
          {
            name: "Forecasting & Sourcing",
            description:
              "We support demand forecasting and sourcing strategy development, helping brands and manufacturers align production planning with realistic market signals rather than reactive, order-by-order decision-making.",
          },
        ],
      },
    ],
    imagePath: "/images/insights/logistics-warehouse.jpg",
    imageDescription:
      "Fabric rolls, a logistics network, or a busy port — the supply chain in motion",
  },
  {
    number: "04",
    slug: "operational-excellence",
    title: "Operational Excellence (Digitalization)",
    shortTitle: "Operational Excellence",
    tagline: "The modern factory floor, built for what's next.",
    summary:
      "Digitalization, automation, and human capital strategies that modernize the factory floor.",
    heroLine: "The modern factory floor, built for what's next.",
    intro:
      "Efficiency gains in RMG manufacturing increasingly come from smarter operations, not just harder work. We help factories modernize — through lean methodology, automation, and digital tools — while investing just as heavily in the people who run them.",
    services: [],
    areas: [
      {
        title: "Our Areas of Work",
        items: [
          {
            name: "Manufacturing Efficiency (Lean & Productivity Scaling)",
            description:
              "We apply proven lean manufacturing principles to identify waste, streamline workflows, and scale productivity — helping factories produce more with the resources they already have, before considering capital-heavy investment.",
          },
          {
            name: "Product Diversification",
            description:
              "We advise manufacturers on diversifying product lines and capabilities — reducing dependency on a narrow product mix and opening access to higher-margin categories and new buyer relationships.",
          },
          {
            name: "Automation & Industry 4.0",
            description:
              "We guide factories through the practical adoption of automation and Industry 4.0 technologies — from sensor-based production monitoring to automated cutting and sewing systems — matched to realistic ROI timelines and workforce transition plans.",
          },
          {
            name: "Energy Efficiency Management",
            description:
              "We help identify and implement energy efficiency measures across production — reducing both operational cost and environmental footprint, and directly supporting decarbonization goals under our Sustainability pillar.",
          },
          {
            name: "Human Capital Management Consultancy",
            description:
              "Technology transforms factories, but people run them. We advise on workforce planning, skills development, and organizational design needed to support modernization — ensuring digital transformation strengthens, rather than displaces, the workforce.",
          },
        ],
      },
    ],
    imagePath: "/images/insights/factory-3.jpg",
    imageDescription:
      "An automated sewing line, robotics, or a digital dashboard on the factory floor",
  },
];

export function getPillar(slug: string) {
  return pillars.find((pillar) => pillar.slug === slug);
}