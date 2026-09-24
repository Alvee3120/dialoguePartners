import type { NextConfig } from "next";

const DEV_R2_HOST = "pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev";

/**
 * Allowlist the image origins from the environment: the dev host is always
 * allowed (so a build without the variable still works) plus whatever
 * NEXT_PUBLIC_R2_BASE_URL points at — the production bucket, or a custom domain.
 */
const r2Origins = new Map<string, "https" | "http">([[DEV_R2_HOST, "https"]]);
const configuredBase = process.env.NEXT_PUBLIC_R2_BASE_URL;
if (configuredBase) {
  try {
    const url = new URL(configuredBase);
    r2Origins.set(url.hostname, url.protocol === "http:" ? "http" : "https");
  } catch {
    // Malformed base — fall back to the dev host only.
  }
}

const nextConfig: NextConfig = {
  experimental: {
    // CV uploads go through a Server Action; the default limit is 1MB.
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
  images: {
    remotePatterns: [...r2Origins].map(([hostname, protocol]) => ({
      protocol,
      hostname,
    })),
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
