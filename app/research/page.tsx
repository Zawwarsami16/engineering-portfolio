import type { Metadata } from "next";
import { ResearchUniverse } from "@/components/universe/ResearchUniverse";
import { researchWorlds } from "@/lib/universe";

export const metadata: Metadata = {
  title: "Research Universe",
  description: "Explore Zawwar Sami’s living archive of ideas: artificial agency, cosmology, personhood and philosophy of mind, and security and adversarial systems.",
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Research Universe · Zawwar Sami",
    description: "A living archive of ideas. Explore the worlds and read the work.",
    url: "/research", type: "website",
  },
};

export default function ResearchPage() {
  return <ResearchUniverse worlds={researchWorlds} />;
}
