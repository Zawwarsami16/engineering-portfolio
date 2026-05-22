"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Tag } from "@/components/ui/Pill";
import { CaseHeroPattern } from "./CaseHeroPattern";
import type { CaseStudy } from "@/app/work/_data";

export function CaseCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.05 }}
      className="group"
    >
      <Link
        href={`/work/${study.slug}`}
        data-cursor="card"
        data-cursor-label="Read case study"
        className="block"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] transition-colors group-hover:border-[var(--color-accent)]/40">
          <CaseHeroPattern
            pattern={study.hero.pattern}
            image={study.hero.image}
            alt={`${study.title} — ${study.tagline}`}
          />
          <div className="absolute inset-0 flex flex-col justify-between p-6">
            <div className="flex items-center justify-between">
              <Tag>{study.category}</Tag>
              <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
                {study.year}
              </span>
            </div>
            <div className="flex items-end justify-between gap-4">
              <h3 className="font-serif text-[clamp(28px,4vw,52px)] leading-[1] font-light tracking-tight text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-accent)]">
                {study.title}
              </h3>
              <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-fg-dim)] transition-all group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-bg)]"
              >
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </span>
            </div>
          </div>
        </div>
        <div className="mt-5 flex items-baseline gap-3">
          <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            {String(index + 1).padStart(2, "0")} / {study.role}
          </span>
        </div>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--color-fg-dim)]">
          <span className="font-serif-italic text-[var(--color-fg)]">{study.tagline}.</span>{" "}
          {study.summary}
        </p>
      </Link>
    </motion.article>
  );
}
