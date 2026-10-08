import type { Metadata } from "next";
import { ResearchUniverse } from "@/components/universe/ResearchUniverse";
import { researchWorlds } from "@/lib/universe";

export const metadata: Metadata = {
  title: "Long-Term Vision",
  description: "Zawwar Sami’s long-term research vision: an evolving map of published work and future inquiry across AI, philosophy, cosmology, and security.",
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Long-Term Vision · Zawwar Sami",
    description: "A long-term pathway for independent research, grounded in published work and room for new questions.",
    url: "/research", type: "website",
  },
};

export default function ResearchPage() {
  return <ResearchUniverse worlds={researchWorlds} />;
}
