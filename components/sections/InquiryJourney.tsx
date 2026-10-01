"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
const chapters = [
  {
    number: "01",
    title: "Observe.",
    label: "The question",
    text: "The shape of the present moment. Autonomous intelligence, consciousness, and the traditions that asked these questions long before us.",
    href: "/writing",
    link: "Explore the writing",
  },
  {
    number: "02",
    title: "Connect.",
    label: "The inquiry",
    text: "Independent thinking, long memory and first principles. Looking for the structure beneath the signal.",
    href: "/about",
    link: "Behind the work",
  },
  {
    number: "03",
    title: "Build.",
    label: "The practice",
    text: "Turn inquiry into something useful. Reasoning systems, AI tools and the small, working pieces of ZAI.",
    href: "/work",
    link: "See the systems",
  },
];
function Chapter({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const c = chapters[index];
  const a = index / 3;
  const opacity = useTransform(progress, [a - 0.09, a + 0.03, a + 0.23, a + 0.33], [0, 1, 1, 0]);
  const y = useTransform(progress, [a - 0.09, a + 0.03, a + 0.23, a + 0.33], [35, 0, 0, -35]);
  const visibility = useTransform(opacity, (value) => (value > 0.4 ? "visible" : "hidden"));
  return (
    <motion.div className="journey-chapter" style={{ opacity, y, visibility }}>
      <span className="eyebrow">
        {c.number} / {c.label}
      </span>
      <h2>{c.title}</h2>
      <p>{c.text}</p>
      <Link href={c.href} className="text-link">
        {c.link} <ArrowUpRight size={16} />
      </Link>
    </motion.div>
  );
}
export function InquiryJourney() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1.1]);
  return (
    <section
      ref={ref}
      id="inquiry"
      className={`inquiry-journey${reduced ? "journey-reduced" : ""}`}
    >
      <div className="journey-sticky shell">
        <div className="journey-top">
          <span className="eyebrow">Between code & consciousness</span>
          <span className="eyebrow">An ongoing inquiry</span>
        </div>
        <div className="journey-scene" aria-hidden="true">
          <motion.div className="orbital-sculpture" style={reduced ? undefined : { rotate, scale }}>
            <div className="orbital-core" />
            <i />
            <i />
            <i />
            <b />
          </motion.div>
          <span className="orbital-caption">Intelligence / Consciousness / Inquiry</span>
        </div>
        <div className="journey-desktop">
          {chapters.map((c, i) => (
            <Chapter key={c.number} index={i} progress={scrollYProgress} />
          ))}
        </div>
        <div className="journey-mobile">
          {chapters.map((c) => (
            <div key={c.number}>
              <span className="eyebrow">
                {c.number} / {c.label}
              </span>
              <h2>{c.title}</h2>
              <p>{c.text}</p>
              <Link href={c.href} className="text-link">
                {c.link} <ArrowUpRight size={16} />
              </Link>
            </div>
          ))}
        </div>
        <div className="journey-track" aria-hidden="true">
          <motion.span style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </section>
  );
}
