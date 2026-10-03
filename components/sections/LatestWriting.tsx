import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { writings } from "@/lib/writing";
export function LatestWriting() {
  return (
    <section className="latest-writing shell">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Writing & research</span>
          <h2>
            Ideas worth
            <br />
            <em>staying with.</em>
          </h2>
        </div>
        <Link href="/writing" className="text-link">
          The complete archive <ArrowUpRight size={17} />
        </Link>
      </div>
      <div className="latest-grid">
        {writings.slice(0, 3).map((entry, i) => (
          <Link href={`/writing/${entry.slug}`} key={entry.slug} className="latest-card">
            <div>
              <span className="eyebrow">
                {entry.kind} / {entry.datePublished.slice(0, 4)}
              </span>
              <ArrowUpRight size={20} />
            </div>
            <span className="latest-number" aria-hidden="true">
              0{i + 1}
            </span>
            <h3>{entry.title}</h3>
            <p>{entry.summary}</p>
            <span className="text-link">
              {entry.kind === "Paper" ? "Read the paper" : "Explore the essay"}{" "}
              <ArrowUpRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
