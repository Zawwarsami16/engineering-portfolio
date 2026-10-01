import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import { writings, writingDate, citationFor } from "@/lib/writing";
import { Citation, ReadingSurface } from "@/components/writing/ReadingTools";
export const dynamicParams = false;
export function generateStaticParams() {
  return writings.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = writings.find((e) => e.slug === slug);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: `/writing/${slug}` },
    openGraph: {
      type: "article",
      title: entry.title,
      description: entry.summary,
      url: `/writing/${slug}`,
      authors: ["Zawwar Sami"],
      publishedTime: entry.datePublished,
    },
    other: {
      citation_title: entry.title,
      citation_author: "Zawwar Sami",
      citation_publication_date: entry.datePublished.replaceAll("-", "/"),
      ...(entry.pdf ? { citation_pdf_url: `https://zawwarsami.com${entry.pdf}` } : {}),
    },
  };
}
export default async function WritingEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = writings.find((e) => e.slug === slug);
  if (!entry) notFound();
  const related = writings.filter((e) => e.slug !== slug);
  const graph = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: entry.title,
    description: entry.summary,
    url: `https://zawwarsami.com/writing/${slug}`,
    mainEntity: {
      "@type": entry.kind === "Paper" ? "ScholarlyArticle" : "Article",
      headline: entry.title,
      author: { "@type": "Person", name: "Zawwar Sami", url: "https://zawwarsami.com" },
      datePublished: entry.datePublished,
      url: entry.url,
      keywords: entry.tags.join(", "),
      ...(entry.pdf
        ? {
            encoding: {
              "@type": "MediaObject",
              contentUrl: `https://zawwarsami.com${entry.pdf}`,
              encodingFormat: "application/pdf",
            },
          }
        : {}),
    },
  };
  return (
    <ReadingSurface>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
      />
      <article className="reading-layout shell">
        <header className="reading-header">
          <Link href="/writing" className="text-link">
            <ArrowLeft size={16} /> All writing
          </Link>
          <div className="eyebrow reading-kicker">
            {entry.kind} <span>/</span> {entry.status}
          </div>
          <h1>{entry.title}</h1>
          <div className="reading-byline">
            <span>Zawwar Sami</span>
            <span>·</span>
            <time dateTime={entry.datePublished}>{writingDate(entry.datePublished)}</time>
          </div>
        </header>
        <aside className="reading-sidebar">
          <span className="eyebrow">Entry details</span>
          <dl>
            <dt>Format</dt>
            <dd>{entry.kind}</dd>
            <dt>Publication</dt>
            <dd>{entry.status}</dd>
            <dt>Edition</dt>
            <dd>{entry.version}</dd>
          </dl>
          <div className="topic-tags">
            {entry.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <a className="text-link" href="#citation">
            Citation ↓
          </a>
          {entry.sections?.map((section, i) => (
            <a className="toc-link" href={`#section-${i}`} key={section.title}>
              {section.title}
            </a>
          ))}
        </aside>
        <div className="reading-main">
          <div className="reading-abstract">
            <span className="eyebrow">{entry.kind === "Paper" ? "Abstract" : "Overview"}</span>
            <p>{entry.summary}</p>
          </div>
          {entry.sections ? (
            <div className="article-prose">
              {entry.sections.map((section, i) => (
                <section id={`section-${i}`} key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </section>
              ))}
            </div>
          ) : (
            <div className="source-panel">
              <span className="eyebrow">Read the original</span>
              <h2>The essay continues on Substack.</h2>
              <p>
                This entry brings the original publication, topic details and citation together.
                Read the complete essay at its original source.
              </p>
              <a className="pill-link" href={entry.url} target="_blank" rel="noreferrer">
                Read full essay <ArrowUpRight size={17} />
              </a>
            </div>
          )}
          {entry.pdf && (
            <a className="pill-link" href={entry.pdf} download>
              <Download size={17} /> Download PDF
            </a>
          )}
          {entry.doi && (
            <p>
              <a href={`https://doi.org/${entry.doi}`}>DOI: {entry.doi}</a>
            </p>
          )}
          {entry.references && (
            <section className="article-prose">
              <h2>References</h2>
              <ol>
                {entry.references.map((ref) => (
                  <li key={ref.title}>{ref.url ? <a href={ref.url}>{ref.title}</a> : ref.title}</li>
                ))}
              </ol>
            </section>
          )}
          <Citation text={citationFor(entry)} slug={entry.slug} />
          <div className="edition-note">
            <span className="eyebrow">Publication record</span>
            <p>
              Original publication: {writingDate(entry.datePublished)}. This archive record
              preserves the source link and publication details; it does not represent peer review
              or a new edition of the essay.
            </p>
          </div>
        </div>
      </article>
      <section className="related-writing shell">
        <span className="eyebrow">Continue exploring</span>
        {related.map((next) => (
          <Link key={next.slug} href={`/writing/${next.slug}`}>
            <h2>{next.title}</h2>
            <ArrowUpRight size={24} />
          </Link>
        ))}
      </section>
    </ReadingSurface>
  );
}
