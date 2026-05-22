"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Pattern = "rings" | "grid" | "wave";

export function CaseHeroPattern({
  pattern,
  image,
  alt,
}: {
  pattern: Pattern;
  image?: string;
  alt?: string;
}) {
  if (image) return <ImageHero src={image} alt={alt || ""} pattern={pattern} />;
  if (pattern === "grid") return <GridPattern />;
  if (pattern === "wave") return <WavePattern />;
  return <RingsPattern />;
}

function ImageHero({
  src,
  alt,
  pattern,
}: {
  src: string;
  alt: string;
  pattern: Pattern;
}) {
  // Photographic hero with cinematic overlay so existing typography
  // still reads. The SVG pattern is layered on top at very low alpha
  // to keep some kinship with the rest of the system.
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ scale: 1.06, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 800px"
          className="object-cover"
          priority={false}
        />
      </motion.div>
      {/* deep tint to keep text legible regardless of source brightness */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,7,10,0.10) 0%, rgba(7,7,10,0.55) 78%, rgba(7,7,10,0.92) 100%), radial-gradient(ellipse 80% 60% at 20% 50%, rgba(7,7,10,0.45) 0%, transparent 70%)",
        }}
      />
      {/* subtle accent wash so each card still feels related to the system */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-soft-light opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 70% 30%, rgba(220,38,38,0.30), transparent 65%)",
        }}
      />
      {/* corner accent — same vocabulary as the rest of the site */}
      <svg
        aria-hidden
        viewBox="0 0 22 22"
        className="absolute bottom-3 right-3 h-3.5 w-3.5 text-[var(--color-accent)] opacity-60"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M0 8V0h8" />
        <circle cx="3" cy="3" r="1" fill="currentColor" />
      </svg>
      {/* faint motion of the underlying SVG pattern, alpha low */}
      <div className="absolute inset-0 opacity-[0.12] mix-blend-screen">
        {pattern === "rings" ? <RingsPattern /> : pattern === "grid" ? <GridPattern /> : <WavePattern />}
      </div>
    </div>
  );
}

function RingsPattern() {
  return (
    <svg
      viewBox="0 0 600 400"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full text-[var(--color-accent)]"
      aria-hidden
    >
      <defs>
        <radialGradient id="rg" cx="60%" cy="50%" r="55%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
          <stop offset="60%" stopColor="currentColor" stopOpacity="0.06" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill="url(#rg)" />
      {[40, 80, 130, 190, 260].map((r, i) => (
        <motion.circle
          key={r}
          cx="380"
          cy="200"
          r={r}
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          opacity={0.6 - i * 0.08}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      <circle cx="380" cy="200" r="6" fill="currentColor" />
    </svg>
  );
}

function GridPattern() {
  return (
    <svg
      viewBox="0 0 600 400"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full text-[var(--color-accent)]"
      aria-hidden
    >
      <defs>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        </pattern>
        <radialGradient id="gridGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="60%" stopColor="currentColor" stopOpacity="0.05" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill="url(#grid)" />
      <rect width="600" height="400" fill="url(#gridGlow)" />
    </svg>
  );
}

function WavePattern() {
  return (
    <svg
      viewBox="0 0 600 400"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full text-[var(--color-accent)]"
      aria-hidden
    >
      <defs>
        <radialGradient id="wg" cx="50%" cy="100%" r="80%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
          <stop offset="60%" stopColor="currentColor" stopOpacity="0.05" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill="url(#wg)" />
      {[140, 180, 220, 260, 300].map((y, i) => (
        <motion.path
          key={y}
          d={`M -50 ${y} Q 150 ${y - 30} 300 ${y} T 650 ${y}`}
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          opacity={0.5 - i * 0.07}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: i * 0.08 }}
        />
      ))}
    </svg>
  );
}
