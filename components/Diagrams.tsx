import { pick, type Locale } from "@/lib/i18n";

/* Süreç şemaları — satır içi SVG.

   Neden SVG: fotoğraf değil, bilgi taşıyorlar. Vektör oldukları için her ekranda
   keskin, dosya olarak birkaç KB ve tema renklerini (--navy/--blue/--amber)
   doğrudan kullanıyorlar; sayfa hızını etkilemiyorlar. Metinler gerçek <text>
   olduğu için arama motorları ve ekran okuyucular içeriği okuyabiliyor. */

type D = { locale: Locale };

const T = { fontFamily: "var(--body)", fontWeight: 600 } as const;

function Frame({ children, title, viewBox }: { children: React.ReactNode; title: string; viewBox: string }) {
  return (
    <figure className="dgm">
      <svg viewBox={viewBox} role="img" aria-label={title} preserveAspectRatio="xMidYMid meet">
        <title>{title}</title>
        {children}
      </svg>
    </figure>
  );
}

/* 1 — ECC'den S/4HANA'ya geçiş yolu */
export function S4Journey({ locale }: D) {
  const steps = [
    { t: pick(locale, "ECC 6.0", "ECC 6.0"), s: pick(locale, "bugünkü sistem", "today's system"), c: "var(--mute)" },
    { t: pick(locale, "Hazırlık analizi", "Readiness"), s: pick(locale, "Z-kod, ana veri", "custom code, master data"), c: "var(--blue-d)" },
    { t: pick(locale, "Dönüşüm", "Conversion"), s: pick(locale, "deneme çalışmaları", "trial runs"), c: "var(--blue)" },
    { t: pick(locale, "S/4HANA", "S/4HANA"), s: pick(locale, "canlı + hypercare", "go-live + hypercare"), c: "var(--amber)" },
  ];
  return (
    <Frame title={pick(locale, "S/4HANA geçiş yolu", "S/4HANA migration path")} viewBox="0 0 720 190">
      <line x1="40" y1="86" x2="680" y2="86" stroke="var(--line)" strokeWidth="2" />
      {steps.map((s, i) => {
        const x = 40 + i * 213;
        return (
          <g key={i}>
            <circle cx={x} cy="86" r="11" fill={s.c} />
            {i < 3 ? <path d={`M${x + 22} 86 L${x + 190} 86`} stroke={s.c} strokeWidth="2.5" strokeLinecap="round" opacity=".55" /> : null}
            <text x={x} y="42" textAnchor={i === 3 ? "end" : "start"} dx={i === 3 ? 14 : -2} fill="var(--navy)" fontSize="16" style={T}>
              {s.t}
            </text>
            <text x={x} y="64" textAnchor={i === 3 ? "end" : "start"} dx={i === 3 ? 14 : -2} fill="var(--mute)" fontSize="12.5" style={{ fontFamily: "var(--body)" }}>
              {s.s}
            </text>
            <text x={x} y="122" textAnchor={i === 3 ? "end" : "start"} dx={i === 3 ? 14 : -2} fill="var(--ink-2)" fontSize="12" style={{ fontFamily: "var(--body)" }}>
              {i === 0
                ? pick(locale, "bakım 2027'de bitiyor", "maintenance ends 2027")
                : i === 1
                  ? pick(locale, "2–6 hafta", "2–6 weeks")
                  : i === 2
                    ? pick(locale, "6–12 ay", "6–12 months")
                    : pick(locale, "sürekli iyileştirme", "continuous improvement")}
            </text>
          </g>
        );
      })}
      <text x="40" y="166" fill="var(--mute)" fontSize="12" style={{ fontFamily: "var(--body)", fontStyle: "italic" }}>
        {pick(locale, "Takvim, hazırlık analizinin sonucuna göre netleşir.", "The timeline firms up after the readiness assessment.")}
      </text>
    </Frame>
  );
}

/* 2 — AMS destek döngüsü */
export function AmsFlow({ locale }: D) {
  const nodes = [
    { t: pick(locale, "Talep", "Request"), s: pick(locale, "kullanıcı / izleme", "user / monitoring") },
    { t: pick(locale, "Triyaj + SLA", "Triage + SLA"), s: pick(locale, "önceliklendirme", "prioritisation") },
    { t: pick(locale, "Çözüm", "Resolution"), s: pick(locale, "adanmış ekip", "named team") },
    { t: pick(locale, "İyileştirme", "Improvement"), s: pick(locale, "kök neden", "root cause") },
  ];
  return (
    <Frame title={pick(locale, "AMS destek döngüsü", "AMS support cycle")} viewBox="0 0 720 210">
      {nodes.map((n, i) => {
        const x = 26 + i * 172;
        return (
          <g key={i}>
            <rect x={x} y="52" width="150" height="76" rx="10" fill="var(--mist)" stroke="var(--line)" />
            <rect x={x} y="52" width="150" height="3" rx="2" fill={i === 3 ? "var(--amber)" : "var(--blue)"} />
            <text x={x + 16} y="84" fill="var(--navy)" fontSize="15" style={T}>
              {n.t}
            </text>
            <text x={x + 16} y="105" fill="var(--mute)" fontSize="12" style={{ fontFamily: "var(--body)" }}>
              {n.s}
            </text>
            {i < 3 ? <path d={`M${x + 152} 90 l16 0 m-6 -5 l6 5 -6 5`} stroke="var(--blue)" strokeWidth="2" fill="none" strokeLinecap="round" /> : null}
          </g>
        );
      })}
      <path d="M690 128 q22 34 -12 46 H62 q-34 -12 -12 -46" fill="none" stroke="var(--amber)" strokeWidth="2" strokeDasharray="5 5" />
      <text x="360" y="192" textAnchor="middle" fill="var(--amber-d)" fontSize="12.5" style={T}>
        {pick(locale, "her çözüm bir sonraki talebi azaltır", "each fix reduces the next request")}
      </text>
    </Frame>
  );
}

/* 3 — Global rollout: merkezî şablon + ülke lokalizasyonu */
export function RolloutTemplate({ locale }: D) {
  const countries = [
    pick(locale, "Türkiye", "Türkiye"),
    pick(locale, "Almanya", "Germany"),
    pick(locale, "Malezya", "Malaysia"),
    pick(locale, "Rusya", "Russia"),
  ];
  return (
    <Frame title={pick(locale, "Global rollout şablon yapısı", "Global rollout template structure")} viewBox="0 0 720 230">
      <rect x="210" y="16" width="300" height="60" rx="10" fill="var(--navy)" />
      <text x="360" y="42" textAnchor="middle" fill="#fff" fontSize="15.5" style={T}>
        {pick(locale, "Merkezî şablon", "Central template")}
      </text>
      <text x="360" y="62" textAnchor="middle" fill="#B9C6D9" fontSize="12" style={{ fontFamily: "var(--body)" }}>
        {pick(locale, "ortak süreç, hesap planı, raporlama", "shared process, CoA, reporting")}
      </text>
      {countries.map((c, i) => {
        const x = 40 + i * 165;
        return (
          <g key={i}>
            <path d={`M360 78 C360 110, ${x + 65} 108, ${x + 65} 132`} fill="none" stroke="var(--line)" strokeWidth="2" />
            <rect x={x} y="132" width="130" height="62" rx="9" fill="#fff" stroke="var(--line)" />
            <text x={x + 65} y="156" textAnchor="middle" fill="var(--navy)" fontSize="14" style={T}>
              {c}
            </text>
            <text x={x + 65} y="176" textAnchor="middle" fill="var(--mute)" fontSize="11.5" style={{ fontFamily: "var(--body)" }}>
              {pick(locale, "yerel mevzuat", "local statutory")}
            </text>
          </g>
        );
      })}
      <text x="360" y="218" textAnchor="middle" fill="var(--mute)" fontSize="12" style={{ fontFamily: "var(--body)", fontStyle: "italic" }}>
        {pick(locale, "Lokalizasyon şablonu bozmadan eklenir — kritik denge budur.", "Localisation is added without breaking the template — that is the balance.")}
      </text>
    </Frame>
  );
}

/* 4 — Confiq mimarisi: veri sizde kalır */
export function ConfiqArchitecture({ locale }: D) {
  return (
    <Frame title={pick(locale, "Confiq mimarisi — veriniz kendi sisteminizde kalır", "Confiq architecture — your data stays in your system")} viewBox="0 0 720 220">
      <rect x="24" y="40" width="196" height="130" rx="12" fill="var(--mist)" stroke="var(--line)" />
      <text x="122" y="70" textAnchor="middle" fill="var(--navy)" fontSize="15" style={T}>
        {pick(locale, "SAP sisteminiz", "Your SAP system")}
      </text>
      <text x="122" y="92" textAnchor="middle" fill="var(--mute)" fontSize="12" style={{ fontFamily: "var(--body)" }}>
        {pick(locale, "veri burada kalır", "data stays here")}
      </text>
      <rect x="52" y="108" width="138" height="44" rx="8" fill="#fff" stroke="var(--line)" />
      <text x="122" y="135" textAnchor="middle" fill="var(--ink-2)" fontSize="12" style={{ fontFamily: "var(--body)" }}>
        {pick(locale, "yetkiler değişmez", "authorisations unchanged")}
      </text>

      <rect x="262" y="40" width="196" height="130" rx="12" fill="var(--navy)" />
      <text x="360" y="70" textAnchor="middle" fill="#fff" fontSize="15" style={T}>
        Confiq
      </text>
      <text x="360" y="92" textAnchor="middle" fill="#B9C6D9" fontSize="12" style={{ fontFamily: "var(--body)" }}>
        {pick(locale, "okuma ve yorumlama katmanı", "read & interpretation layer")}
      </text>
      <rect x="290" y="108" width="138" height="44" rx="8" fill="rgba(255,255,255,.10)" stroke="rgba(255,255,255,.25)" />
      <text x="360" y="135" textAnchor="middle" fill="#DCE7F5" fontSize="12" style={{ fontFamily: "var(--body)" }}>
        {pick(locale, "soru → sorgu", "question → query")}
      </text>

      <rect x="500" y="40" width="196" height="130" rx="12" fill="var(--mist)" stroke="var(--line)" />
      <text x="598" y="70" textAnchor="middle" fill="var(--navy)" fontSize="15" style={T}>
        {pick(locale, "Ekibiniz", "Your team")}
      </text>
      <text x="598" y="92" textAnchor="middle" fill="var(--mute)" fontSize="12" style={{ fontFamily: "var(--body)" }}>
        {pick(locale, "doğal dille sorar", "asks in plain language")}
      </text>
      <rect x="528" y="108" width="138" height="44" rx="8" fill="#fff" stroke="var(--amber)" />
      <text x="598" y="135" textAnchor="middle" fill="var(--amber-d)" fontSize="11.5" style={{ fontFamily: "var(--body)" }}>
        {pick(locale, "“marj neden düştü?”", "“why did margin drop?”")}
      </text>

      <path d="M222 105 l32 0 m-8 -5 l8 5 -8 5" stroke="var(--blue)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M498 105 l-32 0 m8 -5 l-8 5 8 5" stroke="var(--amber)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <text x="360" y="202" textAnchor="middle" fill="var(--mute)" fontSize="12" style={{ fontFamily: "var(--body)", fontStyle: "italic" }}>
        {pick(locale, "Kullanıcı, SAP'ta göremediği veriyi Confiq üzerinden de göremez.", "A user cannot see through Confiq what they cannot see in SAP.")}
      </text>
    </Frame>
  );
}

// Hizmet sayfası anahtarına göre şema seçer (yoksa null).
export function ServiceDiagram({ routeKey, locale }: { routeKey: string; locale: Locale }) {
  if (routeKey === "hizmet-s4hana") return <S4Journey locale={locale} />;
  if (routeKey === "hizmet-sap-ams") return <AmsFlow locale={locale} />;
  if (routeKey === "hizmet-rollout") return <RolloutTemplate locale={locale} />;
  return null;
}
