import type { NextConfig } from "next";
import withPlaiceholder from "@plaiceholder/next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "images.pexels.com",
        protocol: "https",
      },
    ],
  },
};

export default withPlaiceholder(nextConfig);
