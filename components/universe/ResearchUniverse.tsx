"use client";

import { memo, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowRight, ArrowUpRight, BookOpen, FileText, Grid2X2, LockKeyhole, X } from "lucide-react";
import type { PublicWork, ResearchCycle, ResearchWorld, SynthesisMilestone } from "@/lib/universe";
import s from "./universe.module.css";
import { UniverseConnections, PaperConnections } from "./UniverseConnections";

/** Deterministic root geometry: stable SSR, scalable SVG, no canvas render loop. */
const Roots = memo(function Roots({ variant = 0, className = "" }: { variant?: number; className?: string }) {
  const id = useId().replace(/:/g, "");
  const paths = Array.from({ length: 27 }, (_, i) => {
    const side = i % 2 ? -1 : 1;
    const spread = 20 + ((i * 37 + variant * 19) % 113);
    const x = 150 + side * spread;
    const y = 135 + ((i * 29 + variant * 11) % 145);
    const knee = 40 + ((i * 13) % 75);
    return { x, y, d: `M150 0 C150 ${knee}, ${150 + side * 9} ${knee + 25}, ${150 + side * spread * .45} ${y * .56} S${x + side * 15} ${y * .8}, ${x} ${y}` };
  });
  return <svg className={`${s.roots} ${className}`} viewBox="0 0 300 300" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-red`} x1="150" y1="0" x2="150" y2="300" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffb6a6" /><stop offset=".22" stopColor="#ff3148" /><stop offset="1" stopColor="#841829" stopOpacity=".2" />
      </linearGradient>
      <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.5" /></filter>
    </defs>
    <g stroke={`url(#${id}-red)`}>
      {paths.map((p, i) => <path key={i} d={p.d} strokeWidth={i % 4 === 0 ? 1.5 : .65} opacity={.35 + (i % 4) * .2} />)}
      <path d={paths.filter((_, i) => i % 3 === 0).map(p => p.d).join(" ")} strokeWidth="3" opacity=".45" filter={`url(#${id}-glow)`} />
      {paths.filter((_, i) => i % 4 === 0).map((p, i) => <g key={i}>
        <circle cx={p.x} cy={p.y} r="8" stroke="#bd3040" strokeWidth=".5" />
        <circle cx={p.x} cy={p.y} r="4" fill="#ff2d4e" filter={`url(#${id}-glow)`} />
        <circle cx={p.x} cy={p.y} r="1.7" fill="#ffe0cd" />
      </g>)}
    </g>
  </svg>;
});

function Current({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return <svg className={`${s.current} ${className}`} viewBox="0 0 1000 260" preserveAspectRatio="none" fill="none" aria-hidden="true">
    <defs><filter id={id} x="-10%" y="-100%" width="120%" height="300%"><feGaussianBlur stdDeviation="3" /></filter></defs>
    {Array.from({ length: 19 }, (_, i) => {
      const offset = Math.sin(i * 2.7) * (14 + i * 4);
      const d = `M0 140 C90 ${140 + offset * .2},100 ${140 + offset},240 ${140 + offset} S450 ${140 - offset},590 140 S780 ${120 + offset * .5},1000 140`;
      return <g key={i}><path d={d} stroke={i % 3 === 0 ? "#ffad90" : "#ef253f"} opacity={i % 3 === 0 ? .6 : .32} strokeWidth={i % 3 === 0 ? 1.1 : .6} />
        {i % 5 === 0 && <path d={d} stroke="#ff1739" strokeWidth="4" filter={`url(#${id})`} opacity=".6" />}</g>;
    })}
    <path d="M0 140 C180 136 400 147 620 140 S850 137 1000 140" stroke="#ff614c" strokeWidth="1.2" />
    <circle className={s.traveler} r="2.2" fill="#fff0d5"><animateMotion dur="13s" repeatCount="indefinite" path="M0 140 C180 136 400 147 620 140 S850 137 1000 140" /></circle>
  </svg>;
}

function Milestone({ item, full = false }: { item: SynthesisMilestone; full?: boolean }) {
  return <div className={`${s.milestone} ${full ? s.milestoneFull : ""}`}>
    <span className={s.bookOrbit}><BookOpen size={30} strokeWidth={1} aria-hidden="true" /></span>
    <div><span className={s.kicker}>{item.status === "future" ? "Future synthesis milestone" : "Synthesis · Published"}</span>
      <h3>{item.title}</h3>
      {full && <p>{item.description}</p>}
      {item.status === "published" && item.href && <Link href={item.href} className={s.readLink}>Explore the book <ArrowUpRight size={16} /></Link>}
    </div>
  </div>;
}

function FutureHorizon({ letter }: { letter: string }) {
  return <aside className={s.futureHorizon} aria-label={`Future expansion for World ${letter}`}>
    <div className={s.futureCore} aria-hidden="true"><span /><i /><i /><i /></div>
    <p className={s.kicker}>Future cycles</p>
    <h3>Open horizon</h3>
    <p className={s.futureCopy}>New branches light up only when real work is released.</p>
    <div className={s.futureTrail}><span />A broader horizon</div>
    <div className={s.futureCycleCards} aria-hidden="true">
      <div className={s.futureCycleCard}><strong>Next cycle</strong><small>Opens with the next body of work.</small></div>
      <div className={s.futureCycleCard}><strong>Beyond</strong><small>Long-term expansion.</small></div>
    </div>
  </aside>;
}

function Cycle({ cycle, onOpen }: { cycle: ResearchCycle; onOpen: (work: PublicWork) => void }) {
  const field = useRef<HTMLDivElement>(null);
  const slots = cycle.slots ? Array.from({ length: cycle.slots.count }, (_, i) => {
    const code = `${cycle.slots!.prefix}${i + 1}`;
    return { code, work: cycle.works.find(work => work.seriesCode === code) };
  }) : cycle.works.map(work => ({ code: work.seriesCode ?? "Paper", work }));
  return <section className={s.cycle} aria-label={cycle.label} data-slots={cycle.slots?.count}>
    <div className={s.cycleHeading}><h3>{cycle.label}</h3><span className={s.hairline} /><p>{cycle.slots ? `${cycle.slots.prefix}1–${cycle.slots.prefix}${cycle.slots.count}` : "Published work"} <span>· {cycle.works.length} {cycle.slots ? "unlocked" : cycle.works.length === 1 ? "paper" : "papers"}</span><i className={s.spark} /></p></div>
    <p className={s.cycleDescription}>{cycle.description}</p>
    <div className={s.nodeField} ref={field}>
      <PaperConnections field={field} count={slots.length} />
      <Roots className={s.mobileCycleRoot} />
      <div className={s.paperNodes}>
        {slots.map(({ code, work }) => work ? <button key={code} className={s.paperNode} data-paper-node onClick={() => onOpen(work)} aria-label={`Read ${code}: ${work.title}`}>
          <FileText className={s.paperIcon} size={21} strokeWidth={1} aria-hidden="true" />
          <span>{code}</span>
          <span className={s.nodeTooltip}>{work.title}</span>
        </button> : <button key={code} className={`${s.paperNode} ${s.lockedNode}`} data-paper-node disabled aria-label={`${code}: Locked — not yet released`} title="Unlocks when published">
          <span>{code}</span><LockKeyhole size={9} className={s.lockIcon} aria-hidden="true" />
        </button>)}
      </div>
      <span className={s.continuation} aria-hidden="true"><i /><i /><i /></span>
    </div>
    {cycle.slots && <p className={s.unlockNote}>Glowing nodes are available · Locked nodes unlock as papers are released.</p>}
    {cycle.synthesis && <div className={s.synthesisBranch}>
      <svg viewBox="0 0 300 100" className={s.dottedBranch} aria-hidden="true"><path d="M0 0 C100 50 140 -30 160 40 S220 90 300 85" stroke="currentColor" strokeDasharray="1 5" strokeLinecap="round" fill="none" /></svg>
      <Milestone item={cycle.synthesis} />
    </div>}
  </section>;
}

export function ResearchUniverse({ worlds }: { worlds: ResearchWorld[] }) {
  const [letter, setLetter] = useState("A");
  const [map, setMap] = useState(true);
  const stage = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<"overview" | "papers" | "synthesis" | "future">("overview");
  const [paper, setPaper] = useState<PublicWork | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const world = worlds.find((item) => item.letter === letter) ?? worlds[0];
  const works = world.cycles.flatMap((cycle) => cycle.works);
  const syntheses = world.cycles.flatMap((cycle) => cycle.synthesis ? [cycle.synthesis] : []);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    function readHash() {
      const requested = window.location.hash.slice(1).toUpperCase();
      if (worlds.some((w) => w.letter === requested)) { setLetter(requested); setMap(false); setView("overview"); }
      else { setLetter("A"); setMap(true); setView("overview"); }
    }
    const openMap = () => { setLetter("A"); setMap(true); setView("overview"); window.history.replaceState(null, "", window.location.pathname + window.location.search); };
    readHash();
    window.addEventListener("universe:overview", openMap);
    window.addEventListener("hashchange", readHash);
    window.addEventListener("popstate", readHash);
    return () => { window.removeEventListener("universe:overview", openMap); window.removeEventListener("hashchange", readHash); window.removeEventListener("popstate", readHash); };
  }, [worlds]);

  function selectWorld(value: string) {
    setLetter(value); setMap(false); setView("overview");
    window.history.pushState(null, "", `#${value}`);
  }
  function openPaper(work: PublicWork) {
    previousFocus.current = document.activeElement as HTMLElement;
    setPaper(work);
    dialog.current?.showModal();
  }

  return <div className={s.universe} data-reduced-motion={reduceMotion ? "true" : "false"} data-view={map ? "map" : "world"}>
    <div className={s.backdrop} aria-hidden="true"><Image src="/images/universe/cosmos.webp" alt="" fill priority sizes="100vw" quality={85} /></div>
    <div className={s.landscape} aria-hidden="true"><Image src="/images/universe/landscape-hd.webp" alt="" fill sizes="100vw" quality={90} priority /></div>
    <div className={s.atmosphere} aria-hidden="true" />
    <div className={s.content}>
      <header className={s.hero}>
        <p className={s.kicker}><i className={s.spark} /> Map · Explore · Connect</p>
        <h1>Research <span>Universe</span></h1>
        <p className={s.subtitle}>A — Z <span>·</span> A living archive of ideas</p>
      </header>

      <div className={s.topology} ref={stage}>
      <UniverseConnections stage={stage} selected={letter} map={map} />
      <nav className={s.alphabet} aria-label="Research worlds">
        {alphabet.map((value) => {
          const active = worlds.find((w) => w.letter === value);
          return active ? <button key={value} className={`${s.letter} ${s.activeLetter} ${!map && letter === value ? s.selectedLetter : ""}`} data-world-source={value} aria-label={`World ${value}: ${active.title}`} aria-pressed={!map && letter === value} onClick={() => selectWorld(value)}><span>{value}</span></button>
            : <span key={value} className={`${s.letter} ${s.dormantLetter}`} aria-label={`${value}: dormant`}><span>{value}</span><i /></span>;
        })}
      </nav>

      <div className={`${s.worldMap} ${map ? s.mapExpanded : s.mapCompact}`} aria-label="Active worlds">
        {worlds.map((item) => <button key={item.letter} className={s.worldBranch} aria-pressed={!map && letter === item.letter} onClick={() => selectWorld(item.letter)}>
          <span className={s.worldLetter}>{item.letter}</span><span className={s.worldName} data-world-label={item.letter}>{item.title}</span>
          <span className={s.worldCount}>{item.cycles.reduce((n, c) => n + c.works.length, 0) ? `${item.cycles.reduce((n, c) => n + c.works.length, 0)} public ${item.cycles.reduce((n, c) => n + c.works.length, 0) === 1 ? "paper" : "papers"}` : "Open inquiry"}</span>
        </button>)}
      </div>

      {!map && <>
        <div className={s.viewControls}><button onClick={() => { setMap(true); window.history.pushState(null, "", "#map"); }}><Grid2X2 size={13} aria-hidden="true" /> All worlds</button><span>World {world.letter}</span></div>

          <section key={world.letter} className={s.worldDetail} aria-label={`World ${world.letter}: ${world.title}`}>
            <div className={s.edgePlanet} aria-hidden="true" />
            <div className={s.worldIntro} data-world-intro>
              <span className={s.worldMedallion} aria-hidden="true">{world.letter}</span>
              <div><p className={s.kicker}>World {world.letter} <i className={s.tinySpark} /></p>
                <h2><span>{world.letter} — </span>{world.title}</h2>
                <p className={s.keywords}>{world.keywords}</p>
                <p className={s.description}><span className={s.desktopDescription}>{world.description}</span><span className={s.mobileDescription}>{world.shortDescription ?? world.description}</span></p>
                <div className={s.stats}>
                  <div><strong>{works.length || "—"}</strong><span>{works.length === 1 ? "Paper" : "Papers"}<small>{works.length ? "Public work" : "Open inquiry"}</small></span></div>
                  {syntheses.length > 0 && <div><strong>{syntheses.length}</strong><span>Synthesis book<small>{syntheses.some((b) => b.status === "future") ? "Future milestone" : "Published"}</small></span></div>}
                </div>
              </div>
            </div>
            <div className={s.worldBody}>
              {view === "overview" && (world.cycles.length ? <div className={s.overviewStage}>
                <div className={s.cyclesColumn}>{world.cycles.map((cycle) => <Cycle key={cycle.id} cycle={cycle} onOpen={openPaper} />)}</div>
                <FutureHorizon letter={world.letter} />
              </div> : <div className={s.emptyWorld}><Current /><span className={s.emptyOrb}>{world.letter}</span><h3>An open field of inquiry.</h3><p>Public work will appear here as it is released.</p></div>)}
              {view === "papers" && <div className={s.paperList}><h3>Published work</h3><p className={s.listNote}>Public papers and author manuscripts. Publication status is shown on each record.</p>{works.map((item) => <button key={item.slug} onClick={() => openPaper(item)}><span className={s.listCode}>{item.seriesCode ?? <FileText size={22} />}</span><span><strong>{item.title}</strong><small>{item.status} · {item.datePublished}</small></span><ArrowUpRight size={18} aria-hidden="true" /></button>)}</div>}
              {view === "future" && <FutureHorizon letter={world.letter} />}
              {view === "synthesis" && <div className={s.synthesisView}>{syntheses.map((item) => <Milestone key={item.id} item={item} full />)}</div>}
            </div>
          </section>

        {world.cycles.length > 0 && <nav className={s.viewTabs} aria-label="World views">
          <button aria-pressed={view === "overview"} onClick={() => setView("overview")}>Overview</button>
          <button aria-pressed={view === "papers"} onClick={() => setView("papers")}>Papers <span>({works.length})</span></button>
          {syntheses.length > 0 && <button aria-pressed={view === "synthesis"} onClick={() => setView("synthesis")}>Synthesis book</button>}
          <button aria-pressed={view === "future"} onClick={() => setView("future")}>Future cycles</button>
        </nav>}
      </>}
      </div>
      {map && <div className={s.mapHint}><p>Select a glowing world to explore its work.</p></div>}
      <footer className={s.footer}><span>Zawwar Sami · A living archive</span><Link href="/writing">Browse all writing <ArrowRight size={14} aria-hidden="true" /></Link></footer>
    </div>
    <dialog ref={dialog} className={s.paperDialog} aria-labelledby="universe-paper-title" data-lenis-prevent onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} onClose={() => previousFocus.current?.focus()}>
      {paper && <article className={s.paperSheet}>
        <button className={s.close} aria-label="Close paper details" onClick={() => dialog.current?.close()}><X size={22} /></button>
        <p className={s.kicker}>{paper.seriesCode ? `${paper.seriesCode} · ` : ""}{paper.kind} · {paper.status}</p>
        <h2 id="universe-paper-title">{paper.title}</h2>
        <p className={s.paperMeta}>{paper.datePublished} · {paper.version}</p><p>{paper.summary}</p>
        <div className={s.paperLinks}>
          <Link href={`/writing/${paper.slug}`} onClick={() => dialog.current?.close()} className={s.primaryLink}>Read the paper <ArrowUpRight size={17} /></Link>
          {paper.pdf && <a href={paper.pdf} target="_blank" rel="noopener noreferrer">PDF <ArrowUpRight size={15} /></a>}
          {paper.zenodo && <a href={paper.zenodo} target="_blank" rel="noopener noreferrer">Zenodo <ArrowUpRight size={15} /></a>}
          {paper.philpapers && <a href={paper.philpapers} target="_blank" rel="noopener noreferrer">PhilPapers <ArrowUpRight size={15} /></a>}
        </div>
        {paper.doi && <p className={s.doi}>DOI: {paper.doi}</p>}
      </article>}
    </dialog>
  </div>;
}
