import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Tag } from "@/components/ui/Pill";

export const metadata: Metadata = pageMetadata(
  "About",
  "About Zawwar Sami — independent researcher and engineer working across philosophy, artificial intelligence, and cybersecurity. Builder of ZAI and ZAI Memory Hub.",
);

const facts: { label: string; value: string }[] = [
  { label: "Research", value: "Philosophy & AI" },
  { label: "Systems", value: "ZAI" },
  { label: "Security", value: "HTB · Guru" },
  { label: "Based in", value: "Canada" },
];

const beliefs = [
  {
    title: "Question the premise",
    body:
      "Before I build something or write about it, I want to know which assumption is doing the work. Sometimes that's the whole problem.",
  },
  {
    title: "Show the trail",
    body:
      "A paper should say what it argues. A system should show what it does. I keep sources, revisions, and technical notes so those two things don't get blurred.",
  },
  {
    title: "Respect the boundaries",
    body:
      "A model is not automatically an agent. A result in a lab is not a finding about the real world. I try to be precise about what the evidence can support.",
  },
  {
    title: "Keep testing",
    body:
      "Questions change when you put them in front of code, data, or an adversarial test. I'd rather revise an idea than defend a version that no longer holds.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        tag="About"
        title="Researcher."
        italic="Engineer. Writer."
        description="I'm Zawwar Sami, an independent researcher and engineer in Canada. My work crosses philosophy, artificial intelligence, and cybersecurity. I publish research, build the systems behind ZAI, and test ideas beyond the page."
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
              <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-bg)]">
                <Image
                  src="/images/zawwar-portrait.avif"
                  alt="Portrait of Zawwar Sami"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-contain object-bottom brightness-[0.88] contrast-[1.05] saturate-[0.90]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(7,7,10,0) 50%, rgba(7,7,10,0.15) 76%, rgba(7,7,10,0.72) 100%)",
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-50"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 70% at 70% 30%, rgba(133,29,43,0.16), transparent 70%)",
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
                My work crosses philosophy and engineering. I don't see a
                good reason to keep the two separate.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-5 text-base leading-relaxed text-[var(--color-fg-dim)]">
                <p>
                  I work independently across philosophy, AI, and computing.
                  I'm interested in consciousness, personhood, soul-body unity,
                  and what survives when an AI's model or context changes. I've
                  begun making that research public through{" "}
                  <Link
                    href="/writing"
                    className="underline decoration-[var(--color-line)] underline-offset-4 transition-colors hover:text-[var(--color-fg)] hover:decoration-[var(--color-accent)]"
                  >
                    preprints and research papers
                  </Link>{" "}
                  recorded on Zenodo and PhilPapers. They're arguments I'm willing
                  to put under scrutiny, not final answers.
                </p>
                <p>
                  I've spent years building alongside the writing. ZAI is my
                  long-running personal AI project, and{" "}
                  <a
                    href="https://github.com/Zawwarsami16/zai-memory-hub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-[var(--color-line)] underline-offset-4 transition-colors hover:text-[var(--color-fg)] hover:decoration-[var(--color-accent)]"
                  >
                    ZAI Memory Hub
                  </a>{" "}
                  carries structured memory across assistants and sessions.
                  I've also worked on open-source tools such as zhub and Pocket,
                  and built systems for market and geopolitical research.
                  Different problems, but the same habit: build enough to
                  discover where an idea holds and where it breaks.
                </p>
                <p>
                  Security is part of that practice too. I've reached Guru rank
                  on{" "}
                  <a
                    href="https://app.hackthebox.com/public/users/2469522"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-[var(--color-line)] underline-offset-4 transition-colors hover:text-[var(--color-fg)] hover:decoration-[var(--color-accent)]"
                  >
                    Hack The Box
                  </a>{" "}
                  and keep public CTF writeups and methodology in my{" "}
                  <a
                    href="https://github.com/Zawwarsami16/htb-progress"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-[var(--color-line)] underline-offset-4 transition-colors hover:text-[var(--color-fg)] hover:decoration-[var(--color-accent)]"
                  >
                    security notebook
                  </a>.
                  Anteroom Studio is where the projects live. The writing,
                  experiments, and shipped tools each stand on their own work.
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
