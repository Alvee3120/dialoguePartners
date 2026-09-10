// Team / advisors directory.
// The slugs are stable, so pages will not need restructuring later.
// Advisor profiles carry both short-form card data and rich detail-page data.

/** Builds a gallery asset URL for a file in the R2 `ZiaurRahman/` folder. */
const galleryImage = (file: string) =>
  `https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/ZiaurRahman/${file}`;

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
  /** Thumbnail shown on the media card — R2 URL or local `/images/...` path. */
  image?: string;
};

export type Person = {
  slug: string;
  name: string;
  /** Title / role at Dialogue Partners. */
  position: string;
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
  gallery: { imagePath: string; description?: string }[];
  /** Social profile URLs. */
  socials: { linkedin?: string; email?: string };
};

export const people: Person[] = [
  {
    slug: "advisor-1",
    name: "Ziaur Rahman",
    position: "Regional Country Head · H&M Group",
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
        title: "Bangladesh needs to diversify products: H&M",
        source: "The Daily Star",
        url: "https://www.thedailystar.net/business/news/bangladesh-needs-diversify-products-hm-1828084",
        image:
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/ZiaurRahman/006a379e-ee3c-4407-970b-72e485c44625.jpg",
      },
      {
        title: "Bangladesh will continue to be an important production market for H&M",
        source: "Textile Today / Dhaka Tribune",
        url: "https://archive.dhakatribune.com/business/2020/07/25/bangladesh-will-continue-to-be-an-important-production-market-for-h-m",
        image:
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/ZiaurRahman/03f5116c-5b83-4aa5-918b-343e27bb92ad.jpg",
      },
      {
        title: "It's time for Bangladesh's apparel industry to go to the next level",
        source: "TBS News / Business Standard",
        url: "https://www.tbsnews.net/interviews/its-time-bangladesh-apparel-industry-go-next-level-45645",
        image:
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/ZiaurRahman/065e1cc5-9572-4262-8477-21377b5bfc4b.jpg",
      },
      {
        title: "H&M wins the trust of Bangladeshi apparel exporters",
        source: "TBS Business Standard",
        url: "https://www.tbsnews.net/economy/rmg/hm-wins-trust-bangladeshi-apparel-exporters-100303",
        image:
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/ZiaurRahman/0aca343f-ecc3-427f-9c61-9f306a3b1cbb.jpg",
      },
      {
        title: "Bangladesh is one of our biggest production markets — Ziaur Rahman, Regional Country Manager, H&M",
        source: "Denim Focus",
        url: "https://denimfocus.net/bangladesh-is-one-of-our-biggest-production-markets-and-will-continue-to-be-very-important-to-us-ziaur-rahman-regional-country-manager-hm/",
        image:
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/ZiaurRahman/140327dd-9f77-4c8e-9e49-1ccacc45ede4.jpg",
      },
      {
        title: "Ha-Meem Textile Recycling Plant launch",
        source: "Channel 24 (YouTube)",
        url: "https://www.youtube.com/watch?v=tbBBHAKM3eI&t=33s",
        image:
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/ZiaurRahman/151A7580.jpeg",
      },
      {
        title: "EuroCham Inauguration Ceremony",
        source: "YouTube",
        url: "https://www.youtube.com/watch?v=kiJEXZEseIY",
        image:
          "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/ZiaurRahman/1815d8f1-e17c-4103-b5f6-e163c5294e1e.jpg",
      },
    ],
    imagePath:
      "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/teamlead.jpg",
    gallery: [
      { imagePath: galleryImage("64528c15-6356-4052-8d15-373a1b2e9dd0.jpg") },
      { imagePath: galleryImage("5a31f6a4-4247-4fff-963a-c185fb421e0a.jpg") },
      { imagePath: galleryImage("5f5df8b4-4943-483e-90f7-ead6f4a0501c.jpg") },
      { imagePath: galleryImage("69d7f36a-bdc8-4ac8-962d-24d8a30136c0.jpg") },
      { imagePath: galleryImage("6a6f4e17-f83b-4589-addc-9771f5320be5.jpg") },
      { imagePath: galleryImage("DSC00622.jpeg") },
      { imagePath: galleryImage("DSC00679.jpeg") },
      { imagePath: galleryImage("FullSizeRender.JPG") },
      { imagePath: galleryImage("IMG_0029.JPEG") },
      { imagePath: galleryImage("IMG_0079.JPG") },
      { imagePath: galleryImage("IMG_0084.JPEG") },
      { imagePath: galleryImage("IMG_0149.JPEG") },
      { imagePath: galleryImage("IMG_0231.JPEG") },
      { imagePath: galleryImage("IMG_0348.JPEG") },
      { imagePath: galleryImage("IMG_0354.JPEG") },
      { imagePath: galleryImage("IMG_0410.JPEG") },
      { imagePath: galleryImage("IMG_0084.MOV") },
      { imagePath: galleryImage("IMG_0189.MOV") },
      { imagePath: galleryImage("IMG_0274.MOV") },
      { imagePath: galleryImage("IMG_0283.MOV") },
    ],
    socials: {
      linkedin: "http://www.linkedin.com/in/ziaur-rahman-bddh",
      email: "zia.bddh@gmail.com",
    },
  },
  {
    slug: "advisor-2",
    name: "Ziaur Rahman",
    position: "Advisor · Sustainability & ESG",
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
    imagePath:
      "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/teamlead2.jpeg",
    gallery: [
      { imagePath: "/images/people/advisor-2-01.jpg", description: "Portrait of Ziaur Rahman (advisor 2)" },
      { imagePath: "/images/people/advisor-2-02.jpg", description: "Advisor 2 at a workshop" },
    ],
    socials: { linkedin: "#", email: "info@dialoguepartners.com" },
  },
  {
    slug: "advisor-3",
    name: "Ziaur Rahman",
    position: "Advisor · Trade & Investment",
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
    imagePath:
      "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/teamlead3.jpg",
    gallery: [
      { imagePath: "/images/people/advisor-3-01.jpg", description: "Portrait of Ziaur Rahman (advisor 3)" },
      { imagePath: "/images/people/advisor-3-02.jpg", description: "Advisor 3 in a trade mission setting" },
    ],
    socials: { linkedin: "#", email: "info@dialoguepartners.com" },
  },
];

export function getPerson(slug: string) {
  return people.find((person) => person.slug === slug);
}