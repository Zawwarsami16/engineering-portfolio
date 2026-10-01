"use client";

import { motion, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useMouse } from "./MouseProvider";
import { useIsTouch } from "@/hooks/useIsTouch";

type CursorState = "default" | "hover" | "text" | "card" | "image" | "external";

export function Cursor() {
  const { smoothX, smoothY } = useMouse();
  const isTouch = useIsTouch();
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const tx = useTransform(smoothX, (v) => v - 32);
  const ty = useTransform(smoothY, (v) => v - 32);

  useEffect(() => {
    setMounted(true);
    if (isTouch) {
      document.body.classList.remove("has-custom-cursor");
      return;
    }
    document.body.classList.add("has-custom-cursor");

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;

      const card = t.closest<HTMLElement>("[data-cursor='card']");
      if (card) {
        setState("card");
        setLabel(card.dataset.cursorLabel ?? "Open");
        return;
      }
      const img = t.closest<HTMLElement>("[data-cursor='image']");
      if (img) {
        setState("image");
        setLabel(img.dataset.cursorLabel ?? "View");
        return;
      }
      const ext = t.closest<HTMLElement>("[data-cursor='external']");
      if (ext) {
        setState("external");
        setLabel(ext.dataset.cursorLabel ?? "Open ↗");
        return;
      }
      if (t.closest("a, button, [data-cursor='hover'], [role='button']")) {
        setState("hover");
        setLabel(null);
        return;
      }
      if (t.closest("input, textarea, [contenteditable='true']")) {
        setState("text");
        setLabel(null);
        return;
      }
      setState("default");
      setLabel(null);
    };
    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    setVisible(true);
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [isTouch]);

  if (!mounted || isTouch) return null;

  const isLabeled = state === "card" || state === "image" || state === "external";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 custom-cursor z-[100] h-16 w-16 will-change-transform"
      style={{ x: tx, y: ty }}
      animate={{ opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="relative flex h-full w-full items-center justify-center rounded-full"
        animate={{
          scale:
            state === "card"
              ? 1.2
              : state === "image"
                ? 1.1
                : state === "external"
                  ? 1.05
                  : state === "hover"
                    ? 0.6
                    : state === "text"
                      ? 0.18
                      : 0.38,
          backgroundColor: isLabeled
            ? "rgba(220, 38, 38, 0.95)"
            : state === "hover"
              ? "rgba(220, 38, 38, 0.18)"
              : "rgba(220, 38, 38, 0)",
          borderColor: isLabeled
            ? "rgba(220, 38, 38, 1)"
            : state === "hover"
              ? "rgba(220, 38, 38, 0.95)"
              : "rgba(245, 241, 234, 0.55)",
          borderWidth: isLabeled ? 0 : 1.4,
        }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        style={{ borderStyle: "solid" }}
      >
        {/* Centre dot when no label */}
        {!isLabeled && (
          <motion.span
            className="absolute h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
            animate={{
              scale: state === "default" ? 1 : 0,
              opacity: state === "default" ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
          />
        )}
        {/* Label inside the magnified bubble */}
        {isLabeled && label && (
          <motion.span
            className="font-mono text-[8.5px] font-medium tracking-[0.18em] text-[var(--color-bg)] uppercase"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
