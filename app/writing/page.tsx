import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { writings } from "@/lib/writing";
import { Archive } from "@/components/writing/Archive";
import { site } from "@/lib/site";
import { researchProcess } from "@/lib/research-process";
const description =
  "Research by Zawwar Sami across AI, philosophy, systems engineering and cybersecurity. Read papers, explore the research process and examine sources and revisions.";
export const metadata: Metadata = {
  title: "Writing & Research",
  description,
  keywords: [
    "Zawwar Sami",
    "independent research",
    "philosophy",
    "artificial intelligence",
    "systems engineering",
    "cybersecurity",
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
    hasPart: {
      "@type": "WebPageElement",
      "@id": "https://zawwarsami.com/writing#research-process",
      name: researchProcess.title,
      url: "https://zawwarsami.com/writing#research-process",
      text: researchProcess.paragraphs.join(" "),
    },
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
            Connected questions across artificial intelligence, philosophy, systems engineering,
            and cybersecurity. Papers, working ideas, and the evidence behind them.
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
      <section id="research-process" className="research-process shell" aria-labelledby="research-process-heading">
        <div>
          <span className="eyebrow">How I work</span>
          <h2 id="research-process-heading">Research <em>&amp; release.</em></h2>
          <span className="research-process-author">Zawwar Sami · A note on my process</span>
        </div>
        <div className="research-process-copy">
          {researchProcess.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <nav className="research-process-links" aria-label="Public research archive">
            <a href={researchProcess.archive} target="_blank" rel="noreferrer" className="text-link">
              Research archive <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href={researchProcess.discussions} target="_blank" rel="noreferrer" className="text-link">
              Open discussions <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </nav>
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
