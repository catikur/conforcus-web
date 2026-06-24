import { ImageResponse } from "next/og";

// Marka OG görseli (sosyal paylaşım kartları). Convention yerine route handler:
// böylece mutlak URL ile referanslanır, metadataBase'e bağımlı olmaz.
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "linear-gradient(135deg, #0B2545 0%, #13315C 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#FFB537",
            fontWeight: 700,
          }}
        >
          <div style={{ width: 56, height: 4, background: "#FFB537", borderRadius: 2 }} />
          Conforcus
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 78, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
          Deep expertise in SAP.
        </div>
        <div style={{ display: "flex", fontSize: 78, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, color: "#1DADFF" }}>
          Lasting trust in your business.
        </div>
        <div style={{ display: "flex", marginTop: 36, fontSize: 30, color: "#B9C6D9" }}>
          SAP Support · S/4HANA · Global Rollout · 48+ Solutions · Confiq AI
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
