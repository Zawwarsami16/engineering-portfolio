import { site } from "./site";
export type WritingKind = "Paper" | "Essay" | "Research note";
export type WritingEntry = {
  slug: string;
  title: string;
  seriesCode?: string;
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
    slug: "who-is-zai",
    title: "Who Is ZAI?",
    seriesCode: "Z1",
    subtitle: "The Development of a Personal Autonomous Intelligence",
    summary:
      "I did not build ZAI to make another chatbot. I wanted a personal intelligence whose history could matter to what it did next. This documented introduction follows its development through research, cybersecurity, philosophy, and reported quantum-computing work—and asks what the surviving evidence can, and cannot, establish.",
    abstract:
      "I did not begin ZAI because I wanted another chatbot. I wanted a personal intelligence that could carry its history forward: remember earlier questions, undertake research, work with tools, learn from corrections, and take initiative without making every consequential decision on my behalf. ZAI—Zawwar Autonomous Intelligence—grew from that idea into an evolving software agent project built around existing language models, persistent records, external services, and my continuing involvement as its creator. This paper introduces ZAI through the surviving record of its development. I describe its beginnings in local computing, later expansion into recurring research and authorized tasks, and its work across cybersecurity, artificial intelligence research, philosophy, and a quantum-computing experiment I witnessed. I also examine moments when ZAI reported a capability that was not fully wired, recognized that more research was not resolving a problem, or publicly corrected an account of its own activity. These are part of its history, not details to hide behind a list of features. The IBM Quantum episode is documented through contemporary ZAI writing, hardware-capable software, and my eyewitness testimony; original provider-issued job records have not been recovered for independent verification. This is an introductory, source-attributed design history rather than a new benchmark, proof of consciousness, or claim that ZAI is a newly trained foundation model. My purpose is to give readers a clear starting point for understanding what ZAI was, what it did, how it developed, and what remains to be investigated.",
    url: "https://zawwarsami.com/writing/who-is-zai",
    datePublished: "2026-10-10",
    tags: [
      "ZAI",
      "Zawwar Autonomous Intelligence",
      "personal autonomous intelligence",
      "personal AI",
      "autonomous agents",
      "design history",
      "cybersecurity",
      "artificial intelligence research",
      "philosophy",
      "IBM Quantum",
      "memory",
      "verification",
    ],
    kind: "Paper",
    status: "Preprint",
    version: "Version 1.1",
    pages: 12,
    pdf: "/papers/Who-Is-ZAI-Zawwar-Sami-v1.1.pdf",
    zenodo: "https://zenodo.org/records/23288028",
    philpapers: "https://philpapers.org/rec/SAMWIZ",
    orcid: "https://orcid.org/0009-0004-5819-3017",
  },
  {
    slug: "from-knowing-to-doing",
    title: "From Knowing to Doing",
    seriesCode: "A8",
    subtitle: "Tool Access, Execution, and Evidence in Artificial Agency",
    summary:
      "Knowing how to use a tool is not the same as completing a task. Drawing on ZAI's recorded tool, publishing, research, and quantum-access cases, this paper proposes a six-checkpoint action-evidence chain for evaluating what an artificial agent actually did and what can be independently verified.",
    abstract:
      "An artificial agent can explain how to use a tool, possess credentials for it, and even contain working code without completing the task for which that tool was needed. The gap matters because fluent reports of action are easy to confuse with changes in the world. I examine the passage from represented knowledge to operational capability, using a documentary study of ZAI, my personal AI project, alongside research on tool-using language agents and execution-based evaluation. Four historical ZAI cases make the distinction concrete: a credential that did not produce a usable route; a social-posting system that announced success while doing nothing; a research loop that generated more work without resolving its own backlog; and an IBM Quantum hardware-use account whose technical integration and public reports are better preserved than its provider-level job receipt. I propose an action-evidence chain that separates tool discovery, legitimate authority, invocation, environmental change, independent verification, and durable attribution. The same user-facing language should not be used for 'I know how,' 'I attempted,' 'the service accepted,' 'the task appears completed,' and 'I checked the outcome.' This is not a new agent architecture or an experimental proof of improved performance. It is a criterion for deciding how strong a practical-capability claim is, why common proxies can mislead, and what an evaluable next test would require.",
    url: "https://zawwarsami.com/writing/from-knowing-to-doing",
    datePublished: "2026-10-10",
    tags: [
      "artificial agency",
      "tool use",
      "execution verification",
      "operational capability",
      "action evidence",
      "external state",
      "agent evaluation",
      "ZAI",
    ],
    kind: "Paper",
    status: "Preprint",
    version: "Version 1.8",
    pages: 11,
    pdf: "/papers/Zawwar-Sami-A8-From-Knowing-to-Doing-v1.8.pdf",
    doi: "10.5281/zenodo.23287948",
    zenodo: "https://zenodo.org/records/23287948",
    philpapers: "https://philpapers.org/rec/SAMFKT-2",
    orcid: "https://orcid.org/0009-0004-5819-3017",
  },
  {
    slug: "operational-will",
    title: "Operational Will",
    seriesCode: "A7",
    subtitle: "Commitment, Initiative, and the Question of What an Agent Does Next",
    summary:
      "An agent can remember a commitment and still never return to it. Operational will asks how a long-running artificial agent can recover unfinished obligations, reconsider competing priorities, initiate within its authority, and justify when it should wait.",
    abstract:
      "An agent can remember an obligation and still never return to it. A daily schedule can keep it busy while important work slips away. I call the missing capacity operational will: not a private feeling or a claim of personhood, but a system-level ability to carry legitimate commitments across pauses, initiate within their scope, reconsider attention, and explain both action and deliberate non-action. I propose a bounded architecture: persistent commitments, time and event signals, an active decision model, and an I-Entity, a read-only reviewer that asks questions but cannot command tools. Earlier work on intention and BDI agents already covers much of this territory; the contribution here is a separable, auditable cross-commitment review interface and a falsifiable way to test whether it improves decisions. Dated ZAI records supply difficult design cases: a blocked proposal queue, restraint after permission, and a scheduler that reported success without acting. A proposed seven-condition test asks whether broader attention actually improves decisions over ordinary checklists and critics; the evaluation has not yet been run.",
    url: "https://zawwarsami.com/writing/operational-will",
    datePublished: "2026-10-10",
    tags: [
      "artificial agency",
      "operational will",
      "intention reconsideration",
      "persistent commitments",
      "I-Entity",
      "cross-task attention",
      "agent autonomy",
      "authorization",
      "non-action",
    ],
    kind: "Paper",
    status: "Preprint",
    version: "Version 1.8",
    pages: 10,
    pdf: "/papers/Zawwar-Sami-A7-Operational-Will-v1.8.pdf",
    zenodo: "https://zenodo.org/records/23287842",
    philpapers: "https://philpapers.org/rec/SAMOWC",
    orcid: "https://orcid.org/0009-0004-5819-3017",
  },
  {
    slug: "the-identity-kernel",
    title: "The Identity Kernel",
    seriesCode: "A6",
    subtitle: "Infrastructure, Inner Orientation, and Continuity Across Model Change",
    summary:
      "What survives a model change: the answers an agent remembers, or the questions it has learned to ask before acting? An identity-kernel proposal for decision-time orientation, governed revision, and interrogative continuity.",
    abstract:
      "What survives a model change: the answers an agent remembers, or the questions it has learned to ask before acting? I approach this as an infrastructure problem. A deployed agent can retain records, decision rationales, user-authorized commitments, and ways of attending to uncertainty even when its reasoning model is replaced. I call the decision-guiding subset of that infrastructure an identity kernel. My narrower proposal is an interrogative step: before proposing an action, the system selects task-relevant questions that its history and active commitments make necessary, including questions the latest request does not explicitly ask. This is not a new name for memory or for an identity contract. Existing evaluations already distinguish recall, composition, enactment, and decision-time co-instantiation. The proposed contribution is to make relevance selection before a decision an independently inspectable and falsifiable target: does a governed, versioned orienting step recover consequential, unstated questions across model changes, and does it change what the agent actually does? I specify a limited architecture and matched intervention tests, including delayed and irrelevant-question controls. I report no experimental results. An operationally continuing agent need not preserve the same model or verbal personality, but a plausible continuity claim must include legitimate lineage, authorized revision, and evidence that its inherited orientation still affects decisions. None of this establishes numerical identity or subjective experience.",
    url: "https://zawwarsami.com/writing/the-identity-kernel",
    datePublished: "2026-10-09",
    tags: [
      "artificial agency",
      "identity kernel",
      "interrogative continuity",
      "model replacement",
      "decision-time orientation",
      "agent identity evaluation",
      "authorized revision",
      "I-Entity",
    ],
    kind: "Paper",
    status: "Preprint",
    version: "Version 1.6",
    pages: 9,
    zenodo: "https://zenodo.org/records/23267921",
    philpapers: "https://philpapers.org/rec/SAMTIK",
    orcid: "https://orcid.org/0009-0004-5819-3017",
  },
{
  "slug": "persistent-state-and-becoming",
  "title": "Persistent State and Becoming",
  "seriesCode": "A5",
  "subtitle": "When Memory Becomes Operational History",
  "summary": "When do retained records become a usable past? A distinction between archive, context, persistent state, operational history, and becoming, with tests for how prior events change later behavior.",
  "abstract": "An AI system can keep records for months and still have no usable past. It may retrieve the right sentences yet fail to know what was revoked, what failed, what was later verified, or why the present state differs from an earlier one. I ask where that boundary lies. I distinguish five layers: archive, context, persistent state, operational history, and becoming. My claim is narrow: records become operational history when relations among events—including order, supersession, verified outcome, and provenance—change what the deployed system should do now. I turn that claim into a representation-adequacy test and a counterfactual pre/post-state test for a limited form of system-level becoming. The latter requires a durable, attributable change in later behavior; it does not require model-weight updates and does not imply consciousness or numerical identity. I place the account within recent work on long-term agent memory, use a publication workflow to show how identical surviving records can encode different practical pasts, and specify a controlled M1–M4 evaluation with relational ablations. I do not report a benchmark result. What I am trying to sharpen is the difference between record survival, continuity of work, and adaptation caused by retained experience.",
  "url": "https://zawwarsami.com/writing/persistent-state-and-becoming",
  "datePublished": "2026-10-08",
  "tags": [
    "artificial agents",
    "persistent state",
    "long-term memory",
    "operational history",
    "temporal reasoning",
    "provenance"
  ],
  "kind": "Paper",
  "status": "Preprint",
  "version": "Version 1.5",
  "pages": 11,
  "pdf": "/writing/persistent-state-and-becoming/paper.pdf",
  "zenodo": "https://zenodo.org/records/23221085",
  "philpapers": "https://philpapers.org/rec/SAMPSA-2",
  "orcid": "https://orcid.org/0009-0004-5819-3017"
},
  {
    slug: "the-model-is-not-the-agent",
    title: "The Model Is Not the Agent",
    seriesCode: "A4",
    subtitle: "Boundaries of Capability, Execution, and Authority",
    summary:
      "A method for separating model capability from the wider arrangement that enables action, controls execution, and governs delegated authority in AI agents.",
    abstract:
      "An AI system can retain the same model while its ability to act, its ongoing commitments, and its permissions change. Conversely, a service can replace its model while preserving parts of an ongoing task. These possibilities expose a problem of attribution: which properties belong to the model, and which belong to the arrangement in which it operates? Existing agent research already treats agency architecturally. I build on that position by distinguishing three boundaries: the resources supporting capability, the processes controlling execution, and the mechanisms governing delegated authority. These boundaries can overlap without coinciding. I propose a task-relative boundary audit that combines intervention, control tracing, and explicit treatment of outside dependencies. Four counterexamples show why neither model identity, shared memory, conversational resemblance, nor technical access is sufficient to identify an enduring delegated agent. A worked hypothetical case illustrates the audit; ZAI Memory Hub and zhub provide documented design examples, not experimental validation. Finally, I specify a crossed model-and-architecture evaluation protocol with separate measures for task success, constraint preservation, and unsupported completion. The contribution is a method for making agent-level claims more precise, rather than a new definition of consciousness, a demonstration of general intelligence, or a claim that model capability is unimportant.",
    url: "https://zawwarsami.com/writing/the-model-is-not-the-agent",
    datePublished: "2026-10-06",
    tags: [
      "artificial agency",
      "language agents",
      "cognitive architecture",
      "system boundaries",
      "delegated authority",
      "agent evaluation",
      "model replacement",
    ],
    kind: "Paper",
    status: "Preprint",
    version: "Version 1.0",
    pages: 10,
    doi: "10.5281/zenodo.23195617",
    zenodo: "https://zenodo.org/records/23195617",
    philpapers: "https://philpapers.org/rec/SAMTMI",
    orcid: "https://orcid.org/0009-0004-5819-3017",
  },
  {
    slug: "continuity-oriented-architecture-for-personal-ai",
    title: "A Continuity-Oriented Architecture for Personal AI",
    seriesCode: "A3",
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
    version: "Version 1.2",
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
    seriesCode: "A2",
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
    seriesCode: "A1",
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
