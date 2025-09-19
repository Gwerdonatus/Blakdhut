import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // 👇 This fixes the issue
    domains: ["cdn.sanity.io"],
  },
};

export default nextConfig;
