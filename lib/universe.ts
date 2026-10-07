import { writings, type WritingEntry } from "./writing";

/** Public catalogue only. Never put unpublished paper IDs or private plans here. */
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
      works: publicWorks([
        "when-is-an-ai-personal", "what-survives-a-model-change",
        "continuity-oriented-architecture-for-personal-ai", "the-model-is-not-the-agent",
      ]),
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
];
