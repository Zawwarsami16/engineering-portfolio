"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowUpRight, X } from "lucide-react";
import { caseStudies } from "@/app/work/_data";
import { writings } from "@/lib/writing";
import { site } from "@/lib/site";
const searchItems = [
  { title: "Home", hint: "The anteroom", href: "/" },
  ...site.nav.map((item) => ({
    title: item.label === "Writing" ? "Writing & Research" : item.label,
    hint: "Page",
    href: item.href,
  })),
  ...writings.map((item) => ({
    title: item.title,
    hint: `${item.kind} · ${item.tags.join(" · ")}`,
    href: `/writing/${item.slug}`,
  })),
  { title: "GitHub", hint: "Elsewhere · Zawwarsami16", href: site.socials.github },
  { title: "Anteroom Studio", hint: "GitHub organization", href: site.socials.githubOrg },
  { title: "LinkedIn", hint: "Elsewhere", href: site.socials.linkedin },
  { title: "Substack", hint: "Writing", href: site.socials.substack },
  { title: "Twitter", hint: "Elsewhere", href: site.socials.twitter },
  { title: "Email me", hint: site.email, href: `mailto:${site.email}` },
  ...caseStudies.map((item) => ({
    title: item.title,
    hint: "Selected work",
    href: `/work/${item.slug}`,
  })),
];
export function CommandPalette() {
  const ref = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const matches = searchItems.filter((item) =>
    `${item.title} ${item.hint}`.toLowerCase().includes(query.toLowerCase().trim()),
  );
  useEffect(() => {
    const open = () => {
      setQuery("");
      setActive(0);
      if (!ref.current?.open) ref.current?.showModal();
      inputRef.current?.focus();
    };
    const key = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") ||
        (e.key === "/" &&
          !["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) &&
          !target.isContentEditable)
      ) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", key);
    window.addEventListener("open-search", open);
    return () => {
      window.removeEventListener("keydown", key);
      window.removeEventListener("open-search", open);
    };
  }, []);
  const go = (href: string) => {
    ref.current?.close();
    if (href.startsWith("http")) window.open(href, "_blank", "noopener,noreferrer");
    else if (href.startsWith("mailto:")) window.location.href = href;
    else router.push(href);
  };
  return (
    <dialog
      ref={ref}
      className="search-dialog"
      aria-label="Search the website"
      onKeyDown={(e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActive((a) => Math.max(0, Math.min(a + 1, matches.length - 1)));
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setActive((a) => Math.max(0, a - 1));
        }
        if (e.key === "Enter" && e.target === inputRef.current && matches[active]) {
          e.preventDefault();
          go(matches[active].href);
        }
      }}
    >
      <div className="search-field">
        <Search size={18} />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          aria-label="Search pages, projects and writing"
          placeholder="Search pages, projects, writing…"
          autoComplete="off"
        />
        <button className="nav-icon" aria-label="Close search" onClick={() => ref.current?.close()}>
          <X size={18} />
        </button>
      </div>
      <div className="search-results" data-lenis-prevent>
        {matches.length ? (
          matches.map((item, i) => (
            <button
              key={item.href}
              aria-current={i === active ? "true" : undefined}
              className={i === active ? "search-active" : ""}
              onClick={() => go(item.href)}
              onMouseEnter={() => setActive(i)}
            >
              <span>
                {item.title}
                <small>{item.hint}</small>
              </span>
              <ArrowUpRight size={16} />
            </button>
          ))
        ) : (
          <p>No matches. Try another word.</p>
        )}
      </div>
      <div className="search-help">↑ ↓ Navigate · Enter Open · Esc Close</div>
    </dialog>
  );
}
