import { InquiryJourney } from "@/components/sections/InquiryJourney";
import { LatestWriting } from "@/components/sections/LatestWriting";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Values } from "@/components/sections/Values";
import { Tools } from "@/components/sections/Tools";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <InquiryJourney />
      <About />
      <Values />
      <Tools />
      <ProcessTimeline />
      <SelectedWork />
      <LatestWriting />
      <FinalCTA />
    </>
  );
}
