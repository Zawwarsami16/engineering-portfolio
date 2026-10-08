"use client";

import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LenisContext } from "@/lib/lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouch } from "@/hooks/useIsTouch";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reduced = useReducedMotion();
  const isTouch = useIsTouch();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduced || isTouch || pathname === "/research") {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      setLenis(null);
      return;
    }

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const instance = new Lenis({
      duration: 0.9,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      syncTouch: false,
      autoRaf: false,
      anchors: true,
    });
    lenisRef.current = instance;
    setLenis(instance);

    let frame = 0;
    const raf = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [reduced, isTouch, pathname]);

  useEffect(() => {
    if (window.location.hash) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
