import type { Metadata } from "next";
import { ResearchUniverse } from "@/components/universe/ResearchUniverse";
import { researchWorlds } from "@/lib/universe";

export const metadata: Metadata = {
  title: "Long-Term Vision",
  description: "Zawwar Sami's long-term research in philosophy, AI, ZAI (Zawwar Autonomous Intelligence), cosmology, cybersecurity, warfare and defence.",
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Long-Term Vision · Zawwar Sami",
    description: "An A–Z research pathway across philosophy, AI, security and ZAI, with published preprints and future projects clearly distinguished.",
    url: "/research", type: "website",
  },
};

export default function ResearchPage() {
  return <ResearchUniverse worlds={researchWorlds} />;
}
