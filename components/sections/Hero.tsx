"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { site } from "@/lib/site";
import { CoordinatesHUD } from "@/components/layout/CoordinatesHUD";
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.09]);
  return (
    <section ref={ref} className="home-hero" id="hero">
      <motion.div
        className="home-hero-visual"
        style={reduced ? undefined : { y, scale }}
        aria-hidden="true"
      >
        <Image src="/images/observatory.webp" alt="" fill priority sizes="100vw" />
      </motion.div>
      <div className="hero-grid" aria-hidden="true" />
      <div className="shell home-hero-content">
        <div className="hero-overline">
          <span className="eyebrow">
            <span className="status-dot" /> {site.role}
          </span>
          <span className="eyebrow hero-edition">Anteroom Studio / 001</span>
        </div>
        <motion.div initial={false} animate={{ opacity: 1 }} className="hero-title-block">
          <h1>
            <span>Building</span>
            <span>thoughtful</span>
            <em>digital systems.</em>
          </h1>
          <p>
            Engineer and builder of ZAI. Founder of Anteroom Studio, where I build AI tools for
            markets, geopolitics, and the macro forces that shape the world.
          </p>
          <div className="hero-actions">
            <Link href="/work" className="pill-link primary">
              Explore the work <ArrowUpRight size={17} />
            </Link>
            <Link href="/writing" className="text-link">
              Writing & research <ArrowUpRight size={17} />
            </Link>
          </div>
        </motion.div>
        <Link href="/film" className="hero-film">
          <span>
            <Play size={15} fill="currentColor" />
          </span>
          <div>
            The Anteroom Film<small>56 seconds / Enter the world</small>
          </div>
        </Link>
        <div className="hero-bottom">
          <a href="#inquiry" className="scroll-invitation">
            <ArrowDown size={16} />
            <span>Scroll to explore</span>
          </a>
          <CoordinatesHUD />
          <span className="hero-availability">
            <span className="status-dot" /> {site.status.label}
          </span>
        </div>
      </div>
    </section>
  );
}
