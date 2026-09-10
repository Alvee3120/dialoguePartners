import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-c08eb6417f1b48ec8b568ba26a747fbb.r2.dev",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/people/advisor-2",
        destination: "/people/advisor-1",
        permanent: false,
      },
      {
        source: "/people/advisor-3",
        destination: "/people/advisor-1",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;