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
    slug: "continuity-oriented-architecture-for-personal-ai",
    title: "A Continuity-Oriented Architecture for Personal AI",
    subtitle: "Persistent State, Self-Monitoring, and Replaceable Models",
    summary:
      "An architecture for practical continuity in personal AI: durable state, context reconstruction, self-monitoring, replaceable reasoning, verified outcomes, and revision across changing sessions and models.",
    abstract:
      "What happens when the chat window disappears, but the work is not done? A personal AI may move between sessions, devices, clients, and models while the person still expects the same project to continue. Long-term memory helps, but memory by itself does not tell a system what is current, what was rejected, who is allowed to act, or whether an action actually succeeded. This paper argues that practical continuity should be treated as an architectural problem rather than something we expect the language model to carry inside itself. I propose a loop built around persistent state, context reconstruction, orientation and self-monitoring, replaceable reasoning, action, verified outcomes, and state revision. The point is not to preserve an abstract AI self. It is to preserve the active state of work in a way that another session or model can understand, trace, and revise. I use ZAI and the ZAI Memory Hub as an implementation case, while separating current verified components from historical runtime evidence, in-build designs, and philosophical interpretation. I then set out failure cases and tests for revision propagation, model replacement, concurrent agents, false completion, recovery, and authority boundaries. The claim stays limited: this architecture can support practical continuity of assistance. It does not prove continuity of consciousness or numerical identity.",
    url: "https://zawwarsami.com/writing/continuity-oriented-architecture-for-personal-ai",
    datePublished: "2026-10-04",
    tags: [
      "personal AI",
      "AI agents",
      "long-term memory",
      "continuity",
      "self-monitoring",
      "model replacement",
      "persistent state",
      "agent architecture",
    ],
    kind: "Paper",
    status: "Preprint",
    version: "Version 1.1",
    pages: 9,
    doi: "10.5281/zenodo.23142834",
    zenodo: "https://zenodo.org/records/23142834",
    philpapers: "https://philpapers.org/rec/SAMACA-10",
    orcid: "https://orcid.org/0009-0004-5819-3017",
  },
  {
    slug: "the-person-before-the-split",
    title: "The Person Before the Split",
    subtitle: "Soul-Body Unity and Living Identity",
    summary:
      "A philosophical-theological account of living identity that begins with the embodied person before separating soul, body, persistence, and moral integrity into distinct problems.",
    abstract:
      "Most philosophical discussions about what it means to be human start after we’ve already divided mind and body. We set up the problem by separating soul from matter, and then spend all our time wondering how the two could possibly connect. But honestly, that misses something important at the very start. Instead of immediately breaking a person into parts, we should stop and ask what sort of unity even makes those aspects belong together in one living being. In this paper, I develop an account—grounded in philosophy and Islamic theology—of what I call “living identity.” Here, soul and body aren’t duking it out for the right to be called the person. They’re distinguishable, sure, but we don’t have to pick sides. I’m not trying to infer the existence of an immaterial soul just from watching how our bodies behave. I’m also not offering a clean solution to the old puzzle of how mind and matter interact. Instead, I try to untangle three questions we usually mush together: What makes us an embodied unity? What keeps us the “same” individual through time? And what holds our moral life and commitments together? Borrowing insights from Descartes, phenomenology, recent work on embodiment, and the Islamic philosophical tradition about self-awareness, I argue that the best starting point is to see the living person as an embodied subject—whose inner and outer life are inseparable parts of a single ongoing existence. In Islamic theology, that unity comes from God, and our responsibility shows up through what we do with our bodies. So, the real question isn’t “soul versus body”—it’s what it means for a person to be one at all.",
    url: "https://zawwarsami.com/writing/the-person-before-the-split",
    datePublished: "2026-10-03",
    tags: [
      "personal identity",
      "embodiment",
      "Islamic philosophy",
      "soul",
      "body",
      "philosophical theology",
      "selfhood",
      "moral integrity",
    ],
    kind: "Paper",
    status: "Preprint",
    version: "Zenodo preprint",
    pages: 6,
    pdf: "/writing/the-person-before-the-split/paper.pdf",
    doi: "10.5281/zenodo.23127396",
    zenodo: "https://zenodo.org/records/23127396",
    philpapers: "https://philpapers.org/rec/SAMTPB",
    orcid: "https://orcid.org/0009-0004-5819-3017",
  },
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
    pdf: "/writing/what-survives-a-model-change/paper.pdf",
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
    pdf: "/writing/when-is-an-ai-personal/paper.pdf",
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
