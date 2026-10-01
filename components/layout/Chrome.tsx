"use client";

import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { EdgeRails } from "./EdgeRails";
import { ScrollRail } from "./ScrollRail";

export function Chrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <EdgeRails />
      <ScrollRail />
      <main id="main-content" tabIndex={-1} className="relative">{children}</main>
      <Footer />
    </>
  );
}
