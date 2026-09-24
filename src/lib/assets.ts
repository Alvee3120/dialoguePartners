/**
 * Central asset resolution.
 *
 * Object keys are stored in the data (e.g. `"climet.jpg"`) and the origin comes
 * from the environment, so the same content works against the dev R2 account
 * and the production one without touching any link.
 *
 * The dev origin is the fallback so the repo runs unchanged when the variable
 * isn't set; production must set NEXT_PUBLIC_R2_BASE_URL.
 */
const FALLBACK_BASE = "https://pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev";

export const R2_PUBLIC_BASE = (
  process.env.NEXT_PUBLIC_R2_BASE_URL || FALLBACK_BASE
).replace(/\/+$/, "");

/**
 * Resolve an asset reference to a full URL.
 * - absolute URLs are returned untouched (so pasting a full R2 URL still works)
 * - local `/images/...` paths are returned untouched
 * - anything else is treated as an object key on the configured bucket
 */
export function asset(pathOrUrl: string): string {
  if (!pathOrUrl) return pathOrUrl;
  if (/^https?:\/\//i.test(pathOrUrl) || pathOrUrl.startsWith("/")) {
    return pathOrUrl;
  }
  return `${R2_PUBLIC_BASE}/${pathOrUrl.replace(/^\/+/, "")}`;
}
