import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,

  logging: {
    browserToTerminal: false,
  },

  allowedDevOrigins: ["10.39.97.149"],

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
