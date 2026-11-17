import type { NextConfig } from "next";

// Static export for GitHub Pages (user site siddharthb18.github.io, so no basePath).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
