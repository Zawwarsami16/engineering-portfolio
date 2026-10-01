import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zawwarsami.com";

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Zawwar Sami — Engineer, Builder · Founder of Anteroom Studio",
    template: "%s · Zawwar Sami",
  },
  description:
    "Zawwar Sami is an independent engineer and builder based in Canada. Founder of Anteroom Studio. Builds AI systems for markets, geopolitics, and macro intelligence.",
  applicationName: "Zawwar Sami",
  authors: [{ name: "Zawwar Sami", url: SITE_URL }],
  creator: "Zawwar Sami",
  publisher: "Zawwar Sami",
  keywords: [
    "Zawwar Sami",
    "Zawwarsami",
    "Zawwar Sami engineer",
    "Zawwar Sami AI",
    "Anteroom Studio",
    "Anteroom Oracle",
    "ZAI",
    "AI engineer",
    "macro markets",
    "geopolitical AI",
    "Canadian AI builder",
    "Next.js",
    "TypeScript",
    "Python",
    "multi-agent systems",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    siteName: "Zawwar Sami",
    title: "Zawwar Sami — Engineer, Builder · Founder of Anteroom Studio",
    description:
      "Independent engineer based in Canada. Founder of Anteroom Studio. Builds AI systems for markets, geopolitics, and macro intelligence.",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zawwar Sami — Engineer, Builder · Founder of Anteroom Studio",
    description:
      "Independent engineer based in Canada. Builds AI systems for markets, geopolitics, and macro intelligence.",
    creator: "@Kh4nZawwar",
    site: "@Kh4nZawwar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Technology",
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION ?? "",
    },
  },
  other: {
    "google-site-verification": process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },
};

export function pageMetadata(title: string, description?: string, path?: string): Metadata {
  const paths: Record<string, string> = {
    About: "/about",
    Work: "/work",
    Stack: "/stack",
    Contact: "/contact",
    "The Anteroom Film": "/film",
  };
  const canonical = path ?? paths[title];
  return {
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: { title, description, ...(canonical ? { url: canonical } : {}) },
    twitter: { title, description },
  };
}
