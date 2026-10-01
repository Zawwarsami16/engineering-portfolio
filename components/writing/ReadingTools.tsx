"use client";
import { useState } from "react";
import { Check, Copy, Sun, Moon, Download, Type } from "lucide-react";
export function Citation({ text, slug }: { text: string; slug: string }) {
  const [message, setMessage] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setMessage("Citation copied");
    } catch {
      setMessage("Select the citation below to copy it.");
    }
  }
  return (
    <div className="citation-box" id="citation">
      <span className="eyebrow">Cite this work</span>
      <p>{text}</p>
      <div className="citation-actions">
        <button className="small-button" onClick={copy}>
          {message === "Citation copied" ? <Check size={15} /> : <Copy size={15} />}{" "}
          {message === "Citation copied" ? "Copied" : "Copy citation"}
        </button>
        <a className="small-button" href={`/writing/${slug}/citation`} download={`${slug}.bib`}>
          <Download size={15} /> BibTeX
        </a>
      </div>
      <span role="status">
        {message && message !== "Citation copied" ? (
          message
        ) : (
          <span className="sr-only">{message}</span>
        )}
      </span>
    </div>
  );
}
export function ReadingSurface({ children }: { children: React.ReactNode }) {
  const [light, setLight] = useState(false);
  const [large, setLarge] = useState(false);
  return (
    <div
      className={`reading-surface${light ? "reading-light" : ""}${large ? "reading-large" : ""}`}
    >
      <div className="reading-preferences shell">
        <span className="eyebrow">Reading room</span>
        <div>
          <button className="small-button" onClick={() => setLarge(!large)} aria-pressed={large}>
            <Type size={16} />
            <span>Larger text</span>
          </button>
          <button className="small-button" onClick={() => setLight(!light)} aria-pressed={light}>
            {light ? <Moon size={16} /> : <Sun size={16} />}
            <span>{light ? "Dark page" : "Light page"}</span>
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
