// Team / advisors directory.
// Slugs are the kebab-case of each person's name, so profile URLs read as
// /people/ziaur-rahman. Keep them in sync when a name changes.
// Advisor profiles carry both short-form card data and rich detail-page data.

/** Gallery/media paths that point at a video file rather than an image. */
export const VIDEO_PATTERN = /\.(mov|mp4|m4v|webm)$/i;

export type CareerRole = {
  role: string;
  org: string;
  period: string;
  scope: string; // business size / scope (optional)
  description: string;
};

export type PersonMedia = {
  title: string;
  url?: string;
  source?: string;
  year?: string;
  /** Card images — R2 URL or local `/images/...` path. Two or more render as a carousel. */
  images?: string[];
};

export type GalleryItem = {
  /** R2 URLs or local `/images/...` paths. Two or more render as a carousel. */
  images: string[];
  /** Caption shown under the tile and used as the image's alt text. */
  description?: string;
};

export type Person = {
  slug: string;
  name: string;
  /** Title / role at Dialogue Partners. */
  position: string;
  /** When true, the profile page renders a minimal "Coming Soon" notice instead of the full bio. */
  comingSoon?: boolean;
  /** Short intro shown on the profile page. */
  bio: string[];
  /** Focus area shown on cards and profile page. */
  focus: string;
  /** Longer focus/tagline for the detail page sub-line. */
  tagline?: string;
  /** Core competencies (icon cards on detail page). */
  competencies: string[];
  /** Current portfolio highlights (detail page). */
  portfolio: string[];
  /** Career timeline (detail page). */
  experience: CareerRole[];
  /** Details that don't fit the timeline (detail page). */
  highlights: { label: string; value: string }[];
  /** Academic credentials. */
  education: string[];
  /** Press / media interviews. */
  media: PersonMedia[];
  /** Where the headshot lives — local path or remote URL. */
  imagePath: string;
  /** Photo gallery for the profile page. */
  gallery: GalleryItem[];
  /** Social profile URLs. */
  socials: { linkedin?: string; email?: string };
};

export const people: Person[] = [
  {
    slug: "ziaur-rahman",
    name: "Ziaur Rahman",
    position: "Founder of Dialogue Partners",
    focus: "Sustainability, Trade Policy & Operational Excellence",
    tagline: "Supply-chain efficiency, sustainability advocacy, trade policy, and industry transformation",
    bio: [
      "Ziaur Rahman is a senior apparel and textile supply-chain leader with more than 25 years of experience across global sourcing, sustainability, stakeholder management, and organizational transformation. He currently serves as Regional Country Head for H&M Group's Bangladesh, Pakistan, and Africa production regions.",
      "A sought-after policy voice, Ziaur sits on the boards of the European Chamber of Commerce, the RMG Sustainability Council (RSC), and the Nordic Chamber of Commerce, and represents brands under the Employment Injury Scheme (EIS) pilot. He is passionate about shaping a high-value, sustainable, and digitally connected future for Bangladesh's RMG sector.",
    ],
    competencies: [
      "Transforming organizations for a future-fit business",
      "Strategic thinking & long-term planning",
      "Sourcing knowledge across woven, knit, and jersey categories",
      "Profitability — goal-oriented & number-driven",
      "Vendor management & relationship building (capacity vs. capability)",
      "Organizational development",
      "Operational excellence in merchandising, quality & lead time",
      "Stakeholder management & public affairs",
      "Sustainability advocacy & policy influence",
    ],
    portfolio: [
      "Regional Country Head — Chief Representative for Bangladesh, Pakistan, and Africa operations.",
      "Driving organization transformation and balancing operational cost with efficiency.",
      "Supply-chain sourcing, strategic planning, and diversified vendor management.",
      "Setting environmental and social sustainability goals and maximizing operational use.",
      "Advocating group ambitions toward government, industry, and development stakeholders.",
      "Briefing as group spokesperson for the region and shaping policy for ease of doing business.",
    ],
    experience: [
      {
        role: "Regional Country Head",
        org: "H&M Group",
        period: "July 2019 — Present",
        scope: "Bangladesh, Pakistan & Africa production · Business size USD 3B",
        description:
          "Create and execute strategy for the region; direct the operational team covering all product types; represent H&M Group on policy, public affairs, and stakeholder issues; drive the sustainability agenda.",
      },
      {
        role: "Supply Chain Manager",
        org: "H&M Group",
        period: "August 2016 — June 2019",
        scope: "Indonesia supply chain operation · Business size USD 400M",
        description:
          "Directed the operational team for Jersey, Lingerie, and Swimwear across the Indonesian supply chain.",
      },
      {
        role: "Supply Chain Manager",
        org: "H&M Group",
        period: "January 2013 — August 2016",
        scope: "Bangladesh & Pakistan supply chain · Business size USD 1.6B",
        description:
          "Directed the operational team for Jersey, Knitwear, Lingerie, and Swimwear across Bangladesh and Pakistan.",
      },
      {
        role: "Product Manager, Capacity Manager",
        org: "H&M Group",
        period: "December 2008 — December 2012",
        scope: "Jersey, Knitwear, Lingerie & Swimwear",
        description:
          "Operational management of product teams across Jersey, Knitwear, Lingerie, and Swimwear.",
      },
      {
        role: "Merchandising Manager",
        org: "Danatex Inc.",
        period: "July 2006 — November 2008",
        scope: "Importer for K-Mart, QVC, Foretex",
        description:
          "Led merchandising operations for woven, knitwear, and jersey product categories.",
      },
      {
        role: "Senior Merchandiser",
        org: "H&M",
        period: "December 2002 — June 2006",
        scope: "Jersey & Knitwear",
        description:
          "Managed men's, ladies', and kids' business for Jersey and Knitwear.",
      },
      {
        role: "Merchandiser",
        org: "Li & Fung Bangladesh",
        period: "February 2001 — November 2002",
        scope: "Importers — Adams, TJ Hughes, Mothercare, JD Williams",
        description:
          "Managed men's and kids' business for Jersey, Woven, and Knitwear, including back-to-school programs.",
      },
      {
        role: "Merchandiser",
        org: "Ananta Group",
        period: "June 1996 — January 2001",
        scope: "Importers — K-Mart, Sears, JC Penney, Wal-Mart",
        description:
          "Ran factory manufacturing operations for the ladies' woven business.",
      },
    ],
    highlights: [
      { label: "Vice Chairperson", value: "European Chamber of Commerce (EuroCham) Bangladesh" },
      { label: "Board of Directors", value: "RMG Sustainability Council (RSC)" },
      { label: "Board of Directors", value: "Nordic Chamber of Commerce & Industry in Bangladesh" },
      { label: "Brands Representative", value: "Employment Injury Scheme (EIS) Pilot" },
    ],
    education: [
      "Executive MBA — American International University Bangladesh",
      "Graduate — Bangladesh National University",
    ],
    media: [
      {
        title: "LDC graduation discussion with Think Tanks",
        url: "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/LDC/LDC%20Graduation%20-%20Round%20table%20discussion%20report.pdf",
        images: [
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/LDC/ldc1.JPEG",
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/LDC/ldc2.JPEG",
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/LDC/ldc3.JPEG",
        ],
      },
      {
        title: "Bangladesh needs to diversify products: H&M",
        source: "The Daily Star",
        url: "https://www.thedailystar.net/business/news/bangladesh-needs-diversify-products-hm-1828084",
        images: [
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/ZiaurRahman/006a379e-ee3c-4407-970b-72e485c44625.jpg",
        ],
      },
      {
        title: "Bangladesh will continue to be an important production market for H&M",
        source: "Textile Today / Dhaka Tribune",
        url: "https://archive.dhakatribune.com/business/2020/07/25/bangladesh-will-continue-to-be-an-important-production-market-for-h-m",
        images: [
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/ZiaurRahman/03f5116c-5b83-4aa5-918b-343e27bb92ad.jpg",
        ],
      },
      {
        title: "It's time for Bangladesh's apparel industry to go to the next level",
        source: "TBS News / Business Standard",
        url: "https://www.tbsnews.net/interviews/its-time-bangladesh-apparel-industry-go-next-level-45645",
        images: [
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/ZiaurRahman/065e1cc5-9572-4262-8477-21377b5bfc4b.jpg",
        ],
      },
      {
        title: "H&M wins the trust of Bangladeshi apparel exporters",
        source: "TBS Business Standard",
        url: "https://www.tbsnews.net/economy/rmg/hm-wins-trust-bangladeshi-apparel-exporters-100303",
        images: [
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/ZiaurRahman/0aca343f-ecc3-427f-9c61-9f306a3b1cbb.jpg",
        ],
      },
      {
        title: "Bangladesh is one of our biggest production markets — Ziaur Rahman, Regional Country Manager, H&M",
        source: "Denim Focus",
        url: "https://denimfocus.net/bangladesh-is-one-of-our-biggest-production-markets-and-will-continue-to-be-very-important-to-us-ziaur-rahman-regional-country-manager-hm/",
        images: [
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/ZiaurRahman/140327dd-9f77-4c8e-9e49-1ccacc45ede4.jpg",
        ],
      },
      {
        title: "Ha-Meem Textile Recycling Plant launch",
        source: "Channel 24 (YouTube)",
        url: "https://www.youtube.com/watch?v=tbBBHAKM3eI&t=33s",
        images: [
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/ZiaurRahman/151A7580.jpeg",
        ],
      },
      {
        title: "EuroCham Inauguration Ceremony",
        source: "YouTube",
        url: "https://www.youtube.com/watch?v=kiJEXZEseIY",
        images: [
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/ZiaurRahman/1815d8f1-e17c-4103-b5f6-e163c5294e1e.jpg",
        ],
      },
    ],
    imagePath:
      "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/teamlead3.jpg",
    gallery: [
      {
        images: [
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/European%20office/Europeanoffice1.jpg",
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/European%20office/Europeanoffice2.jpg",
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/European%20office/Europeanoffice3.JPEG",
        ],
        description: "At European office – Ambassador Charles Whiteley",
      },
      {
        images: [
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/ncci/ncci.JPEG",
        ],
        description: "FDI discussion at NCCI",
      },
      {
        images: [
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/Future%20Proofing%20Business/Future%20Proofing%20Business1.JPEG",
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/Future%20Proofing%20Business/Future%20Proofing%20Business2.JPEG",
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/Future%20Proofing%20Business/Future%20Proofing%20Business3.JPEG",
        ],
        description:
          "Future Proofing Business: A road map to Resilient Bangladesh\nEvent organized by HSBC & Nordic Chamber",
      },
      {
        images: [
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/EuroCham%20meeting/EuroCham%20meeting.JPEG",
        ],
        description:
          "EuroCham meeting with European Investment Bank together with EU Delegation.",
      },
    ],
    socials: {
      linkedin: "https://www.linkedin.com/in/ziaur-rahman-bangladesh/",
      email: "zia.bddh@gmail.com",
    },
  },
  {
    slug: "advisor-2",
    name: "Advisor Name",
    position: "Visiting Advisor",
    comingSoon: true,
    focus: "Sustainability & ESG Reporting",
    bio: [
      "Ziaur Rahman has spent his career at the intersection of sustainability compliance and factory practice, supporting manufacturers across ESG reporting, climate resilience, and social responsibility. He has guided factories toward SBTi-aligned targets and verified, buyer-ready disclosures.",
      "His expertise turns regulatory expectation into practical, multi-year programs that embed sustainability into daily operations rather than treating it as a separate initiative.",
    ],
    competencies: [
      "ESG reporting & disclosure frameworks",
      "Climate resilience & SBTi alignment",
      "Social sustainability & worker rights",
      "Stakeholder engagement",
    ],
    portfolio: [
      "Supporting manufacturers across ESG reporting and buyer-ready disclosures.",
      "Guiding factories toward science-based climate targets and circularity.",
    ],
    experience: [
      { role: "Sustainability & ESG Advisor", org: "Dialogue Partners", period: "Present", scope: "", description: "Advises manufacturers on ESG strategy, reporting, and climate resilience." },
      { role: "ESG Reporting Manager", org: "International Buyer Networks", period: "2015 — 2024", scope: "", description: "Led ESG reporting and disclosure for international buying organizations." },
    ],
    highlights: [{ label: "Focus", value: "Sustainability & ESG Reporting" }],
    education: ["Graduate — Bangladesh National University"],
    media: [],
    imagePath: "/images/people/placeholder-advisor.svg",
    gallery: [
      { images: ["/images/people/advisor-2-01.jpg"], description: "Portrait of Ziaur Rahman (advisor 2)" },
      { images: ["/images/people/advisor-2-02.jpg"], description: "Advisor 2 at a workshop" },
    ],
    socials: { linkedin: "#", email: "info@dialoguepartners.com" },
  },
  {
    slug: "advisor-3",
    name: "Advisor Name",
    position: "Visiting Advisor",
    comingSoon: true,
    focus: "Investment & Trade Facilitation",
    bio: [
      "Ziaur Rahman brings deep experience on both sides of the table — inside global brands and within Bangladesh's suppliers and industrial zones. He has supported investors and manufacturers through regulatory navigation, market entry, and cross-border trade strategy.",
      "His strength is translating policy shifts and market signals into clear, sequenced plans that give partners confidence to act in a fast-moving sourcing environment.",
    ],
    competencies: ["Trade policy insight", "Regulatory navigation", "Market entry strategy", "Cross-border partnership"],
    portfolio: ["Guiding investors and manufacturers through regulatory navigation and market entry."],
    experience: [
      { role: "Investment & Trade Advisor", org: "Dialogue Partners", period: "Present", scope: "", description: "Advises on investment, trade policy, and market entry in the RMG sector." },
      { role: "Market Entry & Trade Strategy", org: "Multinational Sourcing Group", period: "2014 — 2024", scope: "", description: "Led market-entry and trade strategy for a multinational sourcing group." },
    ],
    highlights: [{ label: "Focus", value: "Investment & Trade Facilitation" }],
    education: ["Graduate — Bangladesh National University"],
    media: [],
    imagePath: "/images/people/placeholder-advisor.svg",
    gallery: [
      { images: ["/images/people/advisor-3-01.jpg"], description: "Portrait of Ziaur Rahman (advisor 3)" },
      { images: ["/images/people/advisor-3-02.jpg"], description: "Advisor 3 in a trade mission setting" },
    ],
    socials: { linkedin: "#", email: "info@dialoguepartners.com" },
  },
];

export function getPerson(slug: string) {
  return people.find((person) => person.slug === slug);
}
