"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { pick, type Locale } from "@/lib/i18n";

/* Ücretsiz SAP analizi — nitelendirici değerlendirme.
   Her cevap (a) olgunluk puanı ve (b) bir Conforcus hizmet etiketi taşır;
   sonuçta gerçek skor + somut öneri üretilir ve cevaplar /api/lead ile
   satış ekibine iletilir (böylece ilk görüşme hazır veriyle başlar). */

type Tag = "s4" | "ams" | "rollout" | "catalog" | "confiq";

type Opt = { tr: string; en: string; pts: number; tag?: Tag };
type Q = { tr: string; en: string; opts: Opt[] };

const QUESTIONS: Q[] = [
  {
    tr: "Hangi SAP sürümünü kullanıyorsunuz?",
    en: "Which SAP version do you run?",
    opts: [
      { tr: "SAP ECC 6.0", en: "SAP ECC 6.0", pts: 0, tag: "s4" },
      { tr: "S/4HANA (On-Premise)", en: "S/4HANA (on-premise)", pts: 3 },
      { tr: "S/4HANA Cloud", en: "S/4HANA Cloud", pts: 3 },
      { tr: "Henüz SAP kullanmıyoruz / değerlendiriyoruz", en: "Not on SAP yet / evaluating", pts: 1, tag: "s4" },
    ],
  },
  {
    tr: "SAP desteğinizi bugün kim veriyor?",
    en: "Who supports your SAP system today?",
    opts: [
      { tr: "İç ekibimiz (kendi danışmanlarımız)", en: "Our in-house team", pts: 2 },
      { tr: "Bir danışmanlık firması (AMS anlaşması)", en: "A consulting partner (AMS contract)", pts: 3 },
      { tr: "Karma — iç ekip + dış destek", en: "Mixed — in-house plus external", pts: 2 },
      { tr: "Düzenli desteğimiz yok, ihtiyaç oldukça çözüyoruz", en: "No regular support — ad hoc only", pts: 0, tag: "ams" },
    ],
  },
  {
    tr: "Ay sonu kapanışınız kaç gün sürüyor?",
    en: "How many days does your month-end close take?",
    opts: [
      { tr: "3 gün veya daha az", en: "3 days or less", pts: 3 },
      { tr: "4–7 gün", en: "4–7 days", pts: 2, tag: "catalog" },
      { tr: "8 gün ve üzeri", en: "8 days or more", pts: 0, tag: "catalog" },
      { tr: "Ölçmüyoruz", en: "We don't measure it", pts: 1, tag: "catalog" },
    ],
  },
  {
    tr: "Hangi süreç hâlâ en çok Excel ve manuel emek istiyor?",
    en: "Which process still takes the most Excel and manual effort?",
    opts: [
      { tr: "Mutabakat, banka ve e-dönüşüm", en: "Reconciliation, banking and e-invoicing", pts: 0, tag: "catalog" },
      { tr: "Raporlama, dönemselleştirme, maliyet", en: "Reporting, accruals, costing", pts: 0, tag: "confiq" },
      { tr: "Satınalma, avans ve onay akışları", en: "Procurement, advances and approvals", pts: 1, tag: "catalog" },
      { tr: "Süreçlerimizin çoğu SAP içinde otomatik", en: "Most of our processes are automated inside SAP", pts: 3 },
    ],
  },
  {
    tr: "Kaç ülkede veya şirket kodunda SAP çalıştırıyorsunuz?",
    en: "In how many countries or company codes do you run SAP?",
    opts: [
      { tr: "Tek ülke, tek şirket kodu", en: "One country, one company code", pts: 3 },
      { tr: "Tek ülke, birden çok şirket kodu", en: "One country, multiple company codes", pts: 2 },
      { tr: "2–5 ülke", en: "2–5 countries", pts: 2, tag: "rollout" },
      { tr: "6 ülke ve üzeri", en: "6 countries or more", pts: 1, tag: "rollout" },
    ],
  },
  {
    tr: "SAP verinizde yapay zekâyı nasıl kullanıyorsunuz?",
    en: "How do you use AI on your SAP data?",
    opts: [
      { tr: "Aktif kullanıyoruz (raporlama, tahminleme)", en: "Actively — reporting, forecasting", pts: 3 },
      { tr: "Pilot çalışmamız var", en: "We have a pilot running", pts: 2, tag: "confiq" },
      { tr: "İlgileniyoruz ama nereden başlayacağımızı bilmiyoruz", en: "Interested, but unsure where to start", pts: 1, tag: "confiq" },
      { tr: "Şu an gündemimizde değil", en: "Not on our agenda right now", pts: 1 },
    ],
  },
];

const TOTAL = QUESTIONS.length;
const MAX = TOTAL * 3;

// Etiket → öneri metni (skor ekranında ve satışa giden e-postada kullanılır).
const ADVICE: Record<Tag, { tr: string; en: string; href: string }> = {
  s4: {
    tr: "S/4HANA geçiş yol haritası — ECC bakımı 2027'de bitiyor; dönüşümü planlamak için doğru zaman.",
    en: "S/4HANA migration roadmap — ECC maintenance ends in 2027; now is the time to plan.",
    href: "/hizmetler",
  },
  ams: {
    tr: "SAP destek (AMS) — düzenli destek olmadan riskler birikiyor; SLA'lı destek modeli öneriyoruz.",
    en: "SAP support (AMS) — risk accumulates without regular support; we suggest an SLA-based model.",
    href: "/hizmetler",
  },
  rollout: {
    tr: "Global rollout — çok ülkeli yapıda şablon ve lokalizasyon yönetimi en büyük kazancı sağlıyor.",
    en: "Global rollout — template and localisation management deliver the biggest gain in multi-country setups.",
    href: "/hizmetler",
  },
  catalog: {
    tr: "Hazır çözüm kataloğu — mutabakat, onay ve kapanış süreçleri için kurulmaya hazır çözümlerimiz var.",
    en: "Ready-to-deploy catalogue — we have prebuilt solutions for reconciliation, approvals and close.",
    href: "/cozumler",
  },
  confiq: {
    tr: "Confiq AI — SAP verinizi doğal dille sorgulayın, raporlama yükünü yapay zekâya devredin.",
    en: "Confiq AI — query your SAP data in natural language and hand reporting load to AI.",
    href: "/confiq",
  },
};

export default function Quiz({ locale }: { locale: Locale }) {
  const [qi, setQi] = useState(1); // 1..TOTAL aktif soru
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState<Opt[]>([]);

  const [form, setForm] = useState({ name: "", email: "", company: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const upd = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function choose(o: Opt) {
    const next = [...answers.slice(0, qi - 1), o];
    setAnswers(next);
    if (qi < TOTAL) setQi(qi + 1);
    else setDone(true);
  }
  function back() {
    if (qi > 1) setQi(qi - 1);
  }
  function reset() {
    setQi(1);
    setDone(false);
    setAnswers([]);
    setStatus("idle");
  }

  // Gerçek skor: verilen puanların 100'lük karşılığı.
  const pts = answers.reduce((s, a) => s + a.pts, 0);
  const score = done ? Math.round((pts / MAX) * 100) : 0;

  // Öneriler: cevaplardan gelen etiketler (tekrarsız, en fazla 3).
  const tags = Array.from(new Set(answers.map((a) => a.tag).filter(Boolean) as Tag[])).slice(0, 3);

  const band =
    score >= 75
      ? pick(locale, "Olgun kurulum", "Mature setup")
      : score >= 45
        ? pick(locale, "İyileştirmeye açık", "Room to improve")
        : pick(locale, "Yüksek potansiyel", "High potential");

  const summary =
    score >= 75
      ? pick(
          locale,
          "SAP kurulumunuz sağlam görünüyor. Buradan sonraki kazanç otomasyon ve yapay zekâ katmanında.",
          "Your SAP setup looks solid. The next gain lies in the automation and AI layer."
        )
      : score >= 45
        ? pick(
            locale,
            "Sisteminizde belirgin iyileştirme alanları var; birkaç hedefli müdahale hızlı kazanç sağlar.",
            "There are clear improvement areas; a few targeted moves deliver quick wins."
          )
        : pick(
            locale,
            "Manuel yük ve risk yüksek görünüyor. Önceliklendirilmiş bir yol haritası ciddi kazanç sağlar.",
            "Manual load and risk look high. A prioritised roadmap would deliver significant gains."
          );

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending" || status === "sent") return;
    setStatus("sending");
    try {
      // Cevaplar ve öneriler de gönderilir — satış görüşmesi hazır veriyle başlasın.
      const qa = answers.map((a, i) => `${pick(locale, QUESTIONS[i].tr, QUESTIONS[i].en)} → ${pick(locale, a.tr, a.en)}`);
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          // Uydurma sayısal skor yok; satışa nitel profil + cevaplar gider.
          score: band,
          lang: locale,
          answers: qa,
          recommendations: tags.map((t) => pick(locale, ADVICE[t].tr, ADVICE[t].en)),
        }),
      });
      const data = await res.json();
      setStatus(data.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const width = done ? "100%" : `${((qi - 1) / TOTAL) * 100 + 4}%`;
  const qCls = (n: number) => "q" + (!done && qi === n ? " on" : "");

  return (
    <div className="quiz">
      <div className="qbar">
        <i id="qprog" style={{ width }} />
      </div>

      {QUESTIONS.map((q, i) => (
        <div className={qCls(i + 1)} data-q={i + 1} key={i}>
          <h4>
            {i + 1} · {pick(locale, q.tr, q.en)}
          </h4>
          {q.opts.map((o, j) => (
            <button className="opt" onClick={() => choose(o)} key={j}>
              {pick(locale, o.tr, o.en)}
            </button>
          ))}
          {i > 0 ? (
            <button
              onClick={back}
              style={{
                background: "none",
                border: "none",
                color: "var(--mute)",
                font: "inherit",
                fontSize: 13.5,
                cursor: "pointer",
                padding: "8px 2px 0",
              }}
            >
              ← {pick(locale, "Önceki soru", "Previous question")}
            </button>
          ) : null}
        </div>
      ))}

      <div className={"qres" + (done ? " on" : "")} id="qres">
        <p className="eyebrow" style={{ justifyContent: "center" }}>
          {pick(locale, "Ön Değerlendirme", "Preliminary Assessment")} · {band}
        </p>
        <div className="score" id="scoreval">
          {done ? band : "—"}
        </div>
        <p style={{ marginTop: 8, color: "var(--ink-2)" }}>{summary}</p>

        {done && tags.length ? (
          <div style={{ textAlign: "left", margin: "18px auto 4px", maxWidth: 520, display: "grid", gap: 10 }}>
            <p className="eyebrow">{pick(locale, "Cevaplarınıza göre öncelik", "Priorities based on your answers")}</p>
            {tags.map((t) => (
              <p key={t} style={{ margin: 0, fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.55 }}>
                <span style={{ color: "var(--amber-d)", fontWeight: 700 }}>›</span> {pick(locale, ADVICE[t].tr, ADVICE[t].en)}
              </p>
            ))}
          </div>
        ) : null}

        <p style={{ color: "var(--ink-2)", marginTop: 14 }}>
          {pick(
            locale,
            "Detaylı bakış için bilgilerinizi bırakın; 48 saat içinde uzman yorumuyla dönüş yapalım. Sayısal bir “sistem skoru” uydurmayız — rapor sizin cevaplarınıza ve konuşmaya göre yazılır.",
            "Leave your details for a detailed look and we will come back within 48 hours with an expert note. We do not invent a numeric “system score” — the write-up follows your answers and the conversation."
          )}
        </p>

        {status === "sent" ? (
          <div className="frm" style={{ textAlign: "center" }}>
            <p style={{ color: "var(--green)", fontWeight: 600 }}>
              {pick(
                locale,
                "Teşekkürler! Talebiniz alındı, 48 saat içinde dönüş yapacağız.",
                "Thank you! Your request was received — we'll get back to you within 48 hours."
              )}
            </p>
          </div>
        ) : (
          <form className="frm" onSubmit={submit}>
            <input type="text" required placeholder={pick(locale, "Ad Soyad", "Full name")} value={form.name} onChange={upd("name")} />
            <input type="email" required placeholder={pick(locale, "Kurumsal e-posta", "Business email")} value={form.email} onChange={upd("email")} />
            <input type="text" placeholder={pick(locale, "Şirket", "Company")} value={form.company} onChange={upd("company")} />
            {/* honeypot — gizli; botlar doldurursa istek sessizce yutulur */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={form.website}
              onChange={upd("website")}
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            />
            <button className="btn btn-p" type="submit" disabled={status === "sending"}>
              {status === "sending"
                ? pick(locale, "Gönderiliyor…", "Sending…")
                : pick(locale, "Detaylı raporu gönderin", "Send my detailed report")}
            </button>
            {status === "error" ? (
              <p style={{ color: "var(--amber-d)", fontSize: 13.5 }}>
                {pick(
                  locale,
                  "Bir sorun oluştu. Lütfen tekrar deneyin ya da info@conforcus.com'a yazın.",
                  "Something went wrong. Please try again or email info@conforcus.com."
                )}
              </p>
            ) : null}
          </form>
        )}
        <button className="btn btn-g" style={{ marginTop: 16 }} onClick={reset}>
          ↺ {pick(locale, "Değerlendirmeyi yeniden başlat", "Restart assessment")}
        </button>
        <p className="note">
          {pick(
            locale,
            "* Değerlendirme, verdiğiniz 6 cevaba dayanır. Form bilgileri info@conforcus.com adresine iletilir. Taahhüt yoktur.",
            "* The assessment is based on your six answers. Form details are sent to info@conforcus.com. No commitment."
          )}
        </p>
      </div>
    </div>
  );
}
