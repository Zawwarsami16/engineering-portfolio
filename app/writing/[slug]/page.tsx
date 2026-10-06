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
    title: `${entry.title}${entry.subtitle ? ` ${entry.subtitle}` : ""}`,
    description: entry.summary,
    keywords: ["Zawwar Sami", ...entry.tags],
    alternates: { canonical: `/writing/${slug}` },
    openGraph: {
      type: "article",
      title: `${entry.title}${entry.subtitle ? ` ${entry.subtitle}` : ""}`,
      description: entry.summary,
      url: `/writing/${slug}`,
      authors: ["Zawwar Sami"],
      publishedTime: entry.datePublished,
      images: [{ url: "/images/observatory.webp", alt: entry.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${entry.title}${entry.subtitle ? ` ${entry.subtitle}` : ""}`,
      description: entry.summary,
      images: ["/images/observatory.webp"],
    },
    other: {
      citation_title: `${entry.title}${entry.subtitle ? ` ${entry.subtitle}` : ""}`,
      citation_author: "Zawwar Sami",
      citation_publication_date: entry.datePublished.replaceAll("-", "/"),
      citation_abstract_html_url: `https://zawwarsami.com/writing/${slug}`,
      ...(entry.doi ? { citation_doi: entry.doi } : {}),
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
      headline: `${entry.title}${entry.subtitle ? ` ${entry.subtitle}` : ""}`,
      author: {
        "@type": "Person",
        name: "Zawwar Sami",
        url: "https://zawwarsami.com",
        ...(entry.orcid ? { sameAs: entry.orcid } : {}),
      },
      datePublished: entry.datePublished,
      description: entry.abstract ?? entry.summary,
      inLanguage: "en",
      mainEntityOfPage: `https://zawwarsami.com/writing/${slug}`,
      url: entry.url,
      keywords: entry.tags.join(", "),
      ...(entry.doi
        ? { identifier: { "@type": "PropertyValue", propertyID: "DOI", value: entry.doi } }
        : {}),
      ...(entry.zenodo ? { sameAs: [entry.zenodo, entry.philpapers].filter(Boolean) } : {}),
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
            {entry.seriesCode && <><strong>{entry.seriesCode}</strong> <span>/</span> </>}{entry.kind} <span>/</span> {entry.status}
          </div>
          <h1>{entry.title}</h1>
          {entry.subtitle && <p className="paper-subtitle">{entry.subtitle}</p>}
          {(entry.pdf || entry.zenodo || entry.philpapers || entry.orcid) && (
            <div className="paper-actions">
              {entry.pdf ? (
                <>
                  <a className="pill-link primary" href={entry.pdf} target="_blank" rel="noreferrer">
                    Read PDF <ArrowUpRight size={17} />
                  </a>
                  <a className="small-button" href={entry.pdf} download>
                    <Download size={16} /> Download PDF
                  </a>
                </>
              ) : entry.zenodo ? (
                <a className="pill-link primary" href={entry.zenodo} target="_blank" rel="noreferrer">
                  Read on Zenodo <ArrowUpRight size={17} />
                </a>
              ) : null}
              {entry.zenodo && entry.pdf && (
                <a className="text-link" href={entry.zenodo} target="_blank" rel="noreferrer">
                  Zenodo <ArrowUpRight size={16} />
                </a>
              )}
              {entry.substack && (
                <a className="text-link" href={entry.substack} target="_blank" rel="noreferrer">
                  Read on Substack <ArrowUpRight size={16} />
                </a>
              )}
              {entry.philpapers && (
                <a className="text-link" href={entry.philpapers} target="_blank" rel="noreferrer">
                  PhilPapers <ArrowUpRight size={16} />
                </a>
              )}
              {entry.orcid && (
                <a className="text-link" href={entry.orcid} target="_blank" rel="noreferrer">
                  ORCID <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          )}
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
            {entry.pages && (
              <>
                <dt>Length</dt>
                <dd>{entry.pages} pages</dd>
              </>
            )}
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
            <p>{entry.abstract ?? entry.summary}</p>
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
          ) : entry.pdf ? (
            <div className="source-panel">
              <span className="eyebrow">Full paper</span>
              <h2>Read the original manuscript.</h2>
              <p>
                The complete{entry.pages ? ` ${entry.pages}-page` : ""} paper is available in the
                author’s original PDF, including references.
              </p>
              <a className="text-link" href={entry.pdf} target="_blank" rel="noreferrer">
                Open PDF <ArrowUpRight size={17} />
              </a>
            </div>
          ) : entry.kind === "Paper" ? (
            <div className="source-panel">
              <span className="eyebrow">Full paper</span>
              <h2>Read the public manuscript.</h2>
              <p>
                The complete paper and publication record are available through the scholarly
                sources linked with this entry.
              </p>
              <a
                className="text-link"
                href={entry.zenodo ?? entry.philpapers ?? entry.url}
                target="_blank"
                rel="noreferrer"
              >
                Open paper record <ArrowUpRight size={17} />
              </a>
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
              {entry.pdf ? (
                <>
                  Added to this website on {writingDate(entry.datePublished)}. The PDF is preserved
                  exactly as supplied by the author.
                </>
              ) : (
                <>
                  Original publication: {writingDate(entry.datePublished)}. This archive record
                  preserves the source link and publication details; it does not represent peer
                  review or a new edition of the essay.
                </>
              )}
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
