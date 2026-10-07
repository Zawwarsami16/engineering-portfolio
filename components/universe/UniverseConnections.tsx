"use client";

import { useEffect, useId, useRef, useState, type RefObject } from "react";
import s from "./universe.module.css";

type Point = { x: number; y: number };
type Branch = { letter: string; start: Point; end: Point; spread: number; detail: boolean };
type Layout = { width: number; height: number; branches: Branch[] };

/** Measure the HTML anchors, so every beam stays attached at every breakpoint. */
export function UniverseConnections({ stage, selected, map }: {
  stage: RefObject<HTMLDivElement | null>; selected: string; map: boolean;
}) {
  const [layout, setLayout] = useState<Layout | null>(null);
  const signature = useRef("");
  const id = useId().replace(/:/g, "");
  useEffect(() => {
    const host = stage.current;
    if (!host) return;
    let frame = 0;
    let disposed = false;
    const measure = () => {
      if (disposed) return;
      const box = host.getBoundingClientRect();
      const compact = window.matchMedia("(max-width: 700px)").matches;
      const branches: Branch[] = [];
      host.querySelectorAll<HTMLElement>("[data-world-source]").forEach((source) => {
        const letter = source.dataset.worldSource!;
        const target = host.querySelector<HTMLElement>(`[data-world-label="${letter}"]`);
        const src = source.getBoundingClientRect();
        const radius = compact ? 15.5 : 21;
        const start = { x: src.left + src.width / 2 - box.left, y: src.top + src.height / 2 + radius - box.top };
        if (target && target.getClientRects().length) {
          const end = target.getBoundingClientRect();
          branches.push({ letter, start, end: { x: end.left + end.width / 2 - box.left, y: end.top - box.top - 15 }, spread: Math.min(end.width * .58, compact ? 48 : 125), detail: false });
        } else if (!map && letter === selected) {
          const intro = host.querySelector<HTMLElement>("[data-world-intro]");
          if (intro) {
            const end = intro.getBoundingClientRect();
            branches.push({ letter, start, end: { x: Math.max(6, end.left - box.left + 7), y: end.bottom - box.top - 22 }, spread: 61, detail: true });
          }
        }
      });
      const next = { width: box.width, height: box.height, branches };
      const serialized = JSON.stringify(next);
      if (serialized !== signature.current) { signature.current = serialized; setLayout(next); }
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    observer.observe(host);
    host.querySelectorAll("[data-world-source], [data-world-label], [data-world-intro]").forEach(el => observer.observe(el));
    document.fonts.ready.then(schedule);
    window.addEventListener("resize", schedule);
    schedule();
    return () => { disposed = true; cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("resize", schedule); };
  }, [stage, selected, map]);
  if (!layout) return null;
  return <svg className={s.connections} viewBox={`0 0 ${layout.width} ${layout.height}`} aria-hidden="true" fill="none">
    <defs>
      <filter id={`${id}-bloom`} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3" /></filter>
      <filter id={`${id}-soft`} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="1.15" /></filter>
    </defs>
    {layout.branches.map(({ letter, start: a, end: b, spread, detail }) => {
      const length = b.y - a.y;
      const seed = letter.charCodeAt(0);
      const paths = Array.from({ length: detail ? 23 : 31 }, (_, i) => {
        const side = i % 2 ? -1 : 1;
        const reach = (0.19 + ((i * 37 + seed) % 80) / 100) * spread;
        const end = { x: b.x + side * reach, y: a.y + length * (.42 + ((i * 19 + seed) % 55) / 100) };
        const forkY = a.y + length * (.13 + (i % 5) * .037);
        const forkX = a.x + (b.x - a.x) * .25 + side * 3;
        const d = `M${a.x} ${a.y} C${a.x} ${a.y + 20},${forkX} ${forkY},${forkX} ${forkY + 8} C${forkX + side * reach * .1} ${forkY + length * .22},${end.x - side * reach * .18} ${end.y - length * .3},${end.x} ${end.y}`;
        return { d, end, side };
      });
      const trunk = `M${a.x} ${a.y} C${a.x} ${a.y + length * .36},${b.x - 9} ${b.y - length * .35},${b.x} ${b.y}`;
      return <g key={letter} data-connection={letter}>
        {paths.filter((_, i) => i % 4 === 0).map((p, i) => <path key={`b${i}`} d={p.d} stroke="#ff193c" strokeWidth="4" opacity=".6" filter={`url(#${id}-bloom)`} />)}
        {paths.map((p, i) => <g key={i}>
          <path d={p.d} stroke={i % 4 === 0 ? "#ff977f" : "#e92c43"} strokeWidth={i % 4 === 0 ? .9 : .55} opacity={.45 + (i % 4) * .13} />
          {i % 3 === 0 && <path d={`M${p.end.x} ${p.end.y} q${p.side * 9} 7 ${p.side * 11} 20`} stroke="#c73649" strokeWidth=".5" opacity=".65" />}
          {i % 4 === 0 && <g>
            <circle cx={p.end.x} cy={p.end.y} r="5.5" fill="#ff243b" opacity=".48" filter={`url(#${id}-bloom)`} />
            <circle cx={p.end.x} cy={p.end.y} r="1.35" fill="#ffddbf" />
            {i % 8 === 0 && <circle cx={p.end.x} cy={p.end.y} r="6" stroke="#f47467" strokeWidth=".55" opacity=".6" />}
          </g>}
        </g>)}
        <path d={trunk} stroke="#ff5763" strokeWidth="2.5" opacity=".65" filter={`url(#${id}-soft)`} />
        <path d={trunk} stroke="#ffb194" strokeWidth=".8" opacity=".85" />
        <circle cx={a.x} cy={a.y} r="3" fill="#fff0cc" filter={`url(#${id}-soft)`} />
        <circle className={s.traveler} r="1.6" fill="#ffe8ca"><animateMotion dur={`${9 + seed % 5}s`} repeatCount="indefinite" path={trunk} /></circle>
      </g>;
    })}
  </svg>;
}

/** The paper connections use the button centers, including wrapped mobile rows. */
export function PaperConnections({ field, count }: { field: RefObject<HTMLDivElement | null>; count: number }) {
  const [layout, setLayout] = useState<{ width: number; height: number; nodes: Point[] } | null>(null);
  const id = useId().replace(/:/g, "");
  useEffect(() => {
    const host = field.current;
    if (!host) return;
    let frame = 0;
    const update = () => {
      const bounds = host.getBoundingClientRect();
      const nodes = Array.from(host.querySelectorAll<HTMLElement>("[data-paper-node]"), el => {
        const rect = el.getBoundingClientRect();
        return { x: rect.left + rect.width / 2 - bounds.left, y: rect.top + rect.height / 2 - bounds.top };
      });
      setLayout({ width: bounds.width, height: bounds.height, nodes });
    };
    const observer = new ResizeObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); });
    observer.observe(host);
    host.querySelectorAll("[data-paper-node]").forEach(el => observer.observe(el));
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [field, count]);
  if (!layout || !layout.nodes.length) return null;
  const first = layout.nodes[0];
  const last = layout.nodes[layout.nodes.length - 1];
  const amplitude = Math.min(layout.height * .43, 83);
  const start = { x: -35, y: first.y };
  const end = { x: layout.width + 45, y: last.y };
  return <svg className={s.paperConnections} viewBox={`0 0 ${layout.width} ${layout.height}`} fill="none" aria-hidden="true">
    <defs><filter id={id} x="-50%" y="-100%" width="200%" height="300%"><feGaussianBlur stdDeviation="2.7" /></filter></defs>
    {Array.from({ length: 17 }, (_, i) => {
      const offset = (i - 8) / 8 * amplitude;
      const d = `M${start.x} ${start.y} C${first.x - 60} ${first.y},${first.x - 63} ${first.y + offset},${first.x} ${first.y + offset} S${last.x + 40} ${last.y + offset},${end.x} ${end.y}`;
      return <g key={i}>
        {i % 4 === 0 && <path d={d} stroke="#ff243f" strokeWidth="4" opacity=".5" filter={`url(#${id})`} />}
        <path d={d} stroke={i % 3 === 0 ? "#ffaf91" : "#e53248"} strokeWidth={i % 3 === 0 ? .85 : .55} opacity={i % 3 === 0 ? .65 : .5} />
        {i % 3 === 0 && <circle className={s.traveler} r="1.4" fill="#ffdeb7"><animateMotion dur={`${10 + i}s`} repeatCount="indefinite" path={d} /></circle>}
      </g>;
    })}
    {layout.nodes.map((n, i) => <g key={i}>
      <path d={`M${start.x} ${start.y} C${n.x - 52} ${start.y - amplitude},${n.x} ${n.y - amplitude},${n.x} ${n.y} S${n.x + 55} ${end.y + amplitude},${end.x} ${end.y}`} stroke="#f44c56" strokeWidth=".65" opacity=".7" />
      {i > 0 && <path d={`M${layout.nodes[i - 1].x} ${layout.nodes[i - 1].y} L${n.x} ${n.y}`} stroke="#ff816e" strokeWidth=".9" />}
      <circle cx={n.x} cy={n.y} r="3" fill="#ffd9bc" />
    </g>)}
  </svg>;
}
