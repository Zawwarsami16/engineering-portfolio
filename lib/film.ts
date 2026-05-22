export type Scene = {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  durationLabel: string;
  videoUrl: string;
  posterUrl: string;
};

const RELEASE_BASE =
  "https://github.com/Zawwarsami16/engineering-portfolio/releases/download/film-v1";

export const film = {
  title: "The Anteroom Film",
  tagline: "A first-person POV portfolio. Five scenes. About fifty seconds.",
  description:
    "A short cinematic piece that walks the viewer through who I am, the way I want it walked: from outside the hut into the chest, with the work shown the way the work is actually held — privately, in the dark, and only quietly. Generated frame-by-frame in Runway Gen-3, scored to silence.",
  endcard: {
    line1: "Not the end.",
    line2: "Only a turning.",
    line3: "To be continued.",
  },
  scenes: [
    {
      number: 1,
      slug: "glass-identity",
      title: "Glass / Identity",
      subtitle: "The graveyard, the table, and the name on the glass",
      description:
        "POV outside a small hut, in a graveyard, at night. The sky is a crimson nebula. On a wooden table beside the door, a rectangular glass object catches the light. The protagonist picks it up. The glass reflects the sky and reveals identity.",
      durationLabel: "~10s",
      videoUrl: `${RELEASE_BASE}/scene1.mp4`,
      posterUrl: "/film/scene1-poster.jpg",
    },
    {
      number: 2,
      slug: "vision-return",
      title: "Look Up / Vision / Return",
      subtitle: "Through the nebula. The terminal. The graveyard of achievements.",
      description:
        "POV tilts up into the crimson sky. The ascent goes through the nebula until a single terminal — ZAI, Living Intelligence — appears. The vision fades. POV returns to the ground, now standing in a graveyard of achievements: Built Intelligence, Architect of ZAI, From Vision to Execution.",
      durationLabel: "~15s",
      videoUrl: `${RELEASE_BASE}/scene2.mp4`,
      posterUrl: "/film/scene2-poster.jpg",
    },
    {
      number: 3,
      slug: "skills-room",
      title: "Skills Room",
      subtitle: "Inside the hut. The work, written into the walls.",
      description:
        "POV enters the hut. The skills are carved into its surfaces as environmental detail: SWE Systems, Web Engineering, Automation, Product Thinking, Cinematic Interfaces, Strategy, Architect of ZAI. The chest sits in the corner. The graveyard is visible through the window.",
      durationLabel: "~12s",
      videoUrl: `${RELEASE_BASE}/scene3.mp4`,
      posterUrl: "/film/scene3-poster.jpg",
    },
    {
      number: 4,
      slug: "phone-reveal",
      title: "Phone Reveal",
      subtitle: "The contact, written on a keypad phone.",
      description:
        "POV reaches into the pocket and pulls out a small keypad phone. On its screen: GitHub · zawwarsami16 · ZAI Contact. The reveal is not a CTA; it is a fact. Read or don't.",
      durationLabel: "~6s",
      videoUrl: `${RELEASE_BASE}/scene4.mp4`,
      posterUrl: "/film/scene4-poster.jpg",
    },
    {
      number: 5,
      slug: "diary-end",
      title: "Diary / Close",
      subtitle: "The diary, the floor, the closing of the eyes.",
      description:
        "POV crosses to the chest, lifts the diary out, settles cross-legged on the wooden floor of the hut. The skills are visible on the back wall. The graveyard is visible through the window. The eyes slowly close. The frame quietly fades.",
      durationLabel: "~10s",
      videoUrl: `${RELEASE_BASE}/scene5.mp4`,
      posterUrl: "/film/scene5-poster.jpg",
    },
  ] satisfies Scene[],
} as const;
