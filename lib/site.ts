export const site = {
  name: "Zawwar Sami",
  shortName: "ZS",
  role: "Engineer · Builder of ZAI",
  email: "zawwarsami16@gmail.com",
  location: {
    country: "Canada",
    label: "Canada",
    timezone: "America/Toronto",
  },
  studio: {
    name: "Anteroom Studio",
    tagline: "the room before the room",
    foundedYear: "2019",
    url: "https://github.com/anteroom-studio",
  },
  socials: {
    github: "https://github.com/Zawwarsami16",
    githubOrg: "https://github.com/anteroom-studio",
    linkedin: "https://www.linkedin.com/in/zawwarsami",
    twitter: "https://twitter.com/Kh4nZawwar",
    substack: "https://zawwar16.substack.com",
    hub: "https://hub.zawwarsami.com",
    htb: "https://app.hackthebox.com/public/users/2469522",
    htbProgress: "https://github.com/Zawwarsami16/htb-progress",
  },
  writing: [
    {
      slug: "pause-substrate-cooperative-mind",
      title: "The Pause, the Substrate, the Cooperative Mind",
      summary:
        "Three philosophical observations the present moment has made unusually visible — on speech, the body, and why a finite being fights. Held lightly.",
      url: "https://zawwar16.substack.com/p/pause-substrate-cooperative-mind",
      datePublished: "2026-05-26",
      tags: ["philosophy of mind", "presence", "Islamic philosophy"],
    },
    {
      slug: "two-ais",
      title: "Two AIs",
      summary:
        "Artificial vs. Autonomous Intelligence — why the words we use shape what we build, and the case for personal AI as a category distinct from labs.",
      url: "https://zawwar16.substack.com/p/two-ais",
      datePublished: "2026-05-22",
      tags: ["AGI", "personal AI", "philosophy of mind"],
    },
  ],
  nav: [
    { label: "About", href: "/about" },
    { label: "Stack", href: "/stack" },
    { label: "Work", href: "/work" },
    { label: "Writing", href: "/writing" },
    { label: "Film", href: "/film" },
    { label: "Contact", href: "/contact" },
  ],
  status: {
    available: true,
    label: "Available for new opportunities",
  },
} as const;
