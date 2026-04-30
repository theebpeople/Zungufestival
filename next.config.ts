import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/deck.html' },
      ],
    };
  },
};

export default nextConfig;
