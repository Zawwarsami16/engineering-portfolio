import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zawwarsami.com";

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Zawwar Sami — Independent Researcher & Engineer",
    template: "%s · Zawwar Sami",
  },
  description:
    "Zawwar Sami is an independent researcher and engineer in Canada working across philosophy, artificial intelligence, and cybersecurity. Research preprints, ZAI systems, and open-source engineering.",
  applicationName: "Zawwar Sami",
  authors: [{ name: "Zawwar Sami", url: SITE_URL }],
  creator: "Zawwar Sami",
  publisher: "Zawwar Sami",
  keywords: [
    "Zawwar Sami", "Zawwarsami", "Independent researcher",
    "Philosophy", "Artificial intelligence", "Cybersecurity",
    "Research preprints", "ZAI", "ZAI Memory Hub", "Anteroom Studio",
    "AI agents", "Personal AI", "Consciousness", "Metaphysics",
    "Islamic philosophy", "Philosophy of mind", "Security research",
    "Hack The Box", "Persistent AI memory",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    siteName: "Zawwar Sami",
    title: "Zawwar Sami — Independent Researcher & Engineer",
    description:
      "Independent researcher and engineer working across philosophy, artificial intelligence, and cybersecurity. Explore papers, systems, and documented technical work.",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zawwar Sami — Independent Researcher & Engineer",
    description:
      "Research and engineering across philosophy, artificial intelligence, and cybersecurity. Papers, ZAI, and technical projects.",
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
