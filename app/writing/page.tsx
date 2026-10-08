import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { writings } from "@/lib/writing";
import { Archive } from "@/components/writing/Archive";
import { site } from "@/lib/site";
const description =
  "Independent research by Zawwar Sami in philosophy and artificial intelligence. Explore preprints, abstracts, PDFs and links to Zenodo, PhilPapers and ORCID.";
export const metadata: Metadata = {
  title: "Writing & Research",
  description,
  keywords: [
    "Zawwar Sami",
    "independent research",
    "philosophy",
    "artificial intelligence",
    "AI agents",
    "personhood",
    "consciousness",
    "persistent memory",
    "Zenodo preprints",
    "PhilPapers",
    "ORCID",
  ],
  alternates: { canonical: "/writing" },
  openGraph: {
    type: "website",
    title: "Writing & Research · Zawwar Sami",
    description,
    url: "/writing",
    images: [{ url: "/images/universe/cosmos.webp", alt: "Writing and research by Zawwar Sami" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing & Research · Zawwar Sami",
    description,
    images: ["/images/universe/cosmos.webp"],
  },
};
export default function WritingPage() {
  const featured = writings.find((e) => e.kind === "Paper")!;
  const graph = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://zawwarsami.com/writing#archive",
    name: "Writing & Research — Zawwar Sami",
    url: "https://zawwarsami.com/writing",
    description,
    author: { "@id": "https://zawwarsami.com/#person" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: writings.map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: entry.title,
        url: "https://zawwarsami.com/writing/" + entry.slug,
      })),
    },
  };
  return (
    <div className="writing-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
      />
      <section className="archive-hero">
        <div className="archive-hero-art" aria-hidden="true">
          <Image src="/images/universe/cosmos.webp" alt="" fill priority sizes="100vw" />
        </div>
        <div className="shell archive-hero-content">
          <div className="eyebrow">
            <span className="status-dot" /> The Anteroom / Writing & Research
          </div>
          <h1>
            An archive
            <br />
            of <em>inquiry.</em>
          </h1>
          <p>
            Notes from the anteroom. On autonomous intelligence, the nature of consciousness, and
            the older traditions that ask what it means to be.
          </p>
          <a href="#archive" className="text-link">
            Explore the writing <ArrowDown size={16} />
          </a>
          <div className="archive-hero-foot">
            <span>By Zawwar Sami</span>
            <span>Independent inquiry · Open reading</span>
          </div>
        </div>
      </section>
      <section className="featured-writing shell">
        <div className="featured-art" aria-hidden="true">
          <div className="binary-orbit">
            <span />
            <span />
            <i />
          </div>
          <span>{featured.tags.slice(0, 3).join(" / ")}</span>
        </div>
        <div className="featured-copy">
          <span className="eyebrow">Latest paper{featured.seriesCode ? ` / ${featured.seriesCode}` : ""} / 2026</span>
          <h2>{featured.title}</h2>
          <p>{featured.summary}</p>
          <Link href={`/writing/${featured.slug}`} className="text-link">
            Read the paper <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <Archive entries={writings} />
      <section className="writing-outro shell">
        <span className="eyebrow">Keep the conversation open</span>
        <h2>
          Some questions
          <br />
          <em>deserve more time.</em>
        </h2>
        <a className="pill-link" href={site.socials.substack} target="_blank" rel="noreferrer">
          Follow the writing on Substack <ArrowUpRight size={17} />
        </a>
      </section>
    </div>
  );
}
