"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  /** Inline object-position. Leave unset to control via Tailwind classes (e.g. responsive). */
  position?: string;
  /** Optional opacity, for subtle background loops. */
  opacity?: number;
  /** Cache hint for the video element. */
  preload?: "auto" | "metadata" | "none";
};

export function VideoLoop({
  src,
  poster,
  className,
  position,
  opacity = 1,
  preload = "metadata",
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    let inView = true;
    const syncPlayback = () => {
      if (reduced || document.hidden || !inView) {
        v.pause();
      } else {
        v.muted = true;
        v.play().catch(() => {
          // Keep the poster visible if the device blocks muted autoplay.
        });
      }
    };
    const onLoaded = () => {
      setReady(true);
      syncPlayback();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.01 },
    );
    observer.observe(v);
    v.addEventListener("loadeddata", onLoaded);
    document.addEventListener("visibilitychange", syncPlayback);
    if (v.readyState >= 2) onLoaded();
    else if (reduced) v.pause();
    return () => {
      observer.disconnect();
      v.removeEventListener("loadeddata", onLoaded);
      document.removeEventListener("visibilitychange", syncPlayback);
      v.pause();
    };
  }, [reduced]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={!reduced}
      preload={preload}
      aria-hidden
      className={cn(
        "h-full w-full object-cover transition-opacity duration-700",
        // When a poster is set the element is never blank — keep it visible
        // immediately so the poster shows while metadata is still loading.
        ready || poster ? "opacity-100" : "opacity-0",
        className,
      )}
      style={position ? { objectPosition: position, opacity } : { opacity }}
    />
  );
}
