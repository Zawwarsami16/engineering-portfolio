"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/Pill";
import { StatusBar } from "@/components/layout/StatusBar";
import { CoordinatesHUD } from "@/components/layout/CoordinatesHUD";
import { VideoLoop } from "@/components/ui/VideoLoop";
import { ParallaxLayers } from "@/components/hero/ParallaxLayers";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="hero"
      className="video-hero relative isolate w-full overflow-hidden pt-24 pb-20 lg:flex lg:min-h-[100svh] lg:flex-col lg:pt-40"
    >
      {/* Mobile: in-flow orb frame at the top.
          Desktop: full-bleed overlay anchored right. */}
      <div
        aria-hidden
        className="relative mx-auto aspect-[4/3] w-full max-w-[640px] overflow-hidden sm:aspect-[16/10] lg:absolute lg:inset-0 lg:left-[22%] lg:z-0 lg:mx-0 lg:aspect-auto lg:h-auto lg:max-w-none"
        style={{ willChange: "transform" }}
      >
        <VideoLoop
          src="/video/hero.mp4"
          poster="/images/hero-poster.jpg"
          className="h-full w-full [object-position:50%_30%] lg:[object-position:right_center]"
          preload="auto"
        />

        {/* Mobile-only fade so the orb melts into the bg before the headline starts. */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 lg:hidden"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(7,7,10,0.55) 55%, var(--color-bg) 100%)",
          }}
        />
        {/* Side fades on mobile so the orb is framed cleanly. */}
        <div
          className="absolute inset-y-0 left-0 w-12 lg:hidden"
          style={{
            background: "linear-gradient(to right, var(--color-bg) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-12 lg:hidden"
          style={{
            background: "linear-gradient(to left, var(--color-bg) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Desktop-only background system: corner vignette + left reading gradient + parallax. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 130% 110% at 70% 45%, transparent 0%, transparent 60%, var(--color-bg) 96%)",
          }}
        />
        <div
          className="absolute inset-y-0 left-0 lg:w-1/2"
          style={{
            background:
              "linear-gradient(to right, var(--color-bg) 0%, rgba(7,7,10,0.85) 38%, rgba(7,7,10,0.35) 65%, transparent 100%)",
          }}
        />
        <ParallaxLayers />
      </div>

      <motion.div className="relative z-10 mx-auto mt-10 flex w-full max-w-[1440px] flex-col px-6 sm:mt-14 lg:mt-0 lg:flex-1 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-[var(--color-accent)] uppercase"
        >
          <span aria-hidden>{"//"}</span>
          <span>{site.role}</span>
          <span aria-hidden>{"//"}</span>
        </motion.div>

        <h1 className="font-serif text-[clamp(40px,11vw,140px)] leading-[0.96] font-light tracking-tight text-balance text-[var(--color-fg)] sm:text-[clamp(56px,9vw,140px)]">
          <span className="block">Researching</span>
          <span className="block">what matters.</span>
          <span className="font-serif-italic block text-[var(--color-accent)]">
            Building what works.
          </span>
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="max-w-md text-base leading-relaxed text-pretty text-[var(--color-fg-dim)] lg:col-span-5"
          >
            I'm Zawwar Sami — an independent researcher and engineer working across philosophy,
            artificial intelligence, and cybersecurity. I publish research, build systems,
            and test ideas beyond the page.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="flex flex-wrap items-center gap-4 lg:col-span-7 lg:items-end"
          >
            <Button
              href="/writing"
              variant="primary"
              icon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />}
            >
              Explore Research
            </Button>
            <Button
              href="/work"
              variant="ghost"
              icon={<ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />}
            >
              View Work
            </Button>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 items-end gap-6 lg:mt-auto lg:grid-cols-2 lg:pt-12">
          <StatusPill label={site.status.label} />

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <StatusBar />
            <CoordinatesHUD />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] text-[var(--color-muted)] uppercase">
          Scroll
        </span>
        <motion.span
          className="block h-8 w-px bg-gradient-to-b from-[var(--color-accent)] to-transparent"
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
