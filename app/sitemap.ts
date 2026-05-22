import type { MetadataRoute } from "next";
import { caseStudies } from "./work/_data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zawwarsami.com";

// Build-time static generation — sitemap is fully static at deploy
// time, served as a regular cached file from the edge. Avoids the
// dynamic-route latency that made Googlebot's first fetch fail.
export const dynamic = "force-static";
export const revalidate = 86400; // rebuild once a day if revalidated

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/work`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/writing`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/film`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/stack`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];

  const caseRoutes: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${SITE_URL}/work/${c.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...caseRoutes];
}
