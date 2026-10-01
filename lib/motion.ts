import type { Transition, Variants } from "framer-motion";

export const easeOutExpo: Transition["ease"] = [0.16, 1, 0.3, 1];
export const easeInOutCubic: Transition["ease"] = [0.65, 0, 0.35, 1];
export const easeOutQuart: Transition["ease"] = [0.25, 1, 0.5, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easeOutExpo } },
};

export const stagger = (delayChildren = 0.05, staggerChildren = 0.06): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});

export const splitChar: Variants = {
  hidden: { opacity: 0, y: "0.6em", rotate: 4 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};

export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.4, ease: easeInOutCubic },
  },
};

export const wipe = {
  initial: { scaleY: 0, transformOrigin: "bottom" },
  animate: {
    scaleY: [0, 1, 1, 0],
    transformOrigin: ["bottom", "bottom", "top", "top"],
    transition: { duration: 1.2, ease: easeInOutCubic, times: [0, 0.45, 0.55, 1] },
  },
};
