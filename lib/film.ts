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
  tagline: "One continuous take. About half a minute. Four chapters.",
  description:
    "A short cinematic portfolio piece. First-person POV. From the graveyard outside the hut, through the vision, into the room of work, and out the other side. Generated frame-by-frame, scored to silence.",
  filmUrl: `${RELEASE_BASE}/anteroom-film.mp4`,
  posterUrl: "/film/film-poster.jpg",
  durationSeconds: 37,
  endcard: {
    line1: "Not the end.",
    line2: "Only a turning.",
    line3: "To be continued.",
  },
  // Chapter offsets in the continuous film, derived from the build script.
  // s1=5s, s2=15s, s3=10s, s4=5s, with 0.5s crossfades between.
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
      slug: "phone-reveal",
      title: "Phone Reveal",
      subtitle: "The contact, written on a keypad phone.",
      description:
        "POV reaches into the pocket and pulls out a small keypad phone. On its screen: GitHub · zawwarsami16 · ZAI Contact. The reveal is not a CTA; it is a fact. Read or don't.",
      start: 28.5,
      end: 33,
    },
  ] satisfies Chapter[],
} as const;
