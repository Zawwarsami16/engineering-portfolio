import { writings, type WritingEntry } from "./writing";

/** Public records plus explicitly approved numbered roadmap slots. */
export type PublicWork = Pick<WritingEntry,
  "slug" | "title" | "seriesCode" | "summary" | "kind" | "status" | "datePublished" |
  "pdf" | "doi" | "zenodo" | "philpapers" | "version"
>;
export type SynthesisMilestone = {
  id: string;
  title: string;
  status: "future" | "published";
  description: string;
  href?: string;
};
export type ResearchCycle = {
  id: string;
  label: string;
  description: string;
  works: PublicWork[];
  slots?: { prefix: string; count: number; start?: number };
  /** Working titles for unreleased slots; never presented as published work. */
  plannedTitles?: string[];
  synthesis?: SynthesisMilestone;
};
export type ResearchWorld = {
  letter: string;
  title: string;
  keywords: string;
  description: string;
  shortDescription?: string;
  cycles: ResearchCycle[];
};

function publicWorks(slugs: string[]): PublicWork[] {
  return slugs.map((slug) => {
    const entry = writings.find((item) => item.slug === slug && item.status !== "Draft");
    if (!entry) throw new Error(`Missing public Universe record: ${slug}`);
    const { title, seriesCode, summary, kind, status, datePublished, pdf, doi, zenodo, philpapers, version } = entry;
    return { slug, title, seriesCode, summary, kind, status, datePublished, pdf, doi, zenodo, philpapers, version };
  });
}

export const researchWorlds: ResearchWorld[] = [
  {
    letter: "A", title: "Artificial Agency", shortDescription: "Intelligence, agency, and alignment in artificial minds.", keywords: "Intelligence · Agency · Co-creation",
    description: "Exploring artificial agency, human–AI collaboration, and the evolving architecture of intelligent systems.",
    cycles: [{
      id: "a-cycle-1", label: "Cycle 1",
      description: "A growing body of papers on memory, continuity, authority, and the architecture of artificial agency.",
      slots: { prefix: "A", count: 18 },
      works: publicWorks(writings.filter(item => item.status !== "Draft" && /^A([1-9]|1[0-8])$/.test(item.seriesCode ?? "")).sort((a, b) => Number(a.seriesCode!.slice(1)) - Number(b.seriesCode!.slice(1))).map(item => item.slug)),
      synthesis: {
        id: "book-a", title: "Synthesis Book", status: "future",
        description: "A future synthesis of the ideas developed across this body of work.",
      },
    }],
  },
  {
    letter: "C", title: "Cosmology", keywords: "Universe · Origins · Inquiry",
    description: "Questions about the universe, its foundations, and our place within it.", cycles: [],
  },
  {
    letter: "P", title: "Personhood & Philosophy of Mind", keywords: "Identity · Embodiment · Consciousness",
    description: "Inquiry into the living person, soul–body unity, and the nature of identity and mind.",
    cycles: [{
      id: "p-cycle-1", label: "Cycle 1",
      description: "Beginning with the living person and the questions of unity, identity, and embodiment.",
      works: publicWorks(["the-person-before-the-split"]),
    }],
  },
  {
    letter: "S", title: "Security & Adversarial Systems", keywords: "Security · Trust · Adversarial Systems",
    description: "The security of systems, the boundaries of trust, and the study of adversarial behavior.", cycles: [],
  },
  {
    letter: "W", title: "Weapons, Warfare & Defence",
    shortDescription: "Technology, strategy, protection, and the human consequences of conflict.",
    keywords: "Technology · Strategy · Humanity",
    description: "A three-volume inquiry into military technology, intelligent systems, defence and the human consequences of conflict. All 36 papers and three books are planned, not published.",
    cycles: [
      {
        id: "w-volume-1", label: "Weapons Science & Technology",
        description: "Physical foundations, military platforms and technological change.",
        slots: { prefix: "W", start: 1, count: 12 }, works: [],
        plannedTitles: [
          "Weapons as Systems",
          "Scientific Limits and Military Possibility",
          "Materials, Protection, and Technological Change",
          "Energy and the Endurance of Military Systems",
          "Mobility, Propulsion, and Platform Dependence",
          "Land Systems: Protection, Mobility, and Adaptation",
          "Air Power and the Evolution of Military Aviation",
          "Naval Power and Maritime Technology",
          "Undersea Systems and Strategic Uncertainty",
          "Existing Platforms, Emerging Technologies",
          "Why Military Technologies Succeed or Fail",
          "From Scientific Possibility to Demonstrated Capability",
        ],
        synthesis: { id: "w-book-1", title: "Book I — Weapons Science & Technology", status: "future",
          description: "A standalone synthesis planned after the first twelve papers are published, with historical case studies, quantitative analysis and competing interpretations." },
      },
      {
        id: "w-volume-2", label: "Intelligence, Autonomy & Future Warfare",
        description: "Machines, command, space and emerging military systems.",
        slots: { prefix: "W", start: 13, count: 12 }, works: [],
        plannedTitles: [
          "Military Intelligence Beyond the Model",
          "Persistent Memory and Adaptive Military Systems",
          "Distributed Intelligence and Collective Behaviour",
          "Human Authority in Autonomous Systems",
          "Sensing, Interpretation, and Decision Uncertainty",
          "Electronic Warfare and Dependence on the Spectrum",
          "Communication, Distance, and Remote Presence",
          "Space Infrastructure and Military Dependence",
          "Machine-Speed Conflict and Escalation",
          "Simulation, Verification, and the Reality Gap",
          "Emerging Military Concepts: Evidence and Feasibility",
          "Autonomy Across Land, Air, Sea, and Space",
        ],
        synthesis: { id: "w-book-2", title: "Book II — Intelligence, Autonomy & Future Warfare", status: "future",
          description: "A standalone study of autonomy, human authority, verification, uncertainty and future systems planned after W13–W24 are published." },
      },
      {
        id: "w-volume-3", label: "Defence, Strategic Power & Future of War",
        description: "Protection, institutions, industry and human consequences.",
        slots: { prefix: "W", start: 25, count: 12 }, works: [],
        plannedTitles: [
          "Defence as Protection",
          "Resilience Under Persistent Threat",
          "Civilian Infrastructure and Continuity During Conflict",
          "The Industrial Foundations of Military Power",
          "Logistics, Maintenance, and Sustained Capability",
          "The Economics of Defence Technology",
          "Doctrine and Technological Change",
          "Deterrence in an Autonomous Age",
          "Sovereignty and Technological Dependence",
          "Proliferation, Arms Control, and Verification",
          "Humanitarian Consequences and Accountability",
          "Defence Without Killing: Possibilities and Limits",
        ],
        synthesis: { id: "w-book-3", title: "Book III — Defence, Strategic Power & the Future of War", status: "future",
          description: "A standalone examination of protection, strategy, industrial systems and humanitarian consequences planned after W25–W36 are published." },
      },
    ],
  },
  {
    letter: "Z",
    title: "ZAI",
    shortDescription: "Personal autonomous intelligence — research, philosophy, and technical systems.",
    keywords: "Personal AI · Research · Philosophy · Systems",
    description: "A long-term inquiry into personal autonomous intelligence, its development, and its wider questions. The first manuscript will be linked when the approved PDF is released.",
    cycles: [],
  },
];
