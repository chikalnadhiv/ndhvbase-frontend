import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  // @ts-ignore
  turbopack: {},
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/:path*`,
      },
    ];
  },
};

const pwaConfig = withPWA({
  dest: "public",
  register: true,

  disable: process.env.NODE_ENV === "development",
})(nextConfig);

// @ts-ignore
pwaConfig.turbopack = {};

export default pwaConfig;
