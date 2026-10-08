"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionTag } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { VideoLoop } from "@/components/ui/VideoLoop";
import { site } from "@/lib/site";

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const horizonY = useTransform(scrollYProgress, [0, 1], ["12%", "-22%"]);
  const horizonOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.2, 1, 0.6]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 py-32 lg:px-12 lg:py-40"
    >
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[100vh] w-full"
        style={{ y: horizonY, opacity: horizonOpacity }}
      >
        <VideoLoop
          src="/video/footer.mp4"
          position="center bottom"
          className="h-full w-full"
          preload="metadata"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1/2"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-bg) 0%, rgba(7,7,10,0.6) 60%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 90%, transparent 0%, transparent 55%, var(--color-bg) 100%)",
          }}
        />
      </motion.div>

      <Reveal>
        <SectionTag label="Research · Engineering · Conversation" />
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-8 max-w-4xl text-balance text-center font-serif text-[clamp(48px,7vw,112px)] leading-[1] tracking-tight font-light text-[var(--color-fg)]">
          A question worth{" "}
          <span className="block font-serif-italic text-[var(--color-accent)]">
            exploring.
          </span>
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-8 max-w-xl text-center text-base leading-relaxed text-[var(--color-fg-dim)]">
          Open to thoughtful correspondence, research exchange, authorized security work,
          and engineering collaborations where the problem is worth investigating.
        </p>
      </Reveal>
      <Reveal delay={0.3}>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact" variant="primary" icon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />}>
            Get in touch
          </Button>
          <Button href={`mailto:${site.email}`} variant="outline" icon={<Mail className="h-3.5 w-3.5" strokeWidth={1.5} />} external>
            {site.email}
          </Button>
        </div>
      </Reveal>

      {Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute h-1 w-1 rounded-full bg-[var(--color-accent)]"
          style={{
            left: `${(i * 73) % 100}%`,
            bottom: `${10 + ((i * 41) % 60)}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 4 + (i % 4),
            repeat: Infinity,
            ease: [0.65, 0, 0.35, 1],
            delay: i * 0.3,
          }}
        />
      ))}
    </section>
  );
}
