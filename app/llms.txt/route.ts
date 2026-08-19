import { COMPANY, SITE_URL } from "@/lib/site";
import { ROUTES } from "@/lib/i18n";

export function GET() {
  const u = (path: string) => SITE_URL + path;
  const body = `# Conforcus

> ${COMPANY.legalName} is a SAP consultancy delivering deep
> expertise across SAP support (AMS), S/4HANA transformations, global rollout, and 48+
> ready-made SAP solutions. 130+ active clients, 50+ countries, 30+ industries, 70+
> consultants, 95% client retention. Headquartered in Ataşehir, İstanbul, Türkiye.
> Tagline: "${COMPANY.slogan}" Default language Turkish (/),
> English under /en/.

## Services
- SAP Support Services (AMS): ${u(ROUTES["hizmet-sap-ams"].tr)} — ${u(ROUTES["hizmet-sap-ams"].en)}
- S/4HANA Transformations: ${u(ROUTES["hizmet-s4hana"].tr)} — ${u(ROUTES["hizmet-s4hana"].en)}
- Global Rollout: ${u(ROUTES["hizmet-rollout"].tr)} — ${u(ROUTES["hizmet-rollout"].en)}
- Product & Solution Development: ${u(ROUTES["hizmet-urun"].tr)} — ${u(ROUTES["hizmet-urun"].en)}

## Confiq — AI Product Family
- Confiq Decode: ask SAP in plain language, get answers in seconds.
- Confiq Predict: 3–6 months of foresight in cash flow and financial risk.
- Confiq Cortex: decision intelligence uniting questions and foresight.
- Confiq Bridge: smart cross-module data flow and automation.
- Confiq Scan (FREE): comprehensive SAP system analysis and risk map within 48 hours.

## Key pages
- Home (TR): ${u("/") }
- Home (EN): ${u("/en")}
- Services / Hizmetler: ${u("/hizmetler")} — ${u("/en/services")}
- Solution Catalog / Çözümler: ${u("/cozumler")} — ${u("/en/solutions")}
- About / Hakkımızda: ${u("/hakkimizda")} — ${u("/en/about")}
- Contact / İletişim: ${u("/iletisim")} — ${u("/en/contact")}
- Confiq AI: ${u("/confiq")} — ${u("/en/confiq")}
- References / Referanslar: ${u("/referanslar")} — ${u("/en/references")}
- Conforcus Way & Careers: ${u("/conforcus-way")} — ${u("/en/conforcus-way")}
- Blog: ${u("/blog")} — ${u("/en/blog")}
- Free SAP Analysis / Ücretsiz SAP Analizi: ${u("/analiz")} — ${u("/en/analysis")}
- KVKK / Privacy: ${u("/kvkk")} — ${u("/en/privacy")}
- Cookies / Çerez: ${u("/cerez")} — ${u("/en/cookies")}

## Contact
- Email: ${COMPANY.email}
- HR: ${COMPANY.hrEmail}
- Phone: ${COMPANY.telephoneDisplay}
- LinkedIn: ${COMPANY.linkedin}
- Address: ${COMPANY.addressLine}, Türkiye
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
