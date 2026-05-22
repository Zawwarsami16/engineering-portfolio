import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { film } from "@/lib/film";
import { Reveal } from "@/components/ui/Reveal";
import { FilmPlayer } from "@/components/film/FilmPlayer";

export const metadata: Metadata = pageMetadata(
  "The Anteroom Film",
  "A short cinematic POV portfolio film by Zawwar Sami. One continuous take, four chapters, about half a minute.",
);

export default function FilmPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-[var(--color-line)] pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(220,38,38,0.22) 0%, transparent 65%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-[1100px] px-6 lg:px-12 text-center">
          <span className="font-mono text-[10px] tracking-[0.4em] text-[var(--color-muted)] uppercase">
            The Anteroom Film
          </span>
          <h1 className="mt-8 font-serif text-[clamp(40px,6.5vw,88px)] leading-[1.02] tracking-tight font-light text-[var(--color-fg)]">
            One continuous take.<br />
            <span className="font-serif-italic text-[var(--color-accent)]">
              Half a minute.
            </span>
          </h1>
          <p className="mt-10 mx-auto max-w-[60ch] text-balance text-[var(--color-muted)] leading-relaxed">
            {film.description}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1100px] px-6 pt-12 pb-20 lg:px-12 lg:pt-16 lg:pb-28">
        <Reveal>
          <FilmPlayer />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-28 border-t border-[var(--color-line)] pt-16 text-center">
            <p className="font-serif italic text-[clamp(28px,3.4vw,44px)] leading-[1.2] text-[var(--color-fg)]">
              {film.endcard.line1}
            </p>
            <p className="mt-2 font-serif italic text-[clamp(28px,3.4vw,44px)] leading-[1.2] text-[var(--color-fg)]">
              {film.endcard.line2}
            </p>
            <p className="mt-6 font-mono text-[11px] tracking-[0.4em] uppercase text-[var(--color-accent)]">
              {film.endcard.line3}
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
