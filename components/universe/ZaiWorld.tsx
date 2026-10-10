import { ArrowUpRight, BookOpen, Download, FileText } from "lucide-react";
import { writings } from "@/lib/writing";
import z from "./zai-world.module.css";

// The featured ZAI paper uses the same public record as the Writing archive.
const manuscript = (() => {
  const entry = writings.find((work) => work.slug === "who-is-zai");
  if (!entry) throw new Error("Missing Who Is ZAI publication record");
  return entry;
})();

export function ZaiWorld() {
  const pdf = manuscript.pdf;
  const zenodo = manuscript.zenodo;
  const philpapers = manuscript.philpapers;

  return (
    <section className={z.world} aria-labelledby="zai-world-title">
      <div className={z.intro} data-world-intro>
        <p className={z.eyebrow}>World Z</p>
        <h2 id="zai-world-title"><span>Z</span> <i aria-hidden="true">—</i> ZAI</h2>
        <p className={z.subheading}>Personal Autonomous Intelligence</p>
        <div className={z.starRule} aria-hidden="true"><span>✦</span></div>
        <p className={z.description}>
          I did not want another chatbot. I wanted an intelligence that could
          remember what came before, return to unfinished questions, and learn
          from its mistakes. ZAI grew from that ambition into a personal AI
          project exploring research, cybersecurity, philosophy, and quantum
          computing. The more interesting story is not what ZAI claimed it
          could do. It is what actually happened, what went wrong, and what
          its surviving records can tell us.
        </p>
        <div className={z.counter}>
          <strong>01</strong>
          <span>Research introduction <small>Preprint · version 1.1</small></span>
        </div>
      </div>

      <div className={z.center} aria-label="ZAI research core">
        <svg className={z.roots} viewBox="0 0 540 470" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="zai-root-light" x1="270" y1="135" x2="270" y2="470" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffbd9b" stopOpacity=".95" />
              <stop offset=".38" stopColor="#fa2b50" stopOpacity=".78" />
              <stop offset="1" stopColor="#ab142f" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g stroke="url(#zai-root-light)" strokeLinecap="round">
            <path d="M270 145 C269 230 195 235 175 290 S65 348 16 460" strokeWidth="1.2"/>
            <path d="M270 145 C263 210 221 243 230 299 S167 370 119 466" strokeWidth=".9"/>
            <path d="M270 145 C267 228 280 259 260 305 S238 405 203 468" strokeWidth=".8"/>
            <path d="M270 145 C290 225 312 251 311 310 S356 398 366 468" strokeWidth="1.1"/>
            <path d="M270 145 C298 219 343 233 369 300 S444 394 520 462" strokeWidth=".9"/>
            <path d="M270 145 C304 223 340 261 342 332 S421 398 459 467" strokeWidth=".5"/>
            <path d="M270 145 C252 245 195 263 165 327 S79 402 71 468" strokeWidth=".5"/>
            <path d="M270 145 C285 218 272 258 291 336 S294 428 304 470" strokeWidth=".6"/>
            <path d="M175 290 C140 296 120 312 90 345 M230 299 C197 323 195 345 186 384 M311 310 C344 337 347 366 382 397 M369 300 C398 313 408 346 427 370 M342 332 C349 377 370 402 400 427" strokeWidth=".55"/>
          </g>
        </svg>
        <div className={z.orb} aria-hidden="true"><span>ZAI</span></div>
        <span className={z.orbCaption}>Origin · inquiry · evolution</span>
      </div>

      <article className={z.paper} aria-label="ZAI featured manuscript">
        <div className={z.cover} aria-hidden="true">
          <span className={z.coverMark}>ZAI</span>
          <div className={z.coverBody}>
            <strong>{manuscript.subtitle}</strong>
            <em>{manuscript.title}</em>
          </div>
          <span className={z.coverOrbit}/>
          <span className={z.coverAuthor}>Zawwar Sami</span>
        </div>
        <div className={z.paperBody}>
          <p className={z.paperKicker}>Introductory research preprint <span>·</span> {manuscript.seriesCode}</p>
          <h3>{manuscript.subtitle}</h3>
          <p className={z.paperSubtitle}>{manuscript.title}</p>
          <div className={z.paperRule} aria-hidden="true">✦</div>
          <p className={z.author}>Zawwar Sami</p>
          <div className={z.paperActions}>
            {pdf ? (
              <>
                <a className={z.read} href={pdf} target="_blank" rel="noopener noreferrer"><BookOpen size={18} strokeWidth={1.5} /> Read PDF</a>
                <a className={z.download} href={pdf} download><Download size={17} strokeWidth={1.5} /> Download PDF</a>
              </>
            ) : zenodo ? (
              <>
                <a className={z.read} href={zenodo} target="_blank" rel="noopener noreferrer"><BookOpen size={18} strokeWidth={1.5} /> Read on Zenodo</a>
                {philpapers && <a className={z.download} href={philpapers} target="_blank" rel="noopener noreferrer"><ArrowUpRight size={17} strokeWidth={1.5} /> PhilPapers</a>}
              </>
            ) : (
              <button className={z.read} type="button" disabled><BookOpen size={18} strokeWidth={1.5} /> Manuscript unavailable</button>
            )}
          </div>
          <div className={z.note}><FileText size={13} strokeWidth={1.5} /> Version 1.1 · 12 pages · Independent research preprint.</div>
          <div className={z.sourceLinks} aria-label="Publication records">
            {zenodo && <a href={zenodo} target="_blank" rel="noopener noreferrer">Zenodo <ArrowUpRight size={12} /></a>}
            {philpapers && <a href={philpapers} target="_blank" rel="noopener noreferrer">PhilPapers <ArrowUpRight size={12} /></a>}
            {manuscript.orcid && <a href={manuscript.orcid} target="_blank" rel="noopener noreferrer">ORCID <ArrowUpRight size={12} /></a>}
          </div>
        </div>
      </article>
    </section>
  );
}
