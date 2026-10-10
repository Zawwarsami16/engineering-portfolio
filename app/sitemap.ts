import type { MetadataRoute } from "next";
import { writings } from "@/lib/writing";
import { caseStudies } from "./work/_data";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://zawwarsami.com").replace(/\/$/, "");

// Update this only when main site copy or navigation changes materially.
// Avoid reporting every unchanged route as freshly modified on every build.
const SITE_REFRESH = new Date("2026-10-10T00:00:00Z");

// Keep this route static, cacheable, and reliable for Googlebot.
export const dynamic = "force-static";
export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: SITE_URL + "/", lastModified: SITE_REFRESH, changeFrequency: "monthly", priority: 1 },
    { url: SITE_URL + "/about", lastModified: SITE_REFRESH, changeFrequency: "monthly", priority: 0.9 },
    { url: SITE_URL + "/writing", lastModified: SITE_REFRESH, changeFrequency: "weekly", priority: 0.9 },
    { url: SITE_URL + "/research", lastModified: SITE_REFRESH, changeFrequency: "monthly", priority: 0.85 },
    { url: SITE_URL + "/work", lastModified: SITE_REFRESH, changeFrequency: "monthly", priority: 0.8 },
    { url: SITE_URL + "/stack", lastModified: SITE_REFRESH, changeFrequency: "monthly", priority: 0.7 },
    { url: SITE_URL + "/contact", lastModified: SITE_REFRESH, changeFrequency: "yearly", priority: 0.6 },
    { url: SITE_URL + "/film", changeFrequency: "monthly", priority: 0.5 },
  ];

  const work = caseStudies.map((entry) => ({
    url: SITE_URL + "/work/" + entry.slug,
    lastModified: SITE_REFRESH,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  // The public registry is the sole source of published paper URLs.
  // A5 and later additions automatically enter the sitemap when released.
  const papers = writings
    .filter((entry) => entry.status !== "Draft" && entry.status !== "Manuscript")
    .map((entry) => ({
      url: SITE_URL + "/writing/" + entry.slug,
      lastModified: new Date(entry.datePublished + "T00:00:00Z"),
      changeFrequency: "monthly" as const,
      priority: entry.kind === "Paper" ? 0.85 : 0.7,
    }));

  return [...routes, ...work, ...papers];
}
