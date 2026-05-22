export type Chapter = {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  // Time offset in the continuous film (seconds)
  start: number;
  end: number;
};

const RELEASE_BASE =
  "https://github.com/Zawwarsami16/engineering-portfolio/releases/download/film-v1";

export const film = {
  title: "The Anteroom Film",
  tagline: "One continuous take. About a minute. Five chapters.",
  description:
    "First-person. Silent. Watch it once.",
  filmUrl: `${RELEASE_BASE}/anteroom-film.mp4`,
  posterUrl: "/film/film-poster.jpg",
  durationSeconds: 56,
  endcard: {
    line1: "Not the end.",
    line2: "Only a turning.",
    line3: "To be continued.",
  },
  // Chapter offsets in the continuous film.
  // s1=5, s2=15, s3=10, s4=5+1.8 hold, s5=5+2.5 hold, s6=10+0.5 hold, end=4
  // with 0.5s crossfades between adjacent clips.
  // Phone Reveal (between Skills Room and Graveyard of Knowledge) still plays
  // in the film as a beat but isn't navigable from the page — the still on
  // screen is enough commentary for it.
  chapters: [
    {
      number: 1,
      slug: "glass-identity",
      title: "Glass / Identity",
      subtitle: "The graveyard, the table, and the name on the glass",
      description:
        "POV outside a small hut, in a graveyard, at night. The sky is a crimson nebula. On a wooden table beside the door, a rectangular glass object catches the light. The protagonist picks it up. The glass reflects the sky and reveals identity.",
      start: 0,
      end: 4.5,
    },
    {
      number: 2,
      slug: "vision-return",
      title: "Look Up / Vision / Return",
      subtitle: "Through the nebula. The terminal. The graveyard of achievements.",
      description:
        "POV tilts up into the crimson sky. The ascent goes through the nebula until a single terminal — ZAI, Living Intelligence — appears. The vision fades. POV returns to the ground, now standing in a graveyard of achievements: Built Intelligence, Architect of ZAI, From Vision to Execution.",
      start: 4.5,
      end: 19,
    },
    {
      number: 3,
      slug: "skills-room",
      title: "Skills Room",
      subtitle: "Inside the hut. The work, written into the walls.",
      description:
        "POV enters the hut. The skills are carved into its surfaces as environmental detail: SWE Systems, Web Engineering, Automation, Product Thinking, Cinematic Interfaces, Strategy, Architect of ZAI. The chest sits in the corner. The graveyard is visible through the window.",
      start: 19,
      end: 28.5,
    },
    {
      number: 4,
      slug: "graveyard-of-knowledge",
      title: "Graveyard of Knowledge",
      subtitle: "Standing in the field of work, made into ground.",
      description:
        "POV stops at the threshold of a graveyard whose headstones do not bear names. They bear concepts. MACHINE LEARNING. NEURAL NETWORKS. DEEP LEARNING. GENERATIVE MODELS. DATA ENGINEERING. HIGH PERFORMANCE COMPUTING. ARCHITECT OF ZAI. ALGORITHMS & DATA STRUCTURES. TOWARDS AGI. The lightning answers the sky. The protagonist holds the moment.",
      start: 34.8,
      end: 42.3,
    },
    {
      number: 5,
      slug: "anteroom",
      title: "The Anteroom",
      subtitle: "Pulling back to see the room before the room.",
      description:
        "The camera lifts away from the gravestones. The full landscape comes into view: the wide graveyard, the small hut on the right, the wooden table beside it where the glass was first found. The world the protagonist has been moving through, now seen from outside. The room before the room.",
      start: 42.3,
      end: 52,
    },
  ] satisfies Chapter[],
} as const;
