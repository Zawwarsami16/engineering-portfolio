import type { Metadata, Viewport } from "next";
import { inter, cormorant, jetbrains } from "@/lib/fonts";
import { baseMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { Providers } from "./providers";
import { StructuredData } from "@/components/seo/StructuredData";
import { Chrome } from "@/components/layout/Chrome";
import "./globals.css";

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: "#07070a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, cormorant.variable, jetbrains.variable)}
      suppressHydrationWarning
    >
      <body className="grain min-h-dvh font-sans antialiased">
        <StructuredData />
        <Providers>
          <Chrome>{children}</Chrome>
        </Providers>
      </body>
    </html>
  );
}
