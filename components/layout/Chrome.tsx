"use client";

import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { EdgeRails } from "./EdgeRails";
import { ScrollRail } from "./ScrollRail";
import { usePathname } from "next/navigation";

export function Chrome({ children }: { children: React.ReactNode }) {
  const universe = usePathname() === "/research";
  return (
    <>
      <Nav />
      {!universe && <EdgeRails />}
      {!universe && <ScrollRail />}
      <main id="main-content" tabIndex={-1} className="relative">{children}</main>
      {!universe && <Footer />}
    </>
  );
}
