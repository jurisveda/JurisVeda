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
    remotePatterns: [{
      protocol: 'https',
      hostname: 'ik.imagekit.io',
      port: '',
      pathname: '/jusrisveda/**'
    }]
  }
};

export default nextConfig;
