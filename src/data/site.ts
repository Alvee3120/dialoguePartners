// Central site information — edit values here and they update everywhere.
export const site = {
  name: "Dialogue Partners",
  tagline: "Connecting Through Conversation",
  motto: "Transforming the RMG ecosystem through engagement.",
  // TODO: confirm real contact details before launch
  email: "info@dialoguepartners.com",
  phone: "+880 xxx xxx xxx",
  city: "Dhaka, Bangladesh",
  address: "House 34, Road 115, Gulshan 2, Dhaka, Bangladesh",
  heroVideo:
    "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/Hero-DialoguePartners.mp4",
  footerBackground:
    "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/footerbg.png",
  roleBackground:
    "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/ourrolebg.png",
};

// Top-level navigation — one entry per dedicated page.
export const navLinks = [
  { label: "Who We Are", href: "/about" },
  { label: "Values", href: "/values" },
  { label: "Insight", href: "/pillars" },
  { label: "People", href: "/people" },
  { label: "Career", href: "/career" },
];

// TODO: confirm the real profile URLs before launch.
export const socialLinks: { label: SocialLabel; href: string }[] = [
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Website", href: "#" },
];

export type SocialLabel = "LinkedIn" | "YouTube" | "Website";
