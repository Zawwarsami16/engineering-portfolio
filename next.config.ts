import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Keep scholarly PDFs alongside their abstract URLs for citation_pdf_url.
  // Rewrites preserve both the original downloads and the manuscript bytes.
  async rewrites() {
    return [
      {
        source: "/writing/the-person-before-the-split/paper.pdf",
        destination: "/papers/Zawwar-Sami-The-Person-Before-the-Split.pdf",
      },
      {
        source: "/api/zenodo-pdf/23127396",
        destination: "/papers/Zawwar-Sami-The-Person-Before-the-Split.pdf",
      },
      {
        source: "/writing/what-survives-a-model-change/paper.pdf",
        destination: "/papers/Zawwar-Sami-What-Survives-a-Model-Change.pdf",
      },
      {
        source: "/writing/when-is-an-ai-personal/paper.pdf",
        destination: "/papers/Zawwar-Sami-When-Is-an-AI-Personal.pdf",
      },
    ];
  },
  images: { qualities: [75, 85, 90, 95] },
  reactStrictMode: true,
  transpilePackages: ["three"],
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "motion"],
  },
};

export default bundleAnalyzer(nextConfig);
