"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { pick, type Locale } from "@/lib/i18n";

// Ücretsiz SAP analizi mini değerlendirmesi (prototip .quiz mantığı).
const TOTAL = 5;

export default function Quiz({ locale }: { locale: Locale }) {
  const [qi, setQi] = useState(1); // 1..5 aktif soru
  const [done, setDone] = useState(false);

  function advance() {
    if (qi < TOTAL) setQi(qi + 1);
    else setDone(true);
  }
  function reset() {
    setQi(1);
    setDone(false);
    setStatus("idle");
  }

  const [form, setForm] = useState({ name: "", email: "", company: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const upd = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending" || status === "sent") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, score: "68/100", lang: locale }),
      });
      const data = await res.json();
      setStatus(data.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  const width = done ? "100%" : qi === 1 ? "4%" : `${((qi - 1) / TOTAL) * 100}%`;
  const qCls = (n: number) => "q" + (!done && qi === n ? " on" : "");
  const opt = (tr: string, en: string) => (
    <button className="opt" onClick={advance}>
      {pick(locale, tr, en)}
    </button>
  );

  return (
    <div className="quiz">
      <div className="qbar">
        <i id="qprog" style={{ width }} />
      </div>

      <div className={qCls(1)} data-q="1">
        <h4>{pick(locale, "1 · Hangi SAP sürümünü kullanıyorsunuz?", "1 · Which SAP version do you run?")}</h4>
        <button className="opt" onClick={advance}>
          SAP ECC
        </button>
        <button className="opt" onClick={advance}>
          S/4HANA (On-Premise)
        </button>
        <button className="opt" onClick={advance}>
          S/4HANA Cloud
        </button>
      </div>

      <div className={qCls(2)} data-q="2">
        <h4>{pick(locale, "2 · Dönem sonu kapanışınız kaç gün sürüyor?", "2 · How many days does your period-end close take?")}</h4>
        {opt("3 günden az", "Under 3 days")}
        <button className="opt" onClick={advance}>
          3–7
        </button>
        {opt("7 günden fazla", "Over 7 days")}
      </div>

      <div className={qCls(3)} data-q="3">
        <h4>
          {pick(
            locale,
            "3 · Ekipleriniz raporlar için Excel'e ne sıklıkla dönüyor?",
            "3 · How often do your teams fall back to Excel for reports?"
          )}
        </h4>
        {opt("Nadiren", "Rarely")}
        {opt("Haftada birkaç kez", "A few times a week")}
        {opt("Her gün", "Every day")}
      </div>

      <div className={qCls(4)} data-q="4">
        <h4>
          {pick(
            locale,
            "4 · Banka, e-dönüşüm ve mutabakat süreçleriniz ne kadar otomatik?",
            "4 · How automated are your bank, e-invoicing and reconciliation processes?"
          )}
        </h4>
        {opt("Büyük ölçüde otomatik", "Mostly automated")}
        {opt("Kısmen", "Partially")}
        {opt("Çoğunlukla manuel", "Mostly manual")}
      </div>

      <div className={qCls(5)} data-q="5">
        <h4>{pick(locale, "5 · Önümüzdeki 12 ayda önceliğiniz hangisi?", "5 · What is your priority for the next 12 months?")}</h4>
        {opt("S/4HANA dönüşümü", "S/4HANA transformation")}
        {opt("Süreç otomasyonu / verimlilik", "Process automation / efficiency")}
        {opt("Raporlama ve yapay zekâ", "Reporting & AI")}
      </div>

      <div className={"qres" + (done ? " on" : "")} id="qres">
        <p className="eyebrow" style={{ justifyContent: "center" }}>
          {pick(locale, "Ön Değerlendirme", "Preliminary Assessment")}
        </p>
        <div className="score" id="scoreval">
          {done ? "68/100" : "—"}
        </div>
        <p style={{ marginTop: 8, color: "var(--ink-2)" }}>
          {pick(
            locale,
            "Sisteminizde belirgin iyileştirme alanları görünüyor. Detaylı raporunuz için bilgilerinizi bırakın; 48 saat içinde uzman yorumuyla birlikte gönderelim.",
            "Your system shows clear room for improvement. Leave your details and we'll send your full report with expert commentary within 48 hours."
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
              {status === "sending" ? pick(locale, "Gönderiliyor…", "Sending…") : pick(locale, "Raporu Gönderin", "Send My Report")}
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
            "* Skor örnektir; canlı sitede Confiq Scan motorundan gelecek. Form bilgileri info@conforcus.com adresine iletilir.",
            "* The score is a sample; on the live site it will come from the Confiq Scan engine. Form details are sent to info@conforcus.com."
          )}
        </p>
      </div>
    </div>
  );
}
