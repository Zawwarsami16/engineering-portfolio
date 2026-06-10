"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Home,
  User,
  Briefcase,
  Layers,
  Mail,
  Github,
  Linkedin,
  Twitter,
  ArrowUpRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { caseStudies } from "@/app/work/_data";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

type Item = {
  id: string;
  label: string;
  hint?: string;
  group: "Pages" | "Work" | "Elsewhere" | "Hidden";
  icon: LucideIcon;
  action: () => void;
  external?: boolean;
};

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const summonOrb = useCallback(() => {
    if (typeof document === "undefined") return;
    const orb = document.createElement("div");
    orb.style.cssText = [
      "position:fixed",
      "top:50%",
      "left:-180px",
      "width:140px",
      "height:140px",
      "border-radius:9999px",
      "transform:translate(-50%,-50%)",
      "z-index:9999",
      "pointer-events:none",
      "background:radial-gradient(circle at 50% 50%, rgba(255,140,120,0.95) 0%, rgba(220,38,38,0.6) 35%, rgba(80,4,8,0) 70%)",
      "filter:blur(2px)",
      "transition:left 1500ms cubic-bezier(0.65,0,0.35,1), opacity 400ms ease",
      "opacity:0",
    ].join(";");
    document.body.appendChild(orb);
    requestAnimationFrame(() => {
      orb.style.opacity = "1";
      orb.style.left = `${window.innerWidth + 180}px`;
    });
    window.setTimeout(() => {
      orb.style.opacity = "0";
    }, 1400);
    window.setTimeout(() => {
      orb.remove();
    }, 1800);
  }, []);

  const items: Item[] = useMemo(
    () => [
      { id: "home", group: "Pages", icon: Home, label: "Home", hint: "/", action: () => router.push("/") },
      { id: "about", group: "Pages", icon: User, label: "About", hint: "/about", action: () => router.push("/about") },
      { id: "work", group: "Pages", icon: Briefcase, label: "Work", hint: "/work", action: () => router.push("/work") },
      { id: "stack", group: "Pages", icon: Layers, label: "Stack", hint: "/stack", action: () => router.push("/stack") },
      { id: "contact", group: "Pages", icon: Mail, label: "Contact", hint: "/contact", action: () => router.push("/contact") },

      ...caseStudies.map<Item>((c) => ({
        id: `work-${c.slug}`,
        group: "Work",
        icon: ArrowUpRight,
        label: c.title,
        hint: c.tagline,
        action: () => router.push(`/work/${c.slug}` as never),
      })),

      {
        id: "github",
        group: "Elsewhere",
        icon: Github,
        label: "GitHub",
        hint: "Zawwarsami16",
        action: () => window.open(site.socials.github, "_blank", "noreferrer"),
        external: true,
      },
      {
        id: "github-org",
        group: "Elsewhere",
        icon: Github,
        label: "Anteroom Studio (org)",
        hint: "anteroom-studio",
        action: () => window.open(site.socials.githubOrg, "_blank", "noreferrer"),
        external: true,
      },
      {
        id: "linkedin",
        group: "Elsewhere",
        icon: Linkedin,
        label: "LinkedIn",
        action: () => window.open(site.socials.linkedin, "_blank", "noreferrer"),
        external: true,
      },
      {
        id: "twitter",
        group: "Elsewhere",
        icon: Twitter,
        label: "Twitter",
        hint: "@Kh4nZawwar",
        action: () => window.open(site.socials.twitter, "_blank", "noreferrer"),
        external: true,
      },
      {
        id: "email",
        group: "Elsewhere",
        icon: Mail,
        label: "Email me",
        hint: site.email,
        action: () => window.open(`mailto:${site.email}`, "_self"),
        external: true,
      },

      {
        id: "summon-orb",
        group: "Hidden",
        icon: Sparkles,
        label: "Summon the orb",
        hint: "easter egg · across the screen",
        action: () => summonOrb(),
      },
    ],
    [router, summonOrb],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    const score = (s: string) => {
      const t = s.toLowerCase();
      if (t === q) return 100;
      if (t.startsWith(q)) return 70;
      if (t.includes(q)) return 40;
      const initials = t
        .split(/\s+/)
        .map((w) => w[0] ?? "")
        .join("");
      if (initials.startsWith(q)) return 30;
      return 0;
    };
    return items
      .map((it) => ({ it, s: Math.max(score(it.label), score(it.hint ?? "")) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.it);
  }, [query, items]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isTyping =
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement ||
        (document.activeElement as HTMLElement)?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open && e.key === "/" && !isTyping) {
        e.preventDefault();
        setOpen(true);
        return;
      }
      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(filtered.length - 1, a + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const it = filtered[active];
        if (it) {
          it.action();
          if (!it.external) close();
          else close();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  let lastGroup: string | null = null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cmdk"
          aria-modal
          role="dialog"
          aria-label="Command palette"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[110] flex items-start justify-center bg-[var(--color-bg)]/70 px-6 pt-[12vh] backdrop-blur-md"
          onClick={close}
        >
          <motion.div
            initial={{ y: -16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -8, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-surface)]/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6),0_0_0_1px_var(--color-line)] backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-[var(--color-line)] px-5 py-4">
              <Search className="h-4 w-4 text-[var(--color-muted)]" strokeWidth={1.5} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a page, project, or social…"
                className="flex-1 bg-transparent font-sans text-[15px] text-[var(--color-fg)] placeholder:text-[var(--color-muted)] focus:outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="hidden rounded border border-[var(--color-line)] bg-[var(--color-bg)] px-2 py-0.5 font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase sm:inline">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[55vh] overflow-y-auto py-2 scrollbar-hide">
              {filtered.length === 0 && (
                <div className="px-5 py-8 text-center font-mono text-[11px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
                  No matches
                </div>
              )}
              {filtered.map((it, i) => {
                // group dividers only make sense while browsing; once a query
                // is active the list is score-sorted so groups interleave and
                // the running compare would repeat the same header
                const showGroup = !query.trim() && it.group !== lastGroup;
                lastGroup = it.group;
                const Icon = it.icon;
                const isActive = i === active;
                return (
                  <div key={it.id}>
                    {showGroup && (
                      <div className="px-5 pt-3 pb-1 font-mono text-[9px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
                        {it.group}
                      </div>
                    )}
                    <button
                      type="button"
                      data-idx={i}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => {
                        it.action();
                        close();
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 px-5 py-2.5 text-left transition-colors",
                        isActive
                          ? "bg-[var(--color-accent)]/10 text-[var(--color-fg)]"
                          : "text-[var(--color-fg-dim)] hover:bg-[var(--color-bg-soft)]",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded border",
                          isActive
                            ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                            : "border-[var(--color-line)]",
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </span>
                      <span className="flex-1 truncate font-sans text-[14px]">{it.label}</span>
                      {it.hint && (
                        <span className="hidden truncate font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase sm:inline">
                          {it.hint}
                        </span>
                      )}
                      {it.external && (
                        <ArrowUpRight className="h-3 w-3 text-[var(--color-muted)]" strokeWidth={1.5} />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-[var(--color-line)] px-5 py-2.5 font-mono text-[9px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
              <span className="flex items-center gap-2">
                <kbd className="rounded border border-[var(--color-line)] bg-[var(--color-bg)] px-1.5 py-0.5">↑↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-2">
                <kbd className="rounded border border-[var(--color-line)] bg-[var(--color-bg)] px-1.5 py-0.5">↵</kbd>
                select
              </span>
              <span className="flex items-center gap-2">
                <kbd className="rounded border border-[var(--color-line)] bg-[var(--color-bg)] px-1.5 py-0.5">/</kbd>
                or
                <kbd className="rounded border border-[var(--color-line)] bg-[var(--color-bg)] px-1.5 py-0.5">⌘K</kbd>
                to open
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
