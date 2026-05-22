import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Zawwar Sami — Engineer · Builder of ZAI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://zawwarsami.com";

export default async function OG() {
  // Fetch the bespoke nebula backdrop at request time (edge runtime).
  // If it fails, the procedural radial gradient remains as fallback.
  let backdropDataUrl: string | null = null;
  try {
    const res = await fetch(`${SITE}/images/og-backdrop.jpg`);
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      backdropDataUrl = `data:image/jpeg;base64,${buf.toString("base64")}`;
    }
  } catch {}

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(ellipse at 80% 50%, #4a0e12 0%, #07070a 60%), #07070a",
          color: "#f5f1ea",
          padding: 80,
          fontFamily: "Inter, ui-sans-serif",
          position: "relative",
        }}
      >
        {backdropDataUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={backdropDataUrl}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(7,7,10,0.92) 0%, rgba(7,7,10,0.75) 45%, rgba(7,7,10,0.30) 100%)",
              }}
            />
          </>
        ) : null}

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#dc2626",
            fontSize: 18,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ width: 14, height: 14, background: "#dc2626", borderRadius: 999 }} />
          Zawwar Sami
        </div>

        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              fontWeight: 300,
              textShadow: "0 0 40px rgba(7,7,10,0.85)",
            }}
          >
            Building thoughtful
          </div>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#dc2626",
              textShadow: "0 0 40px rgba(7,7,10,0.7)",
            }}
          >
            digital systems.
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            color: "#c8c4be",
            fontSize: 18,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            textShadow: "0 0 20px rgba(7,7,10,0.7)",
          }}
        >
          <span>Engineer · Builder of ZAI</span>
          <span>Canada</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
