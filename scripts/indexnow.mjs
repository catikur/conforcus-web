#!/usr/bin/env node
/* IndexNow bildirimi — Bing, Yandex, Seznam ve Naver'a "bu adresler değişti" der.
   Bing dizini ChatGPT araması ve Copilot'un da kaynağıdır.

   Kullanım (DNS geçişinden SONRA, canlı alan adıyla):
     node scripts/indexnow.mjs https://www.conforcus.com
     node scripts/indexnow.mjs https://www.conforcus.com /cozumler/e-fatura /blog/yeni-yazi

   Adres verilmezse sitemap.xml'deki bütün sayfalar bildirilir.
   Anahtar public/<anahtar>.txt dosyasındadır (gizli değildir; sahipliği kanıtlar). */
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const site = (process.argv[2] || "").replace(/\/+$/, "");
const paths = process.argv.slice(3).filter((a) => !a.startsWith("--"));
const force = process.argv.includes("--force");
if (!/^https:\/\/[a-z0-9.-]+$/.test(site)) {
  console.error("Kullanım: node scripts/indexnow.mjs https://www.conforcus.com [yol ...]");
  process.exit(1);
}
const host = new URL(site).host;
if (host !== "www.conforcus.com" && !force) {
  console.error(`${host} canlı alan adı değil (test alanı arama motorlarına kapalıdır). Yine de göndermek için --force ekleyin.`);
  process.exit(1);
}

const pub = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const keyFile = readdirSync(pub).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error("public/ altında IndexNow anahtar dosyası bulunamadı.");
  process.exit(1);
}
const key = keyFile.replace(/\.txt$/, "");

let urlList = paths.map((p) => site + (p.startsWith("/") ? p : "/" + p));
if (!urlList.length) {
  const xml = await (await fetch(`${site}/sitemap.xml`)).text();
  urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((x) => x.startsWith(site));
}
if (!urlList.length) {
  console.error("Bildirilecek adres yok.");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `${site}/${keyFile}`, urlList }),
});
console.log(`IndexNow: ${urlList.length} adres bildirildi → HTTP ${res.status} ${res.statusText}`);
process.exit(res.ok ? 0 : 1);
