// Client / partner logos for the home "Trusted by" strip.
//
// Logos are hosted on R2. To add a client whose logo isn't ready yet, omit
// `logo` and set `placeholderPath` — the strip renders a labelled slot instead.
export type Client = {
  name: string;
  /** Real logo file path or remote URL. */
  logo?: string;
  /** Filename a logo should live at when none is supplied yet. */
  placeholderPath?: string;
};

export const clients: Client[] = [
  {
    name: "H&M",
    logo: "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/H%26M-Logo.svg",
  },
  {
    name: "DBL",
    logo: "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/dbllogo.png",
  },
  {
    name: "Ananta",
    logo: "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/anatalogo.jpeg",
  },
  {
    name: "Hameem",
    logo: "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev/hameem%20logo.jpeg",
  },
];
