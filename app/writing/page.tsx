import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { writings } from "@/lib/writing";
import { Archive } from "@/components/writing/Archive";
import { site } from "@/lib/site";
const description =
  "Papers and essays by Zawwar Sami on personal AI, memory, identity, consciousness and Islamic philosophy. Read the manuscripts, abstracts and citations.";
export const metadata: Metadata = {
  title: "Writing & Research",
  description,
  keywords: [
    "Zawwar Sami",
    "personal AI",
    "philosophy of AI",
    "memory",
    "identity",
    "consciousness",
    "Islamic philosophy",
  ],
  alternates: { canonical: "/writing" },
  openGraph: {
    type: "website",
    title: "Writing & Research · Zawwar Sami",
    description,
    url: "/writing",
    images: [{ url: "/images/observatory.webp", alt: "Writing and research by Zawwar Sami" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing & Research · Zawwar Sami",
    description,
    images: ["/images/observatory.webp"],
  },
};
export default function WritingPage() {
  const featured = writings.find((e) => e.kind === "Paper")!;
  return (
    <>
      <section className="archive-hero">
        <div className="archive-hero-art" aria-hidden="true">
          <Image src="/images/observatory.webp" alt="" fill priority sizes="100vw" />
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
          <span className="eyebrow">Latest paper / 2026</span>
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
    </>
  );
}
