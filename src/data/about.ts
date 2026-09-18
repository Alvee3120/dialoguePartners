import { site } from "./site";

// Headline numbers for the About page. Derived from existing site copy —
// confirm the exact figures before launch.
export type Stat = {
  value: string;
  label: string;
};

export const aboutStats: Stat[] = [
  { value: "40+", label: "Years of RMG sector growth" },
  { value: "4", label: "Stakeholder groups we bridge" },
  { value: "4", label: "Core pillars" },
  { value: "Millions", label: "People the sector employs" },
];

export type Faq = {
  category: string;
  question: string;
  answer: string;
};

export const faqCategories = [
  "General",
  "Engagement",
  "Sector",
  "Partnership",
] as const;

export const faqs: Faq[] = [
  {
    category: "General",
    question: "What is Dialogue Partners?",
    answer:
      "Dialogue Partners is an ecosystem catalyst for Bangladesh\u2019s Ready-Made Garments sector. We work across the whole ecosystem rather than for a single player. We connect global brands, local manufacturers, technology providers, and policymakers, and turn those conversations into deliverable strategy.",
  },
  {
    category: "General",
    question: "What does \u201cecosystem catalyst\u201d actually mean?",
    answer:
      "It means we work across the ecosystem, not just one side of it. Standards, technical capability, capital, and regulation all have to move together, and someone has to connect the people responsible for each of them. Filling that gap is our job.",
  },
  {
    category: "General",
    question: "Do you only work with manufacturers?",
    answer:
      "No. We work with global brands, local manufacturers, technology providers, policymakers, and investors. The strongest results come from engaging more than one part of the ecosystem at once.",
  },
  {
    category: "Engagement",
    question: "How do you work with clients?",
    answer:
      "We convene, translate, and deliver. We bring the right people to the table, translate between technical and commercial language, and turn the resulting dialogue into strategy that can be executed.",
  },
  {
    category: "Engagement",
    question: "What does an engagement look like?",
    answer:
      "Every engagement starts with a conversation. We map where you sit in the ecosystem, identify the gaps between standards and capability, and build a sequenced path forward with clear milestones.",
  },
  {
    category: "Sector",
    question: "Why focus on Bangladesh\u2019s RMG sector?",
    answer:
      "After four decades of remarkable growth, the sector stands at a pivotal crossroads. The market has matured, and staying competitive now means moving beyond low-cost manufacturing to high-value, sustainable production.",
  },
  {
    category: "Sector",
    question: "What is changing in the sector?",
    answer:
      "Climate policy, trade shifts, and automation are all reshaping how the industry competes. The next decade will reward product development, innovation, and digital capability rather than low cost alone.",
  },
  {
    category: "Sector",
    question: "How do the four pillars fit together?",
    answer:
      "Our advisory work is organised around four pillars: Climate Resilience & Decarbonization, Technology Solutions, Trade & Policy Advocacy, and Operational Excellence & Digitalization. Each can be engaged on its own, but the greatest impact comes from addressing them together.",
  },
  {
    category: "Partnership",
    question: "Who do you partner with?",
    answer:
      "We work alongside global brands, local manufacturers, technology providers, policymakers, and investors across the RMG ecosystem.",
  },
  {
    category: "Partnership",
    question: "How do we start a conversation?",
    answer: `Email us at ${site.email} and tell us where you want to take the RMG sector next. One of our advisors will arrange a conversation.`,
  },
];
