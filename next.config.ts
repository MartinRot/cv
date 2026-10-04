import type { NextConfig } from "next";

const isGhPages = process.env.DEPLOY_TARGET === "gh-pages";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isGhPages ? "/cv" : (process.env.NEXT_PUBLIC_BASE_PATH || ""),
};

export default nextConfig;
