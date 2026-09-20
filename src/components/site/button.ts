/**
 * Shared button styles — Rovix-style pills with an arrow suffix. Compose the
 * variant with any layout/width utilities at the call site.
 */
export const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors duration-300";

/** Primary action on light surfaces. */
export const buttonPrimary = `${buttonBase} bg-accent-deep px-7 py-3.5 text-white hover:bg-navy`;

/** Outlined action on light surfaces. */
export const buttonSecondary = `${buttonBase} border border-line bg-white px-7 py-3.5 text-ink hover:border-accent hover:text-accent-deep`;

/** Solid navy action on light surfaces. */
export const buttonNavy = `${buttonBase} bg-navy px-7 py-3.5 text-white hover:bg-navy-soft`;

/** Primary action on dark/navy surfaces. */
export const buttonAccent = `${buttonBase} bg-accent px-7 py-3.5 text-ink hover:bg-accent-soft`;

/** Ghost action on dark/navy surfaces. */
export const buttonGhostLight = `${buttonBase} border border-white/40 px-7 py-3.5 text-white hover:border-white hover:bg-white/10`;
