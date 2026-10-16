import { createHash } from "node:crypto";

/**
 * A9 PDF delivery is pinned to the author's original 10-page v1.9 bytes.
 * Never silently serve an archive file with a different checksum.
 * A verified static import may later replace this proxy without breaking links.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const record = "https://zenodo.org/records/23398609";
const api = "https://zenodo.org/api/records/23398609";
const expectedSha256 = "85de1a604a5964220da82bc97a72c47094e059a763198429703f6ee1902247d6";

type ZenodoFile = { key?: string; links?: { self?: string; content?: string } };
type ZenodoRecord = { files?: ZenodoFile[] };

export async function GET() {
  try {
    const metadata = await fetch(api, { cache: "no-store", signal: AbortSignal.timeout(15000) });
    if (!metadata.ok) throw new Error("Archive metadata unavailable");
    const listing = (await metadata.json()) as ZenodoRecord;
    const files = (listing.files ?? []).filter((item) => item.key?.toLowerCase().endsWith(".pdf"));
    for (const file of files) {
      const candidate = file.links?.content ?? file.links?.self;
      if (!candidate) continue;
      const uri = new URL(candidate);
      if (uri.protocol !== "https:" || !["zenodo.org", "www.zenodo.org"].includes(uri.hostname)) continue;
      const response = await fetch(uri, { cache: "no-store", signal: AbortSignal.timeout(20000) });
      if (!response.ok) continue;
      const bytes = new Uint8Array(await response.arrayBuffer());
      const checksum = createHash("sha256").update(bytes).digest("hex");
      if (checksum !== expectedSha256) continue;
      return new Response(bytes, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'inline; filename="Zawwar-Sami-The-Body-of-Software-A9.pdf"',
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }
  } catch {
    // A missing archive response or a checksum mismatch must never be misrepresented as a verified copy.
  }
  return Response.redirect(record, 307);
}
