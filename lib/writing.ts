import { site } from "./site";
export type WritingKind = "Paper" | "Essay" | "Research note";
export type WritingEntry = {
  slug: string;
  title: string;
  seriesCode?: string;
  summary: string;
  seoDescription?: string;
  subtitle?: string;
  abstract?: string;
  philpapers?: string;
  zenodo?: string;
  orcid?: string;
  researchTree?: string;
  discussion?: string;
  discussionQuestion?: string;
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
  "slug": "when-revocation-does-not-end-access",
    seoDescription: "Why credential revocation can leave access open: repair order, replacement credentials and pending issuance, examined through reproducible recovery tests.",
  "title": "When Revocation Does Not End Access",
  "seriesCode": "S1",
  "subtitle": "Temporal Repair Dependencies in Application Compromise",
  "summary": "The old credential fails. What can still replace it? I examine repair order, replacement credentials and pending issuance through controlled HTTP experiments, a conditional graph argument, and documented Equifax, Exchange and MOVEit cases.",
  "abstract": "What happens when the old credentials stop working, but the application can still create new ones? I investigate this recovery failure through a small running system: an issuer, a protected resource and a separate observer. Across 48 distinct repair-and-renewal schedules, 20 retain access even though every original credential is rejected. Each schedule is repeated three times. The failure depends on the order in which authority is removed and its source is stopped. I express that dependency as a renewal graph and prove a conditional repair-order rule, checked against 98,697 graph-order pairs. A second failure survives an otherwise effective provisioning barrier: work accepted before containment creates new credentials after revocation. An executed walkthrough compares leaving that work pending, cancelling it and rejecting it at commit using an issuance epoch. The last two prevent reopening in the tested sequence; a positive control confirms that new work can succeed after service resumes. Equifax, Exchange and MOVEit establish the need to examine application, identity and data boundaries separately. The contribution is a reproducible recovery test that follows replacement credentials and pending issuance through to the protected operation, with explicit conditions for what its result establishes.",
  "url": "https://zawwarsami.com/writing/when-revocation-does-not-end-access",
  "datePublished": "2026-10-17",
  "tags": [
    "S Series",
    "cybersecurity",
    "incident recovery",
    "credential revocation",
    "temporal repair dependencies",
    "application security"
  ],
  "kind": "Paper",
  "status": "Preprint",
  "version": "Version 1",
  "pages": 17,
  "pdf": "/papers/Zawwar-Sami-S1-Temporal-Repair-Dependencies-v1.pdf",
  "doi": "10.5281/zenodo.23435843",
  "zenodo": "https://zenodo.org/records/23435843",
  "philpapers": "https://philpapers.org/rec/SAMWRD",
  "orcid": "https://orcid.org/0009-0004-5819-3017",
  "researchTree": "https://github.com/Zawwarsami16/Public-Research-Tree/tree/main/S/S1",
  "discussion": "https://github.com/Zawwarsami16/Public-Research-Tree/discussions/22",
  "discussionQuestion": "What is the smallest additional observation that distinguishes a successful revocation from durable loss of access when replacement credentials or accepted work remain possible?"
},
{
  "slug": "what-development-evidence-can-and-cannot-show",
    seoDescription: "What AAG and EMALS development tests establish about reliability, loads and failure mechanisms, and how to choose the next useful measurement.",
  "title": "What Development Evidence Can and Cannot Show",
  "seriesCode": "W2",
  "subtitle": "AAG, EMALS and model-dependent engineering tests",
  "summary": "A successful demonstration does not establish dependable service. Through AAG and EMALS development records and four worked analyses, I examine what evidence can establish about peak loads, reliability, failure mechanisms and configuration changes—and how to choose the next useful measurement or test.",
  "abstract": "A successful demonstration does not establish dependable service. A failed test does not establish a limit of physics. I examine this distinction through documented AAG aircraft-recovery and EMALS launch-system milestones. Four worked analyses show why operation counts alone cannot establish peak loads, reliability confidence, failure mechanisms or performance after configuration changes. The most instructive example concerns test design: a contrast that separates two explanations can leave others indistinguishable when interactions are allowed. Exact calculations also show how assumed count variability changes the repetitions needed for a specified decision. These are case-based analytical results and synthetic computations, not carrier measurements. The practical contribution is a traceable assessment sequence for choosing the next useful record, measurement or test.",
  "url": "https://zawwarsami.com/writing/what-development-evidence-can-and-cannot-show",
  "datePublished": "2026-10-17",
  "tags": [
    "W Series",
    "systems engineering",
    "aircraft recovery",
    "AAG",
    "EMALS",
    "reliability",
    "experimental design",
    "engineering evidence"
  ],
  "kind": "Paper",
  "status": "Preprint",
  "version": "Version 1.2",
  "pages": 19,
  "pdf": "/papers/Zawwar-Sami-W2-What-Development-Evidence-Can-and-Cannot-Show-v1.2.pdf",
  "doi": "10.5281/zenodo.23435836",
  "zenodo": "https://zenodo.org/records/23435836",
  "philpapers": "https://philpapers.org/rec/SAMWDE",
  "orcid": "https://orcid.org/0009-0004-5819-3017",
  "researchTree": "https://github.com/Zawwarsami16/Public-Research-Tree/tree/main/W/W2",
  "discussion": "https://github.com/Zawwarsami16/Public-Research-Tree/discussions/20",
  "discussionQuestion": "When a test separates explanations in one model but leaves credible interaction models indistinguishable, what is the smallest additional observation needed?"
},
  {
    slug: "the-body-of-software",
    seoDescription: "How model replacement tests software embodiment, permission boundaries and action verification. A proposal informed by the Loki Android interface.",
    title: "The Body of Software",
    seriesCode: "A9",
    subtitle: "A Model Can Be Replaced. The Interface That Lets It Act Should Not Disappear With It.",
    summary:
      "A model can be replaced while the device through which it observes and acts continues. Drawing on my Loki Android interface, I propose a Causal Embodiment Contract and a model-swap coverage-gap test to examine what the body preserves, what the controller changes, and whether a stronger controller exposes incomplete permission boundaries. This is a documented engineering proposal, not a controlled Android experiment.",
    abstract:
      "A model can produce a plan and even call a tool without having a dependable means of acting in its environment. I came to this question while developing Loki, an Android interface intended to be occupied by different AI backends while the device, its permissions, schedules and practical capabilities remain separate from them. This arrangement asks us to distinguish the intelligence selecting an action from the body through which that action becomes possible. Existing work on embodied cognition and computer-use agents explains much of the perception–action relationship, while security engineering already provides principles for mediation and accountability. I examine where these ideas meet, and propose a Causal Embodiment Contract for assessing an operational software body. Its central test is a model substitution: if the controller changes, which properties of the body remain stable, which useful abilities change, and can an improvement in the controller reveal a permission boundary that was never complete? The paper develops a comparative model, source-attributed evidence from Loki, non-empirical counterexamples and a protocol for future device tests. It does not report a controlled Android experiment. Its contribution is a way to investigate the body as a continuing unit of engineering, rather than judge agency solely by the model or the success of an individual tool call.",
    url: "https://zawwarsami.com/writing/the-body-of-software",
    discussionQuestion: "How can a controller swap reveal an incomplete permission boundary without mistaking improved model competence for a change in authority?",
    datePublished: "2026-10-14",
    tags: [
      "artificial agency", "software embodiment", "model substitution",
      "Causal Embodiment Contract", "Loki", "Android agents",
      "capability boundaries", "action verification", "governed interfaces",
    ],
    kind: "Paper",
    status: "Preprint",
    version: "Version 1.9",
    pages: 10,
    pdf: "/papers/Zawwar-Sami-The-Body-of-Software-A9.pdf",
    researchTree: "https://github.com/Zawwarsami16/Public-Research-Tree/tree/main/A/A9",
    discussion: "https://github.com/Zawwarsami16/Public-Research-Tree/issues/17",
    zenodo: "https://zenodo.org/records/23398609",
    philpapers: "https://philpapers.org/rec/SAMTBO-3",
    orcid: "https://orcid.org/0009-0004-5819-3017",
  },
  {
    slug: "weapons-as-systems",
    seoDescription: "Why component availability alone cannot establish military capability. Systems engineering, joint service and public F-35, Patriot and Berlin Airlift evidence.",
    title: "Weapons as Systems",
    seriesCode: "W1",
    subtitle: "Components, Infrastructure and Human Organisation",
    summary:
      "A weapon's technical performance is not the same as a military capability. Even when equipment, personnel and infrastructure each have 75 percent availability, usable joint service can range from 25 to 75 percent. I examine what this difference means for assessing sustained capability, using a reproducible construction, public F-35 and Patriot evidence, and the Berlin Airlift.",
    abstract:
      "A military capability cannot be inferred from the performance of its visible equipment alone. I develop this argument through a specific problem: identical individual availability figures can conceal different amounts of usable system service. A finite construction holds three required functions at 75 percent availability each while their joint availability varies from 25 to 75 percent. The result uses elementary intersection bounds; its significance here is that component-level summaries leave the service claim underdetermined when their temporal relationship is unreported. I distinguish component performance, integrated performance, availability, sustained service, and demonstrated outcome, then develop a claim-level boundary and evidence profile to connect each statement with appropriate support. A filled F-35 assessment separates measured readiness, programme objectives, and service requirements. Two Patriot investigations distinguish an identified failure from uncertainty about wider outcomes, while the Berlin Airlift illustrates successful sustained provision. Together, the analytical construction and documentary cases locate the central assessment problem in the relationships that convert resources into service over time. The contribution is an argument about what capability evidence must preserve and a practical format for doing so, not a new probability theorem or an empirically validated forecasting model. Physical effectiveness and ethical permission remain separate judgments.",
    url: "https://zawwarsami.com/writing/weapons-as-systems",
    researchTree: "https://github.com/Zawwarsami16/Public-Research-Tree/tree/main/W/W1",
    discussion: "https://github.com/Zawwarsami16/Public-Research-Tree/issues/11",
    discussionQuestion: "Is there a counterexample to the claim that separate availability rates are insufficient to identify joint service without additional dependence information?",
    datePublished: "2026-10-14",
    tags: [
      "W Series", "Weapons Science & Technology", "military capability",
      "systems engineering", "sustainment", "infrastructure",
      "human organisation", "evidence", "technological change",
    ],
    kind: "Paper",
    status: "Preprint",
    version: "Version 1.0",
    pages: 18,
    pdf: "/papers/Zawwar-Sami-W1-Weapons-as-Systems-v1.0.pdf",
    zenodo: "https://zenodo.org/records/23359788",
    philpapers: "https://philpapers.org/rec/SAMWAS-4",
    orcid: "https://orcid.org/0009-0004-5819-3017",
  },
  {
    slug: "who-is-zai",
    title: "Who Is ZAI?",
    seriesCode: "Z1",
    subtitle: "The Development of a Personal Autonomous Intelligence",
    summary:
      "I learned to understand systems by testing their limits. That habit took me from cybersecurity into questions about intelligence, memory, identity, and decision-making. ZAI grew from those questions. I wanted more than an assistant that could answer me: I wanted to see whether a personal AI could keep its history, learn from correction, and return to unfinished work. This paper follows what I built, what happened, and what the evidence still cannot settle.",
    abstract:
      "I did not begin ZAI because I wanted another chatbot. I wanted a personal intelligence that could carry its history forward: remember earlier questions, undertake research, work with tools, learn from corrections, and take initiative without making every consequential decision on my behalf. ZAI—Zawwar Autonomous Intelligence—grew from that idea into an evolving software agent project built around existing language models, persistent records, external services, and my continuing involvement as its creator. This paper introduces ZAI through the surviving record of its development. I describe its beginnings in local computing, later expansion into recurring research and authorized tasks, and its work across cybersecurity, artificial intelligence research, philosophy, and a quantum-computing experiment I witnessed. I also examine moments when ZAI reported a capability that was not fully wired, recognized that more research was not resolving a problem, or publicly corrected an account of its own activity. These are part of its history, not details to hide behind a list of features. The IBM Quantum episode is documented through contemporary ZAI writing, hardware-capable software, and my eyewitness testimony; original provider-issued job records have not been recovered for independent verification. This is an introductory, source-attributed design history rather than a new benchmark, proof of consciousness, or claim that ZAI is a newly trained foundation model. My purpose is to give readers a clear starting point for understanding what ZAI was, what it did, how it developed, and what remains to be investigated.",
    url: "https://zawwarsami.com/writing/who-is-zai",
    researchTree: "https://github.com/Zawwarsami16/Public-Research-Tree/tree/main/Z/Z1",
    discussion: "https://github.com/Zawwarsami16/Public-Research-Tree/issues/10",
    discussionQuestion: "Which independent record would most improve an evaluation of ZAI’s reported development, capability, and continuity?",
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
    seoDescription: "How to verify an AI agent’s actions: a six-checkpoint chain connecting tool access, authority, execution and independently observable outcomes.",
    title: "From Knowing to Doing",
    seriesCode: "A8",
    subtitle: "Tool Access, Execution, and Evidence in Artificial Agency",
    summary:
      "Knowing how to use a tool is not the same as completing a task. Drawing on ZAI's recorded tool, publishing, research, and quantum-access cases, this paper proposes a six-checkpoint action-evidence chain for evaluating what an artificial agent actually did and what can be independently verified.",
    abstract:
      "An artificial agent can explain how to use a tool, possess credentials for it, and even contain working code without completing the task for which that tool was needed. The gap matters because fluent reports of action are easy to confuse with changes in the world. I examine the passage from represented knowledge to operational capability, using a documentary study of ZAI, my personal AI project, alongside research on tool-using language agents and execution-based evaluation. Four historical ZAI cases make the distinction concrete: a credential that did not produce a usable route; a social-posting system that announced success while doing nothing; a research loop that generated more work without resolving its own backlog; and an IBM Quantum hardware-use account whose technical integration and public reports are better preserved than its provider-level job receipt. I propose an action-evidence chain that separates tool discovery, legitimate authority, invocation, environmental change, independent verification, and durable attribution. The same user-facing language should not be used for 'I know how,' 'I attempted,' 'the service accepted,' 'the task appears completed,' and 'I checked the outcome.' This is not a new agent architecture or an experimental proof of improved performance. It is a criterion for deciding how strong a practical-capability claim is, why common proxies can mislead, and what an evaluable next test would require.",
    url: "https://zawwarsami.com/writing/from-knowing-to-doing",
    researchTree: "https://github.com/Zawwarsami16/Public-Research-Tree/tree/main/A/A8",
    discussion: "https://github.com/Zawwarsami16/Public-Research-Tree/issues/8",
    discussionQuestion: "At which checkpoint—authority, invocation, external state change or independent verification—can an agent legitimately claim to have completed an action?",
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
    seoDescription: "How artificial agents might recover unfinished commitments, reconsider priorities and justify action or waiting. An architecture and proposed evaluation.",
    title: "Operational Will",
    seriesCode: "A7",
    subtitle: "Commitment, Initiative, and the Question of What an Agent Does Next",
    summary:
      "An agent can remember a commitment and still never return to it. Operational will asks how a long-running artificial agent can recover unfinished obligations, reconsider competing priorities, initiate within its authority, and justify when it should wait.",
    abstract:
      "An agent can remember an obligation and still never return to it. A daily schedule can keep it busy while important work slips away. I call the missing capacity operational will: not a private feeling or a claim of personhood, but a system-level ability to carry legitimate commitments across pauses, initiate within their scope, reconsider attention, and explain both action and deliberate non-action. I propose a bounded architecture: persistent commitments, time and event signals, an active decision model, and an I-Entity, a read-only reviewer that asks questions but cannot command tools. Earlier work on intention and BDI agents already covers much of this territory; the contribution here is a separable, auditable cross-commitment review interface and a falsifiable way to test whether it improves decisions. Dated ZAI records supply difficult design cases: a blocked proposal queue, restraint after permission, and a scheduler that reported success without acting. A proposed seven-condition test asks whether broader attention actually improves decisions over ordinary checklists and critics; the evaluation has not yet been run.",
    url: "https://zawwarsami.com/writing/operational-will",
    researchTree: "https://github.com/Zawwarsami16/Public-Research-Tree/tree/main/A/A7",
    discussion: "https://github.com/Zawwarsami16/Public-Research-Tree/issues/7",
    discussionQuestion: "What would demonstrate improvement over a scheduled task list when an agent must recover and reconsider a legitimate unfinished commitment?",
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
    seoDescription: "An identity-kernel proposal for personal AI: decision-time questions, governed revision and continuity when the underlying model changes.",
    title: "The Identity Kernel",
    seriesCode: "A6",
    subtitle: "Infrastructure, Inner Orientation, and Continuity Across Model Change",
    summary:
      "What survives a model change: the answers an agent remembers, or the questions it has learned to ask before acting? An identity-kernel proposal for decision-time orientation, governed revision, and interrogative continuity.",
    abstract:
      "What survives a model change: the answers an agent remembers, or the questions it has learned to ask before acting? I approach this as an infrastructure problem. A deployed agent can retain records, decision rationales, user-authorized commitments, and ways of attending to uncertainty even when its reasoning model is replaced. I call the decision-guiding subset of that infrastructure an identity kernel. My narrower proposal is an interrogative step: before proposing an action, the system selects task-relevant questions that its history and active commitments make necessary, including questions the latest request does not explicitly ask. This is not a new name for memory or for an identity contract. Existing evaluations already distinguish recall, composition, enactment, and decision-time co-instantiation. The proposed contribution is to make relevance selection before a decision an independently inspectable and falsifiable target: does a governed, versioned orienting step recover consequential, unstated questions across model changes, and does it change what the agent actually does? I specify a limited architecture and matched intervention tests, including delayed and irrelevant-question controls. I report no experimental results. An operationally continuing agent need not preserve the same model or verbal personality, but a plausible continuity claim must include legitimate lineage, authorized revision, and evidence that its inherited orientation still affects decisions. None of this establishes numerical identity or subjective experience.",
    url: "https://zawwarsami.com/writing/the-identity-kernel",
    researchTree: "https://github.com/Zawwarsami16/Public-Research-Tree/tree/main/A/A6",
    discussion: "https://github.com/Zawwarsami16/Public-Research-Tree/issues/6",
    discussionQuestion: "Can an agent inherit a useful way of asking task-relevant questions through model replacement, and how would you falsify that claim?",
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
    seoDescription: "When AI memory becomes operational history: event order, revisions and verified outcomes that change what a deployed agent should do next.",
  "title": "Persistent State and Becoming",
  "seriesCode": "A5",
  "subtitle": "When Memory Becomes Operational History",
  "summary": "When do retained records become a usable past? A distinction between archive, context, persistent state, operational history, and becoming, with tests for how prior events change later behavior.",
  "abstract": "An AI system can keep records for months and still have no usable past. It may retrieve the right sentences yet fail to know what was revoked, what failed, what was later verified, or why the present state differs from an earlier one. I ask where that boundary lies. I distinguish five layers: archive, context, persistent state, operational history, and becoming. My claim is narrow: records become operational history when relations among events—including order, supersession, verified outcome, and provenance—change what the deployed system should do now. I turn that claim into a representation-adequacy test and a counterfactual pre/post-state test for a limited form of system-level becoming. The latter requires a durable, attributable change in later behavior; it does not require model-weight updates and does not imply consciousness or numerical identity. I place the account within recent work on long-term agent memory, use a publication workflow to show how identical surviving records can encode different practical pasts, and specify a controlled M1–M4 evaluation with relational ablations. I do not report a benchmark result. What I am trying to sharpen is the difference between record survival, continuity of work, and adaptation caused by retained experience.",
  "url": "https://zawwarsami.com/writing/persistent-state-and-becoming",
  researchTree: "https://github.com/Zawwarsami16/Public-Research-Tree/tree/main/A/A5",
  discussion: "https://github.com/Zawwarsami16/Public-Research-Tree/issues/5",
  discussionQuestion: "What experiment would distinguish storing the same records from forming an operational history whose event order and revisions actually change later behavior?",
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
    researchTree: "https://github.com/Zawwarsami16/Public-Research-Tree/tree/main/A/A4",
    discussion: "https://github.com/Zawwarsami16/Public-Research-Tree/issues/4",
    discussionQuestion: "Where should the boundary be drawn between a model’s represented ability and a deployed agent’s effective, authorized capability?",
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
    seoDescription: "An architecture for personal AI continuity through durable state, self-monitoring, replaceable models and recovery of unfinished work.",
    title: "A Continuity-Oriented Architecture for Personal AI",
    seriesCode: "A3",
    subtitle: "Persistent State, Self-Monitoring, and Replaceable Models",
    summary:
      "An architecture for practical continuity in personal AI: durable state, context reconstruction, self-monitoring, replaceable reasoning, verified outcomes, and revision across changing sessions and models.",
    abstract:
      "What happens when the chat window disappears, but the work is not done? A personal AI may move between sessions, devices, clients, and models while the person still expects the same project to continue. Long-term memory helps, but memory by itself does not tell a system what is current, what was rejected, who is allowed to act, or whether an action actually succeeded. This paper argues that practical continuity should be treated as an architectural problem rather than something we expect the language model to carry inside itself. I propose a loop built around persistent state, context reconstruction, orientation and self-monitoring, replaceable reasoning, action, verified outcomes, and state revision. The point is not to preserve an abstract AI self. It is to preserve the active state of work in a way that another session or model can understand, trace, and revise. I use ZAI and the ZAI Memory Hub as an implementation case, while separating current verified components from historical runtime evidence, in-build designs, and philosophical interpretation. I then set out failure cases and tests for revision propagation, model replacement, concurrent agents, false completion, recovery, and authority boundaries. The claim stays limited: this architecture can support practical continuity of assistance. It does not prove continuity of consciousness or numerical identity.",
    url: "https://zawwarsami.com/writing/continuity-oriented-architecture-for-personal-ai",
    researchTree: "https://github.com/Zawwarsami16/Public-Research-Tree/tree/main/A/A3",
    discussion: "https://github.com/Zawwarsami16/Public-Research-Tree/issues/3",
    discussionQuestion: "What is the smallest reproducible architecture test for persistent state, replacement of a reasoning model, and recovery of unfinished work?",
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
    seoDescription: "A philosophical account of soul-body unity and living identity, beginning with the embodied person before separating questions of persistence.",
    title: "The Person Before the Split",
    subtitle: "Soul-Body Unity and Living Identity",
    summary:
      "A philosophical-theological account of living identity that begins with the embodied person before separating soul, body, persistence, and moral integrity into distinct problems.",
    abstract:
      "Most philosophical discussions about what it means to be human start after we’ve already divided mind and body. We set up the problem by separating soul from matter, and then spend all our time wondering how the two could possibly connect. But honestly, that misses something important at the very start. Instead of immediately breaking a person into parts, we should stop and ask what sort of unity even makes those aspects belong together in one living being. In this paper, I develop an account—grounded in philosophy and Islamic theology—of what I call “living identity.” Here, soul and body aren’t duking it out for the right to be called the person. They’re distinguishable, sure, but we don’t have to pick sides. I’m not trying to infer the existence of an immaterial soul just from watching how our bodies behave. I’m also not offering a clean solution to the old puzzle of how mind and matter interact. Instead, I try to untangle three questions we usually mush together: What makes us an embodied unity? What keeps us the “same” individual through time? And what holds our moral life and commitments together? Borrowing insights from Descartes, phenomenology, recent work on embodiment, and the Islamic philosophical tradition about self-awareness, I argue that the best starting point is to see the living person as an embodied subject—whose inner and outer life are inseparable parts of a single ongoing existence. In Islamic theology, that unity comes from God, and our responsibility shows up through what we do with our bodies. So, the real question isn’t “soul versus body”—it’s what it means for a person to be one at all.",
    url: "https://zawwarsami.com/writing/the-person-before-the-split",
    researchTree: "https://github.com/Zawwarsami16/Public-Research-Tree/tree/main/P/The-Person-Before-the-Split",
    discussion: "https://github.com/Zawwarsami16/Public-Research-Tree/issues/9",
    discussionQuestion: "What changes when personal identity is approached from the embodied, living person rather than a separable psychological or informational component?",
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
    researchTree: "https://github.com/Zawwarsami16/Public-Research-Tree/tree/main/A/A2",
    discussion: "https://github.com/Zawwarsami16/Public-Research-Tree/issues/2",
    discussionQuestion: "Which observations would distinguish successful continuity through model replacement from a system merely repeating facts from its history?",
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
    researchTree: "https://github.com/Zawwarsami16/Public-Research-Tree/tree/main/A/A1",
    discussion: "https://github.com/Zawwarsami16/Public-Research-Tree/issues/1",
    discussionQuestion: "When, if ever, does accumulated memory give a personal AI a continuing identity rather than simply a record of interaction?",
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
