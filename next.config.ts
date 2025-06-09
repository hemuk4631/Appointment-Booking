import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // 👈 This disables type checking at build time
  },
};

export default nextConfig;
