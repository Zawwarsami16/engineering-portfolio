"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Scene } from "@/lib/film";

export function SceneCard({ scene }: { scene: Scene }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <article className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
      <header className="flex flex-col gap-3">
        <span className="font-mono text-[10px] tracking-[0.4em] text-[var(--color-muted)] uppercase">
          Scene {String(scene.number).padStart(2, "0")} · {scene.durationLabel}
        </span>
        <h2 className="font-serif text-[clamp(28px,3.4vw,44px)] leading-[1.05] tracking-tight font-light text-[var(--color-fg)]">
          {scene.title}
        </h2>
        <p className="font-serif italic text-[15px] text-[var(--color-accent)]">
          {scene.subtitle}
        </p>
        <p className="mt-4 max-w-[44ch] text-[var(--color-muted)] leading-relaxed text-[15px]">
          {scene.description}
        </p>
      </header>

      <div
        className="group relative aspect-video w-full overflow-hidden rounded-sm border border-[var(--color-line)] bg-black cursor-pointer"
        onClick={toggle}
        data-cursor="card"
        data-cursor-label={isPlaying ? "Pause" : "Play"}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={scene.videoUrl}
          poster={scene.posterUrl}
          preload="metadata"
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 via-transparent to-black/30"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[var(--color-line)] bg-black/40 backdrop-blur-sm transition-transform group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-1 h-8 w-8 text-[var(--color-accent)]"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </motion.div>
        )}
      </div>
    </article>
  );
}
