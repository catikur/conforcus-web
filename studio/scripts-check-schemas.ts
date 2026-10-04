// Dağıtım öncesi şema denetimi: her şema modülü Node'da yüklenebiliyor mu?
// `sanity build` tip denetimi yapmaz; eksik bir import Studio'yu açılışta düşürür
// (2026-09-13'te defineArrayMember importu unutuldu ve Studio 3 hafta açılmadı).
// Çalıştırma: npm run check
(async () => {
  let bad = 0;
  for (const f of ["index", "solution", "reference", "post", "author", "teamMember", "testimonial", "jobPosting", "siteSettings", "objects"]) {
    try {
      const m: Record<string, unknown> = await import(`./schemas/${f}.ts`);
      const n = Array.isArray(m.schemaTypes) ? `${(m.schemaTypes as unknown[]).length} tip` : "";
      console.log("ok   ", f, n);
    } catch (e) {
      bad++;
      console.error("HATA ", f, "→", (e as Error).name, (e as Error).message);
    }
  }
  if (bad) {
    console.error(`\n${bad} şema modülü yüklenemedi — Studio bu haliyle açılmaz. Dağıtım durduruldu.`);
    process.exit(1);
  }
})();
