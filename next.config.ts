import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,

  logging: {
    browserToTerminal: false,
  },

  allowedDevOrigins: [
    "10.89.140.149",
    "10.89.140.192",
    "10.120.151.149",
    "10.10.200.11",
    "10.120.151.149",
    "192.168.0.104",
  ],

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
