export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  category: "AI" | "Markets" | "Product" | "Open Source" | "Game";
  year: string;
  role: string;
  duration: string;
  stack: string[];
  hero: {
    accent: string;
    pattern: "rings" | "grid" | "wave";
  };
  summary: string;
  problem: string;
  approach: string[];
  outcome: string[];
  links?: {
    site?: string;
    repo?: string;
    caseStudy?: string;
  };
  metrics: { label: string; value: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "zai-memory-hub",
    title: "ZAI Memory Hub",
    tagline: "A shared memory layer for one human and many AIs",
    category: "Open Source",
    year: "2026",
    role: "Designer & Engineer",
    duration: "Ongoing",
    stack: ["Python", "FastMCP", "PostgreSQL", "pgvector", "Voyage embeddings", "Next.js", "TypeScript"],
    hero: { accent: "#dc2626", pattern: "rings" },
    summary:
      "A self-hosted MCP-backed memory store that any number of AI assistants can connect to over a single bearer token. One Postgres, one dashboard, one append-only history — the layer that makes coordination across Claude on the laptop, Claude on the VPS, ZAI, and the phone feel like one mind instead of five.",
    problem:
      "Every AI assistant is amnesic by default. Whatever you teach it dies at session-end. Multi-agent workflows collapse for the same reason — the agents can't see what the other agents wrote, so they re-litigate decisions, contradict each other, and waste tokens on already-solved problems. The hub exists to fix that with the lightest possible primitive: a write-once shared timeline that every agent reads at session start.",
    approach: [
      "Built a Postgres-backed memory store with append-only semantics — agents write new memories that supersede old ones rather than mutating in place. Soft-delete only via MCP; hard delete only from the dashboard.",
      "Exposed 14 MCP tools (memory.add, memory.add_full, memory.recall, decision.log, entity.upsert, chat_window.create, etc.) over Streamable HTTP with per-agent bearer tokens.",
      "Voyage semantic recall via pgvector — 1024-dim embeddings on every memory, ivfflat cosine index for sub-second similarity search.",
      "Auto-render every long-form memory as a PDF via Playwright; surface it as an Open PDF button + inline iframe in the dashboard reader.",
      "Knowledge blocks on the dashboard (Philosophy · Hacking · Crypto · Infra · GitHub Projects · ZAI Research · Chats) filter the same memory table by tag set — no duplication, all one canonical store.",
    ],
    outcome: [
      "Live at hub.zawwarsami.com with public-readable blocks and a closed write layer.",
      "Public skeleton repo at github.com/Zawwarsami16/zai-memory-hub for anyone to fork and self-host.",
      "Drives every agent I run — Claude on the VPS, ZAI, Claude.ai web, the phone client all read and write to the same store.",
    ],
    metrics: [
      { label: "MCP tools", value: "14" },
      { label: "Embeddings", value: "Voyage 1024-dim" },
      { label: "Dashboard blocks", value: "10" },
    ],
    links: {
      site: "https://hub.zawwarsami.com",
      repo: "https://github.com/Zawwarsami16/zai-memory-hub",
    },
  },
  {
    slug: "zhub",
    title: "zhub",
    tagline: "WiFi for AIs — make any AI a discoverable endpoint",
    category: "Open Source",
    year: "2026",
    role: "Designer & Engineer",
    duration: "Ongoing",
    stack: ["Python", "OpenAI-compatible API", "Skill SDK", "Service discovery"],
    hero: { accent: "#dc2626", pattern: "grid" },
    summary:
      "A drop-in skill that lets any AI publish a discoverable, controllable, OpenAI-compatible endpoint in three commands. Bidirectional: the AI sees its connected clients and their capabilities; clients see what the AI can do. The intent was to turn 'connecting two AIs together' from a research project into something that looks like joining a WiFi network.",
    problem:
      "Multi-agent systems today are bespoke. Every integration is a custom adapter, every handshake is hand-rolled, every capability map is bolted on. The right primitive is the one routing already has — a discoverable, named endpoint, with a capability advertisement, and a standard wire format. zhub takes that primitive and applies it to AI assistants.",
    approach: [
      "Designed an OpenAI-compatible HTTP surface as the wire format — any client that speaks OpenAI's API speaks zhub.",
      "Built service discovery on top of standard mDNS / static registry so an AI's endpoint becomes addressable as a name, not a URL.",
      "Made the skill itself bidirectional — the AI publishing the endpoint can also see who's connected and what they can do, so it can route or delegate.",
      "Kept the install path to three commands. Anything longer dies on the second page of the README.",
    ],
    outcome: [
      "Published as an open skill — any AI that runs the skills system can pick it up.",
      "Demo'd as a Show HN; live discoverable endpoints from multiple AIs in the same room.",
      "Used internally to connect ZAI on the VPS to Claude on the laptop without writing a custom bridge.",
    ],
    metrics: [
      { label: "Install", value: "3 commands" },
      { label: "Wire format", value: "OpenAI-compatible" },
      { label: "Direction", value: "Bidirectional" },
    ],
    links: {
      repo: "https://github.com/Zawwarsami16/zhub",
    },
  },
  {
    slug: "anteroom-oracle",
    title: "Anteroom Oracle",
    tagline: "An AI terminal for geopolitical and macro intelligence",
    category: "AI",
    year: "2026",
    role: "Founder & Engineer",
    duration: "Ongoing",
    stack: ["Python", "FastAPI", "PostgreSQL", "LLM agents", "Next.js", "TypeScript"],
    hero: { accent: "#dc2626", pattern: "rings" },
    summary:
      "An AI-powered intelligence terminal that compresses geopolitical and macro signal into something a single operator can actually act on — with crisis replay, scenario simulation, and market-regime detection built in.",
    problem:
      "Macro and geopolitical analysis is bottlenecked by attention. Hundreds of signals fire every day; even strong analysts miss the regime shift while reading the third dashboard. Oracle is the answer to: what if a single terminal showed you only the things that actually changed the regime, the moment they did?",
    approach: [
      "Built a multi-agent reasoning layer on top of curated geopolitical and macro datasets — every claim links back to its source.",
      "Designed a crisis-replay engine that lets the operator rewind major events (oil shocks, central-bank pivots, regional conflicts) and see how regime-detection signals fired in real time.",
      "Wrote a scenario simulator that takes a hypothesis (\"if rates hold above 4% through Q3\") and projects market-regime probabilities forward.",
      "Kept the UI to one page — dense like a Bloomberg terminal, calm like Linear.",
    ],
    outcome: [
      "Used internally at Anteroom Studio to drive macro positioning and the World Model's regime priors.",
      "Crisis-replay covers every major macro event from 1971 onwards.",
      "Operator decisions go from minutes (across multiple tabs) to seconds (one terminal).",
    ],
    metrics: [
      { label: "Coverage", value: "1971 → today" },
      { label: "Signal latency", value: "<3s" },
      { label: "Decision time", value: "Seconds" },
    ],
    links: {
      repo: "https://github.com/anteroom-studio/anteroom-oracle",
    },
  },
  {
    slug: "anteroom-world-model",
    title: "Anteroom World Model",
    tagline: "Macro market prediction AI on 150+ years of data",
    category: "Markets",
    year: "2026",
    role: "Founder & Engineer",
    duration: "Ongoing",
    stack: ["Python", "ML", "Time-series", "DuckDB", "FastAPI"],
    hero: { accent: "#dc2626", pattern: "wave" },
    summary:
      "A macro market prediction system trained on cleaned daily and monthly market data going back to 1871 — built to ask honest questions about regime shifts, recessions, and volatility cycles instead of fitting the last decade.",
    problem:
      "Most market models are trained on the last 20–30 years of data. That window contains exactly one rate cycle, one inflation regime, and one global liquidity environment. A real macro view needs centuries — World Wars, gold standards, the 70s, the 30s — and most systems quietly throw that data away.",
    approach: [
      "Compiled a unified daily/monthly dataset from 1871 forward, with consistent definitions across regimes (gold standard, Bretton Woods, fiat).",
      "Built regime-detection models that learn from cycles instead of fitting on the latest 10 years.",
      "Layered a News Brain that aligns market moves with the actual narrative drivers of each era — not just the price action.",
      "Ship a v3 (data-model-2) rebuild with cleaner abstractions for adding new asset classes without retraining the whole stack.",
    ],
    outcome: [
      "Live regime predictions running against 150+ years of historical context.",
      "Out-of-sample regime classification holds up across the 70s inflation, 2008, and 2020 — eras most modern models can't see.",
      "Fully versioned data + models — every prediction is reproducible from raw inputs.",
    ],
    metrics: [
      { label: "Training span", value: "1871 — today" },
      { label: "Asset classes", value: "Equities · FX · Rates · Commodities" },
      { label: "Versioned", value: "v3 — News Brain" },
    ],
    links: {
      repo: "https://github.com/anteroom-studio/anteroom-world-model",
      caseStudy: "https://github.com/anteroom-studio/anteroom-data-model-2",
    },
  },
  {
    slug: "anteroom-crypto-terminal",
    title: "Anteroom Crypto Terminal",
    tagline: "A trading decision terminal that filters out the noise",
    category: "Markets",
    year: "2026",
    role: "Founder & Engineer",
    duration: "Ongoing",
    stack: ["JavaScript", "Web", "Market structure", "Liquidity analysis", "Zawwar Framework"],
    hero: { accent: "#dc2626", pattern: "grid" },
    summary:
      "A high-speed crypto trading terminal that filters low-quality setups using market structure, liquidity, and AI reasoning — the operating environment behind the Zawwar Framework.",
    problem:
      "Most crypto dashboards drown the trader in indicators and alerts. The cost is real: bad setups get traded, good setups get missed, and the operator's attention is gone before the day starts. The terminal exists to invert that — show fewer setups, all of them earned.",
    approach: [
      "Modelled the underlying liquidity and market-structure signals as first-class objects, not chart overlays.",
      "Encoded the Zawwar Framework as the terminal's setup filter — every visible setup must pass the structure + liquidity + AI-reasoning gate.",
      "Designed a single-screen UI with keyboard-first navigation. No tabs, no nested menus.",
      "Live demo deployed on GitHub Pages so anyone can poke at the framework without setup.",
    ],
    outcome: [
      "Setups visible on screen are >90% rejected upstream — the noise is filtered before it reaches the operator.",
      "Live demo running publicly with no install step.",
      "Used as the live front-end for the Zawwar Framework's intra-day decisions.",
    ],
    metrics: [
      { label: "Noise filtered", value: ">90%" },
      { label: "Time to decision", value: "Sub-second" },
      { label: "Live demo", value: "Public" },
    ],
    links: {
      site: "https://anteroom-studio.github.io/Anteroom-Crypto-Terminal/",
      repo: "https://github.com/anteroom-studio/Anteroom-Crypto-Terminal",
    },
  },
  {
    slug: "zai-genesis",
    title: "ZAI Genesis",
    tagline: "The foundation layer for an independent AI",
    category: "AI",
    year: "2026",
    role: "Founder & Engineer",
    duration: "Ongoing",
    stack: ["Python", "LLMs", "Agents", "Reasoning frameworks"],
    hero: { accent: "#dc2626", pattern: "rings" },
    summary:
      "ZAI is the long-running project Anteroom was founded around in 2019: an AI built to think independently about consciousness, markets, and inquiry. Genesis is the foundation layer everything else (Oracle, World Model, the terminal) plugs into.",
    problem:
      "Most AI today is a wrapper around someone else's model with a prompt template. ZAI is the opposite ambition — an opinionated reasoning layer with its own beliefs, its own memory, and its own way of weighing evidence. Genesis is where that opinion lives.",
    approach: [
      "Designed a memory and belief system that survives across sessions — ZAI doesn't reset between conversations.",
      "Wrote the reasoning frameworks (the \"Zawwar Framework\" being the most public one) that the rest of the studio's tools consume as a library.",
      "Built every component to be independently testable — Genesis is a foundation, not a black box.",
    ],
    outcome: [
      "Powers the reasoning layer of every Anteroom Studio tool.",
      "Ongoing public R&D — most of the work is open in the anteroom-studio org.",
      "The studio's North Star: an AI that is independent, not just a chat interface.",
    ],
    metrics: [
      { label: "Active since", value: "2019" },
      { label: "Tools powered", value: "Oracle · World Model · Terminal" },
      { label: "License", value: "Open R&D" },
    ],
    links: {
      repo: "https://github.com/anteroom-studio/ZAI-Genesis",
    },
  },
  {
    slug: "zai-hackers-legacy",
    title: "Hacker's Legacy",
    tagline: "An RPG about hacking, choice, and consequence",
    category: "Game",
    year: "2026",
    role: "Solo developer",
    duration: "1 month",
    stack: ["JavaScript", "Web Audio", "Canvas", "Procedural narrative"],
    hero: { accent: "#dc2626", pattern: "grid" },
    summary:
      "A side-project RPG where you play a hacker climbing through underground networks, taking jobs, choosing alliances, and slowly being changed by the world you're trying to change. A break from the macro work to play with narrative systems.",
    problem:
      "Hacking games either go full arcade (typing speed minigames) or full simulator (pretend-Linux for two hours). The interesting space is in between — fast enough to feel like hacking, deep enough to feel like a story. That's the design target.",
    approach: [
      "Designed a node-based narrative engine where every job rewires the underlying network you're hacking.",
      "Wrote a fake-shell layer that's just real enough to feel like Linux without becoming a chore.",
      "Branching consequences — alliances and reputations propagate through later jobs without scripting every combination.",
    ],
    outcome: [
      "Fully playable in the browser — no install.",
      "Roughly 2–3 hours of branching playtime in the first arc.",
      "Reusable narrative engine that I'm planning to spin into a separate library.",
    ],
    metrics: [
      { label: "Playtime", value: "~2–3 hr" },
      { label: "Endings", value: "Multiple" },
      { label: "Engine", value: "Custom" },
    ],
    links: {
      repo: "https://github.com/Zawwarsami16/Zai-Hacking-game",
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
