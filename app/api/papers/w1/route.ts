import { createHash } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RECORD_ID = "23359788";
const RECORD_URL = `https://zenodo.org/records/${RECORD_ID}`;
const API_URL = `https://zenodo.org/api/records/${RECORD_ID}`;
const EXPECTED_SHA256 = "cadd4f05d3217ae032f0f0baa6aae6beae491237b2b5f39edb74e5f66d4a18a0";
const DOWNLOAD_NAME = "Zawwar-Sami-Weapons-as-Systems-W1.pdf";

type ZenodoFile = {
  key?: string;
  links?: { content?: string; self?: string };
};

type ZenodoRecord = { files?: ZenodoFile[] };

function isZenodoSource(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "zenodo.org";
  } catch {
    return false;
  }
}

/**
 * The public W1 edition is immutable. Serve only the archived bytes whose
 * SHA-256 matches the original author-supplied, 14 October 2026 manuscript.
 * This route avoids a broken file link while the repository's static PDF
 * import is pending; it does not modify or regenerate the manuscript.
 */
export async function GET() {
  try {
    const recordResponse = await fetch(API_URL, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    if (!recordResponse.ok) throw new Error("Unable to read W1 archive record");

    const record = (await recordResponse.json()) as ZenodoRecord;
    const candidates = (record.files ?? []).filter((file) =>
      file.key?.toLowerCase().endsWith(".pdf"),
    );

    for (const file of candidates) {
      const fileUrl = file.links?.content ?? file.links?.self;
      if (!fileUrl || !isZenodoSource(fileUrl)) continue;

      const response = await fetch(fileUrl, {
        headers: { Accept: "application/pdf" },
        cache: "no-store",
        signal: AbortSignal.timeout(30000),
      });
      if (!response.ok) continue;
      const content = await response.arrayBuffer();
      const checksum = createHash("sha256")
        .update(Buffer.from(content))
        .digest("hex");
      if (checksum !== EXPECTED_SHA256) continue;

      return new Response(content, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="${DOWNLOAD_NAME}"`,
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }
  } catch (error) {
    console.error("W1 verified PDF unavailable; falling back to public archive", error);
  }

  // Never return a corrupted or different manuscript: offer the canonical
  // archive record if the verified bytes cannot be retrieved.
  return Response.redirect(RECORD_URL, 302);
}
