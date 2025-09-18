import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  eslint: {
    // ✅ Prevents ESLint warnings from failing Vercel builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
