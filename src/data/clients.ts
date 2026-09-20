// Client / partner logos for the "Trusted by" strip.
//
// Only H&M is confirmed so far — its logo asset has not been supplied yet.
// The remaining entries are open slots; drop a file at each `placeholderPath`
// and set `logo` to start rendering the real mark.

export type Client = {
  /** Confirmed client name — omitted for empty slots. */
  name?: string;
  /** Real logo file path or remote URL. */
  logo?: string;
  /** Filename the logo should live at until it is supplied. */
  placeholderPath: string;
};

export const clients: Client[] = [
  { name: "H&M", placeholderPath: "/images/clients/hm.svg" },
  { placeholderPath: "/images/clients/client-2.svg" },
  { placeholderPath: "/images/clients/client-3.svg" },
  { placeholderPath: "/images/clients/client-4.svg" },
];
