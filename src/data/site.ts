import { asset } from "@/lib/assets";

// Central site information — edit values here and they update everywhere.
export const site = {
  name: "Dialogue Partners",
  tagline: "Connecting Through Conversation",
  motto: "Transforming the RMG ecosystem through engagement.",
  // TODO: confirm real contact details before launch
  email: "zia.bangladesh@outlook.com",
  phone: "+880 1713-363494",
  city: "Dhaka, Bangladesh",
  address: "House 34, Road 115, Gulshan 2, Dhaka, Bangladesh",
  mottoKicker: "Stronger People. A More Sustainable Tomorrow.",
  heroVideo:
    asset("Hero-DialoguePartners.mp4"),
  footerBackground:
    asset("footerbg.png"),
  roleBackground:
    asset("ourrolebg.png"),
  mottoBackground:
    asset("motobg.png"),
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
