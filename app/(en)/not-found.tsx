import Link from "next/link";

// (en) kök layout'unu (Shell: Nav + Footer) miras alır.
export default function NotFound() {
  return (
    <main
      id="main"
      style={{
        minHeight: "62vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "60px 24px",
        gap: 14,
      }}
    >
      <div className="kicker" style={{ justifyContent: "center" }}>
        404
      </div>
      <h1 style={{ fontFamily: "var(--disp)", fontSize: "clamp(40px,8vw,72px)", color: "var(--navy)", lineHeight: 1, margin: 0 }}>
        Page not found
      </h1>
      <p style={{ color: "var(--ink-2)", fontSize: 17, maxWidth: "44ch" }}>
        The page you are looking for may have moved or never existed.
        <br />
        Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
        <Link className="btn btn-p" href="/en">
          Home
        </Link>
        <Link className="btn btn-g" href="/">
          Ana sayfa (TR)
        </Link>
      </div>
    </main>
  );
}
