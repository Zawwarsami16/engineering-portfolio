"use client";

import { Sparkles, Zap, Gem, Box } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const values = [
  {
    icon: Sparkles,
    title: "Independent Inquiry",
    body: "I follow questions across philosophy, AI, and technology without forcing them into one discipline.",
  },
  {
    icon: Zap,
    title: "Evidence Matters",
    body: "An argument needs sources; a technical claim needs tests. I try to keep both open to scrutiny.",
  },
  {
    icon: Gem,
    title: "Security & Trust",
    body: "Understanding systems means understanding where they fail, what they expose, and where their boundaries sit.",
  },
  {
    icon: Box,
    title: "Build & Revisit",
    body: "I publish, build, test, and revise. A good idea should survive contact with reality.",
  },
];

export function Values() {
  return (
    <section className="relative mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12 lg:pb-24">
      <motion.div
        variants={stagger(0.1, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-4"
      >
        {values.map((v) => (
          <motion.div
            key={v.title}
            variants={fadeUp}
            className="group relative flex flex-col gap-4 bg-[var(--color-bg)] p-7 transition-colors hover:bg-[var(--color-surface)]"
          >
            <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-accent)] transition-transform group-hover:scale-105">
              <v.icon className="h-4 w-4" strokeWidth={1.4} />
              <span className="pulse-soft absolute inset-0 rounded-full border border-[var(--color-accent)]/30" />
            </div>
            <h3 className="font-serif text-2xl tracking-tight text-[var(--color-fg)]">
              {v.title}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--color-fg-dim)]">{v.body}</p>
            <span className="mt-2 block h-px w-8 bg-[var(--color-accent)] opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
