import { site } from "./site";
export type WritingKind = "Paper" | "Essay" | "Research note";
export type WritingEntry = {
  slug: string;
  title: string;
  summary: string;
  subtitle?: string;
  abstract?: string;
  philpapers?: string;
  zenodo?: string;
  orcid?: string;
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
    slug: "what-survives-a-model-change",
    title: "What Survives a Model Change?",
    subtitle: "Memory, Identity, and Succession in Personal AI",
    summary:
      "A philosophical account of model replacement in personal AI: why inherited memory does not settle identity, authority, or the limits of delegated work.",
    abstract:
      "What warrants treating a replacement model as the continuation of a personal AI? Persistent memory offers an apparent answer, yet copying the same history into several systems exposes its insufficiency. I distinguish numerical identity, recognizable character, and the legitimate continuation of delegated assistance. Through two thought experiments, I argue that informational continuity neither determines a successor's authority nor enlarges the scope of an inherited instruction. Two copies may possess the same past while occupying different roles; two authorized workers may each perform an individually permitted action while jointly exceeding a mandate that allowed only one execution. I develop an account of authorized succession in which the successor can interpret the inherited record, act under a continuing mandate, and remain answerable for the handover. The argument draws on ZAI, my personal AI project, and engages philosophical and technical accounts of continuity. It allows distributed assistance and advance delegation while preserving a distinction between successful succession and the survival of a conscious subject. What ought to endure through replacement is an intelligible relation to the user's work, including the user's authority to revise earlier commitments.",
    url: "https://zawwarsami.com/writing/what-survives-a-model-change",
    datePublished: "2026-10-03",
    tags: [
      "personal AI",
      "model replacement",
      "continuity",
      "numerical identity",
      "delegated authority",
      "AI memory",
      "succession",
      "philosophy of AI",
    ],
    kind: "Paper",
    status: "Preprint",
    version: "Version 1.1",
    pages: 8,
    pdf: "/papers/Zawwar-Sami-What-Survives-a-Model-Change.pdf",
    doi: "10.5281/zenodo.23123678",
    zenodo: "https://zenodo.org/records/23123678",
    philpapers: "https://philpapers.org/rec/SAMWSA",
    orcid: "https://orcid.org/0009-0004-5819-3017",
  },
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
  const publisher = entry.zenodo
    ? "Zenodo"
    : entry.status === "Published on Substack"
      ? "Substack"
      : "Zawwar Sami";
  const url = entry.doi ? `https://doi.org/${entry.doi}` : entry.url;
  return `Sami, Z. (${entry.datePublished.slice(0, 4)}). ${entry.title}${entry.subtitle ? ` ${entry.subtitle}` : ""}. ${publisher}. ${url}`;
}
export function bibtexFor(entry: WritingEntry) {
  const title = `${entry.title}${entry.subtitle ? ` ${entry.subtitle}` : ""}`.replace(
    /[{}\\]/g,
    "",
  );
  return `@misc{sami${entry.datePublished.slice(0, 4)}${entry.slug.replace(/-/g, "")},\n  author = {Sami, Zawwar},\n  title = {${title}},\n  year = {${entry.datePublished.slice(0, 4)}},\n  month = {${entry.datePublished.slice(5, 7)}},\n  url = {${entry.url}},\n${entry.doi ? `  doi = {${entry.doi}},\n` : ""}${entry.zenodo ? "  publisher = {Zenodo},\n" : ""}  note = {${entry.status}}\n}\n`;
}
