import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  logging: {
    browserToTerminal: true, // You can turn this back on safely now
  },

  allowedDevOrigins: ["10.253.104.149"],
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
