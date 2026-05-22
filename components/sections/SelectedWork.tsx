"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag, Tag } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { caseStudies } from "@/app/work/_data";
import { fadeUp, stagger } from "@/lib/motion";

export function SelectedWork() {
  const featured = caseStudies.slice(0, 3);
  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-6 py-28 lg:px-12 lg:py-40">
      <div className="flex items-end justify-between gap-6">
        <div>
          <Reveal>
            <SectionTag label="Selected work" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-balance font-serif text-[clamp(36px,5vw,72px)] leading-[1.05] tracking-tight font-light text-[var(--color-fg)]">
              Things I've <span className="font-serif-italic text-[var(--color-accent)]">shipped</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <Button href="/work" variant="ghost">
            All work
          </Button>
        </Reveal>
      </div>

      <motion.ul
        variants={stagger(0.1, 0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-16 flex flex-col"
      >
        {featured.map((c, i) => (
          <motion.li
            key={c.slug}
            variants={fadeUp}
            className="border-t border-[var(--color-line)] last:border-b"
          >
            <Link
              href={`/work/${c.slug}`}
              className="group relative flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:gap-12 lg:py-14"
              data-cursor="card"
              data-cursor-label="Open"
            >
              {/* Index */}
              <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase lg:w-12">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Thumbnail */}
              {c.hero.image ? (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-[var(--color-line)] bg-[var(--color-surface)] transition-colors group-hover:border-[var(--color-accent)]/40 lg:w-[180px] lg:shrink-0">
                  <Image
                    src={c.hero.image}
                    alt={`${c.title} — ${c.tagline}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 180px"
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(7,7,10,0.10), rgba(7,7,10,0.55) 90%)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 mix-blend-soft-light opacity-50"
                    style={{
                      background:
                        "radial-gradient(ellipse 55% 60% at 70% 30%, rgba(220,38,38,0.30), transparent 70%)",
                    }}
                  />
                </div>
              ) : null}

              {/* Title block */}
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Tag>{c.category}</Tag>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
                    {c.year}
                  </span>
                </div>
                <h3 className="font-serif text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-tight font-light text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-accent)]">
                  {c.title} <span className="font-serif-italic text-[var(--color-fg-dim)]">— {c.tagline}</span>
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-fg-dim)]">
                  {c.summary}
                </p>
              </div>

              {/* Arrow */}
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-fg-dim)] transition-all group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-bg)]"
                aria-hidden
              >
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </span>

              {/* Hover sweep */}
              <motion.span
                className="pointer-events-none absolute inset-0 -z-10 origin-left bg-[var(--color-accent)]/[0.04]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
