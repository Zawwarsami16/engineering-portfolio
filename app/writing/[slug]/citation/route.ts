import { writings, bibtexFor } from "@/lib/writing";
export const dynamic = "force-static";
export function generateStaticParams() {
  return writings.map(({ slug }) => ({ slug }));
}
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = writings.find((e) => e.slug === slug);
  if (!entry) return new Response("Entry not found", { status: 404 });
  return new Response(bibtexFor(entry), {
    headers: {
      "Content-Type": "application/x-bibtex; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}.bib"`,
    },
  });
}
