import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Tag } from "@/components/ui/Pill";

export const metadata: Metadata = pageMetadata(
  "About",
  "About Zawwar Sami — engineer and builder of ZAI. Founder of Anteroom Studio.",
);

const facts: { label: string; value: string }[] = [
  { label: "Based in", value: "Canada" },
  { label: "Studio", value: "Anteroom · founded 2019" },
  { label: "Building", value: "ZAI" },
  { label: "Open to", value: "AI, markets, contract" },
];

const beliefs = [
  {
    title: "Independent thinking over received wisdom",
    body:
      "Most macro and AI work is consensus dressed up as analysis. I'd rather model a thing from first principles, even when the answer is uncomfortable. Especially when.",
  },
  {
    title: "Long memory beats hot takes",
    body:
      "Markets, geopolitics, and AI all reward people who can hold context across decades. Anteroom's tools are designed around that — 1871 to today, not the last 24 hours.",
  },
  {
    title: "Ship in small increments",
    body:
      "Big launches are usually a smell. I'd rather ship a 3-line change every day than a 3,000-line PR every quarter. Reasoning systems work the same way.",
  },
  {
    title: "Build for the long term",
    body:
      "I write the kind of code I would want to inherit. Less cleverness, more honesty. Future-me thanks present-me.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        tag="About"
        title="Engineer.  Builder"
        italic="of ZAI."
        description="I'm Zawwar Sami — engineer, founder of Anteroom Studio (2019), and builder of ZAI. I work on AI systems for macro markets, geopolitics, and the kinds of slow, structural questions that don't fit on a dashboard."
      />

      <section className="mx-auto w-full max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
          {/* Portrait */}
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-md border border-[var(--color-line)]"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-surface)]">
                <Image
                  src="/images/about-portrait.jpg"
                  alt="Portrait — Zawwar Sami, rim-lit in crimson nebula"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                  priority
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(7,7,10,0.0) 35%, rgba(7,7,10,0.40) 78%, rgba(7,7,10,0.85) 100%)",
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-50"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 70% at 70% 30%, rgba(220,38,38,0.35), transparent 70%)",
                  }}
                />
                <div className="absolute right-3 bottom-3 left-3 flex justify-between font-mono text-[9px] tracking-[0.25em] text-[var(--color-fg-dim)] uppercase">
                  <span>Zawwar Sami</span>
                  <span>{new Date().getFullYear()}</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Bio + facts */}
          <div className="space-y-12 lg:col-span-7">
            <Reveal>
              <h2 className="text-balance font-serif text-[clamp(28px,3vw,40px)] leading-[1.2] font-light tracking-tight text-[var(--color-fg)]">
                Anteroom Studio is the room before the room — the quiet space
                where I build the tools, models, and reasoning systems that
                make up ZAI.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-5 text-base leading-relaxed text-[var(--color-fg-dim)]">
                <p>
                  My work sits at the intersection of AI and markets. I build
                  reasoning systems that compress decades of macro and
                  geopolitical signal into something a single operator can
                  actually act on — a terminal, a model, a framework.
                </p>
                <p>
                  Anteroom Studio is where that work lives. Founded in 2019,
                  the studio is the home for ZAI — a long-running project
                  to build an AI that thinks independently about consciousness,
                  markets, and inquiry rather than just answering questions.
                </p>
                <p>
                  Day to day I'm shipping small, useful pieces of that vision:
                  the World Model on 150+ years of data, the Oracle terminal,
                  the Crypto Terminal, and the reasoning frameworks underneath
                  them. Outside the studio I read about cycles, write about
                  consciousness, and occasionally build games for the fun of it.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-4">
                {facts.map((f) => (
                  <li key={f.label} className="bg-[var(--color-bg)] p-5">
                    <span className="block font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
                      {f.label}
                    </span>
                    <span className="mt-2 block font-serif text-xl text-[var(--color-fg)]">
                      {f.value}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="mx-auto w-full max-w-[1440px] px-6 pb-24 lg:px-12 lg:pb-32">
        <Reveal>
          <Tag>Beliefs</Tag>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-balance font-serif text-[clamp(36px,5vw,68px)] leading-[1.05] font-light tracking-tight text-[var(--color-fg)]">
            How I <span className="font-serif-italic text-[var(--color-accent)]">approach</span> the work
          </h2>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-2">
          {beliefs.map((b) => (
            <li
              key={b.title}
              className="group bg-[var(--color-bg)] p-8 transition-colors hover:bg-[var(--color-surface)]"
            >
              <div className="flex items-start gap-4">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                <div>
                  <h3 className="font-serif text-2xl text-[var(--color-fg)]">{b.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-dim)]">
                    {b.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <ProcessTimeline />
      <FinalCTA />
    </>
  );
}
