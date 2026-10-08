"use client";

import { memo, useEffect, useId, useRef, useState, type RefObject } from "react";
import s from "./universe.module.css";

type Point = { x: number; y: number };
type Branch = { letter: string; start: Point; end: Point; spread: number; detail: boolean };
type Layout = { width: number; height: number; branches: Branch[] };

/** Stop SVG timelines when offscreen, hidden, or reduced motion is requested. */
function useSvgPlayback(ref: RefObject<SVGSVGElement | null>, ready: boolean) {
  useEffect(() => {
    const svg = ref.current;
    if (!svg || !ready) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => {
      if (!visible || document.hidden || reduced.matches) svg.pauseAnimations();
      else svg.unpauseAnimations();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(svg);
    reduced.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => { observer.disconnect(); reduced.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); };
  }, [ref, ready]);
}

/** Measure the HTML anchors, so every beam stays attached at every breakpoint. */
export const UniverseConnections = memo(function UniverseConnections({ stage, selected, map }: {
  stage: RefObject<HTMLDivElement | null>; selected: string; map: boolean;
}) {
  const [layout, setLayout] = useState<Layout | null>(null);
  const signature = useRef("");
  const svg = useRef<SVGSVGElement>(null);
  useSvgPlayback(svg, layout !== null);
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
          const above = end.bottom < src.top;
          const labelBlock = target.closest("button")!.getBoundingClientRect();
          if (above) start.y = src.top + src.height / 2 - radius - box.top;
          branches.push({ letter, start, end: { x: end.left + end.width / 2 - box.left, y: above ? labelBlock.bottom - box.top + 12 : end.top - box.top - 15 }, spread: Math.min(end.width * .58, compact ? 48 : 125), detail: false });
        } else if (!map && letter === selected) {
          const intro = host.querySelector<HTMLElement>("[data-world-intro]");
          if (intro) {
            const end = intro.getBoundingClientRect();
            branches.push({ letter, start, end: { x: end.left - box.left - 35, y: end.bottom - box.top - 22 }, spread: 90, detail: true });
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
    measure();
    return () => { disposed = true; cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("resize", schedule); };
  }, [stage, selected, map]);
  if (!layout) return null;
  return <svg ref={svg} className={s.connections} viewBox={`0 0 ${layout.width} ${layout.height}`} aria-hidden="true" fill="none">
    <defs>
      <filter id={`${id}-bloom`} x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="3" /></filter>
      <filter id={`${id}-soft`} x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="1.15" /></filter>
    </defs>
    {layout.branches.map(({ letter, start: a, end: b, spread }) => {
      const length = b.y - a.y;
      const direction = Math.sign(length) || 1;
      const seed = letter.charCodeAt(0);
      const paths = Array.from({ length: 19 }, (_, i) => {
        const side = i % 2 ? -1 : 1;
        const reach = (0.19 + ((i * 37 + seed) % 80) / 100) * spread;
        const end = { x: b.x + side * reach, y: a.y + length * (.42 + ((i * 19 + seed) % 55) / 100) };
        const forkY = a.y + length * (.13 + (i % 5) * .037);
        const forkX = a.x + (b.x - a.x) * .25 + side * 3;
        const d = `M${a.x} ${a.y} C${a.x} ${a.y + 20 * direction},${forkX} ${forkY},${forkX} ${forkY + 8 * direction} C${forkX + side * reach * .1} ${forkY + length * .22},${end.x - side * reach * .18} ${end.y - length * .3},${end.x} ${end.y}`;
        return { d, end, side };
      });
      const trunk = `M${a.x} ${a.y} C${a.x} ${a.y + length * .36},${b.x - 9} ${b.y - length * .35},${b.x} ${b.y}`;
      return <g key={letter} data-connection={letter}>
        <path d={paths.filter((_, i) => i % 4 === 0).map(p => p.d).join(" ")} stroke="#ff193c" strokeWidth="3" opacity=".5" filter={`url(#${id}-bloom)`} />
        {paths.map((p, i) => <g key={i}>
          <path d={p.d} stroke={i % 4 === 0 ? "#ff977f" : "#e92c43"} strokeWidth={i % 4 === 0 ? .9 : .55} opacity={.45 + (i % 4) * .13} />
          {i % 3 === 0 && <path d={`M${p.end.x} ${p.end.y} q${p.side * 9} ${7 * direction} ${p.side * 11} ${20 * direction}`} stroke="#c73649" strokeWidth=".5" opacity=".65" />}
          {i % 4 === 0 && <g>
            <circle cx={p.end.x} cy={p.end.y} r="4.5" fill="#ff243b" opacity=".22" />
            <circle cx={p.end.x} cy={p.end.y} r="1.35" fill="#ffddbf" />
            {i % 8 === 0 && <circle cx={p.end.x} cy={p.end.y} r="6" stroke="#f47467" strokeWidth=".55" opacity=".6" />}
          </g>}
        </g>)}
        <path d={trunk} stroke="#ff5763" strokeWidth="2.5" opacity=".3" />
        <path d={trunk} stroke="#ffb194" strokeWidth=".8" opacity=".85" />
        <circle cx={a.x} cy={a.y} r="3" fill="#fff0cc" filter={`url(#${id}-soft)`} />
        <circle className={s.traveler} r="1.6" fill="#ffe8ca"><animateMotion dur={`${9 + seed % 5}s`} repeatCount="indefinite" path={trunk} /></circle>
      </g>;
    })}
  </svg>;
});

/** The paper connections use the button centers, including wrapped mobile rows. */
export const PaperConnections = memo(function PaperConnections({ field, count }: { field: RefObject<HTMLDivElement | null>; count: number }) {
  const [layout, setLayout] = useState<{ width: number; height: number; nodes: Point[] } | null>(null);
  const id = useId().replace(/:/g, "");
  const signature = useRef("");
  const svg = useRef<SVGSVGElement>(null);
  useSvgPlayback(svg, layout !== null);
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
      const next = { width: bounds.width, height: bounds.height, nodes };
      const key = JSON.stringify(next);
      if (signature.current !== key) { signature.current = key; setLayout(next); }
    };
    const observer = new ResizeObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); });
    observer.observe(host);
    host.querySelectorAll("[data-paper-node]").forEach(el => observer.observe(el));
    update();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [field, count]);
  if (!layout || !layout.nodes.length) return null;
  const centerY = layout.height / 2;
  const rows = layout.nodes.reduce<Point[][]>((rows, node) => {
    const row = rows.find(row => Math.abs(row[0].y - node.y) < 2);
    if (row) row.push(node); else rows.push([node]);
    return rows;
  }, []);
  return <svg ref={svg} className={s.paperConnections} viewBox={`0 0 ${layout.width} ${layout.height}`} fill="none" aria-hidden="true">
    <defs><filter id={id} x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="2" /></filter></defs>
    {rows[0].map((n, i) => <g key={i}>
      <path d={`M${n.x} 8 V${layout.height - 8}`} stroke="#b64046" strokeWidth=".5" opacity=".25" />
      <circle cx={n.x} cy="8" r="1" fill="#f78a74" />
      <circle cx={n.x} cy={layout.height - 8} r="1" fill="#f78a74" />
    </g>)}
    {rows.map((row, i) => {
      const first = row[0], last = row[row.length - 1];
      const d = `M-35 ${centerY} C0 ${centerY},${first.x - 40} ${first.y},${first.x} ${first.y} L${last.x} ${last.y} C${last.x + 40} ${last.y},${layout.width + 10} ${centerY},${layout.width + 45} ${centerY}`;
      return <g key={i}>
        <path d={d} stroke="#ff243f" strokeWidth="3" opacity=".5" filter={`url(#${id})`} />
        <path d={d} stroke="#ff8e78" strokeWidth=".9" opacity=".85" />
        {[-9, 9].map(offset => <path key={offset} d={`M-35 ${centerY} C10 ${centerY + offset},${first.x - 45} ${first.y + offset},${first.x} ${first.y} S${last.x} ${last.y + offset},${last.x} ${last.y} C${last.x + 45} ${last.y + offset},${layout.width + 10} ${centerY},${layout.width + 45} ${centerY}`} stroke="#d82d43" strokeWidth=".55" opacity=".55" />)}
        <circle className={s.traveler} r="1.5" fill="#ffe4ca"><animateMotion dur={`${12 + i * 3}s`} repeatCount="indefinite" path={d} /></circle>
      </g>;
    })}
  </svg>;
});
