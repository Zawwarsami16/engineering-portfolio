import type { TechName } from "@/components/ui/TechIcon";

export type StackEntry = {
  name: string;
  icon: TechName;
  rationale: string;
  level: "daily" | "comfortable" | "shipping";
};

export type StackCategory = {
  id: string;
  title: string;
  blurb: string;
  size: "wide" | "tall" | "sq";
  items: StackEntry[];
};

export const stack: StackCategory[] = [
  {
    id: "ai-models",
    title: "AI & models",
    blurb:
      "Python, data, and persistent systems are the working tools behind ZAI, research experiments, and infrastructure.",
    size: "wide",
    items: [
      {
        name: "Python",
        icon: "python",
        rationale: "Main language for ZAI, the World Model, Oracle, and most internal tooling.",
        level: "daily",
      },
      {
        name: "PostgreSQL",
        icon: "postgres",
        rationale: "Persistent state and structured records for AI infrastructure, research tools, and time-series projects.",
        level: "daily",
      },
      {
        name: "Node.js",
        icon: "node",
        rationale: "Glue layer for the trading terminal and the Next-side APIs.",
        level: "comfortable",
      },
      {
        name: "Supabase",
        icon: "supabase",
        rationale: "Auth + storage when a project needs to ship fast without becoming infra.",
        level: "shipping",
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb:
      "Interfaces for research and real use: legible records, clear controls, and responsive reading experiences.",
    size: "tall",
    items: [
      {
        name: "Next.js",
        icon: "next",
        rationale: "App Router, server components, streaming. Default for product work.",
        level: "daily",
      },
      {
        name: "React",
        icon: "react",
        rationale: "Composable UI, expressive state. The substrate I think in.",
        level: "daily",
      },
      {
        name: "TypeScript",
        icon: "typescript",
        rationale: "Strict mode always. Types as a design tool, not a tax.",
        level: "daily",
      },
      {
        name: "Tailwind CSS",
        icon: "tailwind",
        rationale: "Tokens via @theme. Fast iteration without CSS sprawl.",
        level: "daily",
      },
    ],
  },
  {
    id: "platform",
    title: "Platform",
    blurb: "Shipping, monitoring, and keeping the lights on without ceremony.",
    size: "sq",
    items: [
      {
        name: "Docker",
        icon: "docker",
        rationale: "Reproducible builds, simple deploy targets for the studio's services.",
        level: "comfortable",
      },
      {
        name: "GitHub",
        icon: "github",
        rationale: "Source of truth + CI. Anteroom Studio's work lives here in the open.",
        level: "daily",
      },
    ],
  },
];

export const philosophy = [
  {
    title: "Long memory beats hot takes",
    body:
      "Long-lived research and AI systems need context they can trace and correct, not a stream of unexamined claims.",
  },
  {
    title: "Pick boring tools",
    body:
      "Reach for the proven defaults first. The interesting bet is in the system design and the reasoning layer — not in adopting the latest framework.",
  },
  {
    title: "Reproducibility from day one",
    body:
      "Treat source trails, repeatable tests, and explicit limitations as part of the system, not documentation added at the end.",
  },
];
