import { site } from "./site";
export type WritingKind = "Paper" | "Essay" | "Research note";
export type WritingEntry = {
  slug: string;
  title: string;
  summary: string;
  subtitle?: string;
  abstract?: string;
  philpapers?: string;
  substack?: string;
  pages?: number;
  url: string;
  datePublished: string;
  tags: readonly string[];
  kind: WritingKind;
  status: "Published on Substack" | "Preprint" | "Draft" | "Published" | "Manuscript";
  version: string;
  pdf?: string;
  doi?: string;
  sections?: { title: string; paragraphs: string[] }[];
  references?: { title: string; url?: string }[];
};
// Only already-public entries belong here. Unreleased manuscripts stay private.
export const writings: WritingEntry[] = [
  {
    slug: "when-is-an-ai-personal",
    title: "When Is an AI Personal?",
    subtitle: "Memory, Continuity, and the Authority to Revise",
    summary:
      "A philosophical account of personal AI: why memory and continuity must remain answerable to the person, with effective correction, traceability, and usable transfer.",
    abstract:
      "An AI assistant can remember a person in considerable detail while leaving that person with little control over how the record is used. This paper distinguishes personalization from a stronger, normative sense of personal assistance. Its central claim is that when an assistant relies on accumulated personal history to interpret instructions or act on someone's behalf, the person must retain effective authority to contest and revise that history's practical force. The argument begins with a shared memory system developed for use across AI clients, then examines a case in which an assistant mistakes an old project decision for a standing preference. Work on extended cognition helps explain why such records can matter to agency; work on generative cognition complicates the analogy with a passive notebook. Correction, traceability, and usable transfer are defended as connected supports for continuing authority, rather than as a checklist sufficient for autonomy. The resulting account explains why possessing a database, preserving an assistant's personality, and accumulating more memory can each fall short of making an AI meaningfully personal.",
    url: "https://zawwarsami.com/writing/when-is-an-ai-personal",
    datePublished: "2026-10-02",
    tags: [
      "personal AI",
      "memory",
      "human agency",
      "extended cognition",
      "autonomy",
      "AI assistants",
    ],
    kind: "Paper",
    status: "Manuscript",
    version: "Author’s manuscript",
    pages: 7,
    pdf: "/papers/Zawwar-Sami-When-Is-an-AI-Personal.pdf",
    philpapers: "https://philpapers.org/rec/SAMWIA-2",
    substack: "https://zawwar16.substack.com/p/when-is-an-ai-personal",
  },
  ...site.writing.map(
    (post): WritingEntry => ({
      ...post,
      kind: "Essay",
      status: "Published on Substack",
      version: "Archive record · 1.0",
    }),
  ),
];
export function writingDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}
export function citationFor(entry: WritingEntry) {
  return `Sami, Z. (${entry.datePublished.slice(0, 4)}). ${entry.title}${entry.subtitle ? ` ${entry.subtitle}` : ""}. ${entry.status === "Published on Substack" ? "Substack" : "Zawwar Sami"}. ${entry.url}`;
}
export function bibtexFor(entry: WritingEntry) {
  const title = `${entry.title}${entry.subtitle ? ` ${entry.subtitle}` : ""}`.replace(
    /[{}\\]/g,
    "",
  );
  return `@misc{sami${entry.datePublished.slice(0, 4)}${entry.slug.replace(/-/g, "")},\n  author = {Sami, Zawwar},\n  title = {${title}},\n  year = {${entry.datePublished.slice(0, 4)}},\n  month = {${entry.datePublished.slice(5, 7)}},\n  url = {${entry.url}},\n  note = {${entry.status}}\n}\n`;
}
