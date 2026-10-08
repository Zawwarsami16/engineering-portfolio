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
  slots?: { prefix: string; count: number };
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
];
