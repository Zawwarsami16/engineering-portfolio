"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/Pill";
import { fadeUp, stagger } from "@/lib/motion";

const steps = [
  { n: "01", title: "Question", body: "Start with the premise. What is being asked, and what would count as an answer?" },
  { n: "02", title: "Research", body: "Read the literature, inspect evidence, and separate what is known from what is proposed." },
  { n: "03", title: "Build & Test", body: "Write, prototype, or investigate in a controlled setting. Find the limits of the idea." },
  { n: "04", title: "Publish & Revise", body: "Document results, show the sources and limitations, then improve when the evidence changes." },
]; {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative mx-auto w-full max-w-[1440px] px-6 py-28 lg:px-12 lg:py-40">
      <Reveal>
        <SectionTag label="How I work" />
      </Reveal>
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="mt-6 text-balance font-serif text-[clamp(36px,5vw,72px)] leading-[1.05] tracking-tight font-light text-[var(--color-fg)]"
      >
        A focused, <span className="font-serif-italic text-[var(--color-accent)]">iterative</span> process
      </motion.h2>

      <div ref={ref} className="relative mt-20 lg:mt-28">
        {/* Background dotted line */}
        <div
          aria-hidden
          className="absolute top-[18px] right-0 left-0 h-px"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, var(--color-line) 0 6px, transparent 6px 14px)",
          }}
        />
        {/* Active line */}
        <motion.div
          aria-hidden
          className="absolute top-[18px] left-0 h-px bg-[var(--color-accent)]"
          style={{ width: lineWidth }}
        />
        {/* Endpoint dots */}
        <span className="absolute top-[14px] left-0 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
        <span className="absolute top-[14px] right-0 h-2 w-2 rounded-full bg-[var(--color-line)]" />

        <motion.ol
          variants={stagger(0.2, 0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {steps.map((s, i) => (
            <motion.li key={s.n} variants={fadeUp} className="relative flex flex-col items-start lg:items-center lg:text-center">
              {/* Diamond marker */}
              <div className="relative mb-6">
                <DiamondMarker n={s.n} active={i === 0} />
              </div>
              <h3 className="font-serif text-2xl tracking-tight text-[var(--color-fg)]">{s.title}</h3>
              <p className="mt-3 max-w-[14ch] text-sm leading-relaxed text-[var(--color-fg-dim)]">{s.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

function DiamondMarker({ n, active = false }: { n: string; active?: boolean }) {
  return (
    <div className="relative">
      <motion.div
        className="relative h-12 w-12 rotate-45 border border-[var(--color-accent)] bg-[var(--color-bg)]"
        whileInView={{ scale: [0.8, 1.05, 1] }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      >
        <span className="absolute inset-1 border border-[var(--color-accent)]/40" />
        {active && (
          <span className="pulse-soft absolute -inset-1 border border-[var(--color-accent)]/40" />
        )}
      </motion.div>
      <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] tracking-[0.15em] text-[var(--color-accent)]">
        {n}
      </span>
    </div>
  );
}
