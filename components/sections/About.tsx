"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/Pill";
import { MagneticHeading } from "@/components/ui/MagneticHeading";
import { fadeUp, stagger } from "@/lib/motion";
import { motion } from "framer-motion";

export function About() {
  return (
    <section
      id="about"
      className="relative mx-auto w-full max-w-[1440px] px-6 py-28 lg:px-12 lg:py-40"
    >
      <Reveal>
        <SectionTag label="About me" />
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="text-balance font-serif text-[clamp(36px,5vw,80px)] leading-[1.05] tracking-tight font-light text-[var(--color-fg)] lg:col-span-7"
        >
          I build with{" "}
          <MagneticHeading text="clarity" italic className="text-[var(--color-accent)]" />,
          <br className="hidden md:block" /> engineer with{" "}
          <MagneticHeading text="purpose" italic className="text-[var(--color-accent)]" />,
          <br className="hidden md:block" /> and ship with{" "}
          <MagneticHeading text="care" italic className="text-[var(--color-accent)]" />.
        </motion.h2>

        <motion.div
          variants={stagger(0.1, 0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6 text-base leading-relaxed text-[var(--color-fg-dim)] lg:col-span-5"
        >
          <motion.p variants={fadeUp}>
            I work independently across philosophy, artificial
            intelligence, and cybersecurity. Some questions become papers;
            others become systems I can actually test.
          </motion.p>
          <motion.p variants={fadeUp}>
            <Link
              href="/writing/who-is-zai"
              className="underline decoration-[var(--color-line)] underline-offset-4 transition-colors hover:text-[var(--color-fg)] hover:decoration-[var(--color-accent)]"
            >
              ZAI (Zawwar Autonomous Intelligence)
            </Link>{" "}
            and ZAI Memory Hub are part of that work. Anteroom Studio
            gives my research and engineering projects a home, from personal
            AI and open-source infrastructure to security and market tools.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
