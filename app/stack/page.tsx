import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Pill";
import { TechIcon } from "@/components/ui/TechIcon";
import { stack, philosophy } from "./_data";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = pageMetadata(
  "Stack",
  "The tools and technologies Zawwar Sami uses for AI research, software engineering, and open-source systems.",
);

const levelLabel: Record<"daily" | "comfortable" | "shipping", string> = {
  daily: "Daily driver",
  comfortable: "Comfortable",
  shipping: "Shipping",
};

export default function StackPage() {
  return (
    <>
      <PageHero
        tag="Stack"
        title="Tools I reach"
        italic="for, in order."
        description="Tools I use to research, build, test, and maintain systems. The point is what they make possible, not how long the list is."
      />

      <section className="mx-auto w-full max-w-[1440px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-line)] lg:grid-cols-12">
          {stack.map((cat, i) => (
            <Reveal
              key={cat.id}
              delay={i * 0.05}
              className={[
                "bg-[var(--color-bg)] p-8 lg:p-12",
                cat.size === "wide" ? "lg:col-span-7" : "",
                cat.size === "tall" ? "lg:col-span-5 lg:row-span-2" : "",
                cat.size === "sq" ? "lg:col-span-7" : "",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <Tag>{`0${i + 1}`}</Tag>
                <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
                  {cat.items.length} tools
                </span>
              </div>
              <h2 className="mt-6 font-serif text-[clamp(36px,4vw,56px)] leading-[1.05] font-light tracking-tight text-[var(--color-fg)]">
                {cat.title}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--color-fg-dim)]">
                {cat.blurb}
              </p>

              <ul className="mt-10 flex flex-col gap-4">
                {cat.items.map((it) => (
                  <li
                    key={it.name}
                    className="group flex items-start gap-5 border-t border-[var(--color-line)] pt-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-[var(--color-line)] bg-[var(--color-bg-soft)] text-[var(--color-accent)] transition-colors group-hover:border-[var(--color-accent)]/40">
                      <TechIcon name={it.icon} className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-serif text-xl text-[var(--color-fg)]">{it.name}</h3>
                        <span className="font-mono text-[9px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
                          {levelLabel[it.level]}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--color-fg-dim)]">
                        {it.rationale}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="mx-auto w-full max-w-[1440px] px-6 pb-24 lg:px-12 lg:pb-32">
        <Reveal>
          <Tag>Philosophy</Tag>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-3xl text-balance font-serif text-[clamp(36px,5vw,72px)] leading-[1.05] font-light tracking-tight text-[var(--color-fg)]">
            How I <span className="font-serif-italic text-[var(--color-accent)]">choose</span> tools
          </h2>
        </Reveal>
        <ul className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
          {philosophy.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="border-t border-[var(--color-line)] pt-6">
                <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-accent)] uppercase">
                  {String(i + 1).padStart(2, "0")} / 03
                </span>
                <h3 className="mt-4 font-serif text-2xl text-[var(--color-fg)]">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-dim)]">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <FinalCTA />
    </>
  );
}
