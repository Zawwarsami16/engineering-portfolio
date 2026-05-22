"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { film } from "@/lib/film";

export function FilmPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      setCurrentTime(v.currentTime);
      const idx = film.chapters.findIndex(
        (c) => v.currentTime >= c.start && v.currentTime < c.end,
      );
      if (idx >= 0) setActiveChapter(idx);
    };
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const seekTo = (s: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = s;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div
        className="group relative aspect-video w-full overflow-hidden rounded-sm border border-[var(--color-line)] bg-black cursor-pointer shadow-[0_30px_80px_-30px_rgba(220,38,38,0.35)]"
        onClick={toggle}
        data-cursor="card"
        data-cursor-label={isPlaying ? "Pause" : "Play"}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={film.filmUrl}
          poster={film.posterUrl}
          preload="metadata"
          playsInline
          controls
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
        {!isPlaying && currentTime === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 via-black/30 to-black/40"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[var(--color-line)] bg-black/40 backdrop-blur-sm transition-transform group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-1 h-10 w-10 text-[var(--color-accent)]"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="mt-6 font-mono text-[10px] tracking-[0.4em] uppercase text-white/70">
              Play · {film.durationSeconds}s · silent
            </p>
          </motion.div>
        )}
      </div>

      <ol className="grid grid-cols-1 gap-2 sm:grid-cols-4">
        {film.chapters.map((c, i) => {
          const active = i === activeChapter && (isPlaying || currentTime > 0);
          return (
            <li key={c.slug}>
              <button
                type="button"
                onClick={() => seekTo(c.start + 0.1)}
                className={`group/chap w-full text-left rounded-sm border px-3 py-3 transition-colors ${
                  active
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5"
                    : "border-[var(--color-line)] hover:border-[var(--color-fg-dim)]"
                }`}
                aria-current={active ? "true" : undefined}
              >
                <span className="block font-mono text-[9px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
                  Ch · {String(c.number).padStart(2, "0")}
                </span>
                <span
                  className={`mt-1 block font-serif text-[15px] leading-tight ${
                    active ? "text-[var(--color-accent)]" : "text-[var(--color-fg)]"
                  }`}
                >
                  {c.title}
                </span>
                <span className="mt-1 block font-mono text-[9px] tracking-[0.2em] text-[var(--color-muted)]">
                  {Math.floor(c.start).toString().padStart(2, "0")}:
                  {Math.floor((c.start % 1) * 60)
                    .toString()
                    .padStart(2, "0")}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 grid gap-12 lg:grid-cols-2">
        {film.chapters.map((c) => (
          <article
            key={c.slug}
            className="border-t border-[var(--color-line)] pt-6"
          >
            <header className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] tracking-[0.4em] text-[var(--color-muted)] uppercase">
                Ch · {String(c.number).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-[22px] leading-tight tracking-tight font-light text-[var(--color-fg)]">
                {c.title}
              </h3>
            </header>
            <p className="mt-2 font-serif italic text-[14px] text-[var(--color-accent)]">
              {c.subtitle}
            </p>
            <p className="mt-3 text-[14px] text-[var(--color-muted)] leading-relaxed">
              {c.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
