import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images:{
    remotePatterns: [new URL('https://ik.imagekit.io/jusrisveda/lawnotes/**')]
  }
};

export default nextConfig;
