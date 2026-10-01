"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X, FileText, ArrowRight } from "lucide-react";
import { type WritingEntry, writingDate } from "@/lib/writing";
const categories = ["All writing", "Papers", "Essays", "Research notes"] as const;
const kinds = { Papers: "Paper", Essays: "Essay", "Research notes": "Research note" } as const;
export function Archive({ entries }: { entries: WritingEntry[] }) {
  const [category, setCategory] = useState<string>("All writing");
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("");
  const topics = [...new Set(entries.flatMap((e) => e.tags))];
  const filtered = entries.filter(
    (e) =>
      (category === "All writing" || e.kind === kinds[category as keyof typeof kinds]) &&
      (!topic || e.tags.includes(topic)) &&
      `${e.title} ${e.summary} ${e.tags.join(" ")}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const reset = () => {
    setCategory("All writing");
    setQuery("");
    setTopic("");
  };
  return (
    <section id="archive" className="archive-section shell">
      <div className="section-heading">
        <div>
          <span className="eyebrow">The index / 2026</span>
          <h2>Follow a thread.</h2>
        </div>
        <p>
          Ideas collected in one place.
          <br />
          Open a piece. Stay with a question.
        </p>
      </div>
      <div className="archive-toolbar">
        <div className="archive-tabs" role="group" aria-label="Filter writing by type">
          {categories.map((name) => (
            <button key={name} onClick={() => setCategory(name)} aria-pressed={category === name}>
              {name}
              <span>
                {name === "All writing"
                  ? entries.length
                  : entries.filter((e) => e.kind === kinds[name]).length}
              </span>
            </button>
          ))}
        </div>
        <label className="archive-search">
          <Search size={17} aria-hidden="true" />
          <span className="sr-only">Search writing</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ideas, titles, topics…"
          />
        </label>
      </div>
      <div className="archive-subtoolbar">
        <span aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
        </span>
        <label>
          <span className="sr-only">Filter by topic</span>
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="">All topics</option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="archive-list">
        {filtered.map((entry, i) => (
          <article className="archive-entry" key={entry.slug}>
            <div className="archive-entry-meta">
              <span className="index-number">{String(i + 1).padStart(2, "0")}</span>
              <span className="eyebrow">{entry.kind}</span>
              <time dateTime={entry.datePublished}>{writingDate(entry.datePublished)}</time>
            </div>
            <div className="archive-entry-body">
              <Link href={`/writing/${entry.slug}`} className="entry-title">
                <h3>{entry.title}</h3>
                <ArrowUpRight aria-hidden="true" />
              </Link>
              <p>{entry.summary}</p>
              <div className="topic-tags">
                {entry.tags.map((tag) => (
                  <button key={tag} onClick={() => setTopic(tag)} aria-pressed={topic === tag}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <Link
              href={`/writing/${entry.slug}`}
              className="entry-open"
              aria-label={`Open ${entry.title}`}
            >
              <ArrowRight size={20} />
            </Link>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="archive-empty">
            <FileText size={28} strokeWidth={1} />
            <h3>{!query && !topic ? "A space for what comes next." : "No matching entries."}</h3>
            <p>
              {!query && !topic
                ? `${category} will appear here as they are released.`
                : "Try another title or explore all writing."}
            </p>
            <button className="text-link" onClick={reset}>
              View all writing <X size={14} />
            </button>
          </div>
        )}
      </div>
      <div className="archive-note">
        <span className="status-dot" />
        <p>
          Essays, papers and notes are labelled by format and publication status. Each entry keeps
          its source and citation close.
        </p>
      </div>
    </section>
  );
}
