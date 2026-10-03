type ZenodoFile = {
  key?: string;
  links?: {
    content?: string;
  };
};

type ZenodoRecord = {
  files?: ZenodoFile[];
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ record: string }> },
) {
  const { record } = await params;

  if (!/^\d+$/.test(record)) {
    return new Response("Invalid Zenodo record.", { status: 400 });
  }

  const metadataResponse = await fetch(`https://zenodo.org/api/records/${record}`, {
    next: { revalidate: 3600 },
  });

  if (!metadataResponse.ok) {
    return new Response("Zenodo record unavailable.", { status: 502 });
  }

  const metadata = (await metadataResponse.json()) as ZenodoRecord;
  const file = metadata.files?.find(
    (item) => item.key?.toLowerCase().endsWith(".pdf") && item.links?.content,
  );

  if (!file?.links?.content) {
    return new Response("PDF not found in this Zenodo record.", { status: 404 });
  }

  const pdfResponse = await fetch(file.links.content, { cache: "no-store" });

  if (!pdfResponse.ok || !pdfResponse.body) {
    return new Response("PDF unavailable.", { status: 502 });
  }

  const filename = (file.key ?? "paper.pdf").replace(/["\r\n]/g, "");
  const headers = new Headers({
    "Content-Type": pdfResponse.headers.get("content-type") ?? "application/pdf",
    "Content-Disposition": `inline; filename="${filename}"`,
    "Cache-Control": "public, max-age=3600, s-maxage=86400",
  });

  const contentLength = pdfResponse.headers.get("content-length");
  if (contentLength) headers.set("Content-Length", contentLength);

  return new Response(pdfResponse.body, { headers });
}
