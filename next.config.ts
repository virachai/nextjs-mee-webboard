import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: "incremental",
    taint: true,
  },
  compress: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static-assets.codecademy.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "via.assets.so",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
