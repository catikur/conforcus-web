# CLAUDE.md — conforcus.com Yapım Şartnamesi (v2 — VPS Mimarisi)

Bu klasörde `conforcus_site_v13.html` bulunur: onaylanmış tek dosyalık tasarım
prototipi. **Tasarımın tek doğru kaynağı odur** — tüm CSS token'ları, Halo &
Segment teması, harita motoru, veri dizileri ve TR/EN metinler içindedir.

## Hedef
Prototiple birebir aynı görünümde, çok sayfalı, SEO-dostu, **Hostinger VPS
üzerinde Docker ile yayınlanan**, Sanity CMS ile blog yönetilen üretim sürümü.

## Altyapı (mevcut, kurulu)
- Hostinger VPS **KVM 8** — 8 vCPU / 32 GB RAM / 400 GB disk
- Ubuntu 24.04 LTS, hostname: `srv1709361.hstgr.cloud` (ID: 1709361)
- Sunucu şu an boş (Docker compose projesi yok) — siteyi `conforcus-web`
  adlı compose projesi olarak kuracağız. Sunucudaki başka hiçbir şeye dokunma.
- SSH erişimi: Atilla hPanel'den SSH anahtarını ekler (Claude Code anahtar
  üretir, ekleme işlemini Atilla panelden kendisi yapar).

## Teknoloji kararları (tartışmasız)
- **Next.js (App Router), tam sunucu modu** — `output: 'standalone'`.
  Static export DEĞİL. Blog sayfalarında ISR (`revalidate: 60`).
- **CSS: prototipteki özel CSS aynen taşınır.** Tailwind KULLANMA.
  Token'lar `app/globals.css`e.
- **Dil:** TR varsayılan (`/`), İngilizce `/en/...`. `.tr/.en` span'ları
  `content/tr.json` ve `content/en.json` sözlüklerine ayrıştırılır.
- **Blog: Sanity** (hosted Studio). Şema: `post` {title_tr/en, slug,
  excerpt_tr/en, body_tr/en (portable text), coverImage, author→ref,
  category, publishedAt}; `author` {name, role, photo}. Taslak→Yayın akışı.
- **API rotaları (PHP yok):**
  - `POST /api/lead` → analiz formu: doğrula, SMTP ile info@conforcus.com'a
    ilet (env: SMTP_HOST/USER/PASS), JSON dön. Rate-limit ekle.
  - `POST /api/revalidate` → Sanity webhook'u: secret doğrula, blog
    yollarını revalidate et (anında yayın).

## Dağıtım mimarisi — Docker Compose (`conforcus-web`)
```yaml
services:
  web:
    build: .
    restart: unless-stopped
    environment:
      - SANITY_PROJECT_ID=${SANITY_PROJECT_ID}
      - SANITY_DATASET=production
      - SMTP_HOST=${SMTP_HOST}
      - SMTP_USER=${SMTP_USER}
      - SMTP_PASS=${SMTP_PASS}
      - REVALIDATE_SECRET=${REVALIDATE_SECRET}
  caddy:
    image: caddy:2
    restart: unless-stopped
    ports: ["80:80", "443:443"]
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
volumes: { caddy_data: {} }
```
`Caddyfile`: `conforcus.com, www.conforcus.com { reverse_proxy web:3000 }`
→ SSL (Let's Encrypt) otomatik. `Dockerfile`: Node 20-alpine, standalone build.

## İşletme akışı
- **Kurulum/güncelleme:** Claude Code SSH ile `git pull && docker compose up
  -d --build` (repo GitHub'da `conforcus-web`).
- **İzleme:** Hostinger MCP üzerinden proje/konteyner durumu ve loglar
  (Claude chat tarafı da erişebilir).
- **DNS geçişi:** İş bittiğinde conforcus.com A kaydı VPS IP'sine alınır —
  bu adım yalnızca Atilla'nın açık onayıyla yapılır.

## Fazlar ve kabul kriterleri
1. **İskelet + tasarım taşıma:** Tüm sayfalar statik içerikle; prototiple
   piksel düzeyinde aynı. `next build` hatasız.
2. **i18n:** TR/EN rotaları; dil anahtarı sayfa eşleniğine götürür.
3. **Sanity + API:** Blog CMS'ten gelir (ISR), 3 örnek yazı; /api/lead ve
   /api/revalidate çalışır ve test edilir.
4. **VPS dağıtımı:** Docker imajı kurulur, compose `conforcus-web` ayağa
   kalkar, geçici olarak `srv1709361.hstgr.cloud` üzerinden doğrulanır,
   ardından (onayla) DNS + SSL. Sunucu güvenliği: UFW 22/80/443, fail2ban.
5. **Cila:** Lighthouse ≥ 90, sitemap.xml, sayfa başına meta/OG, 404,
   yedekleme notu (Hostinger snapshot/backup takvimi).

## Kurallar
- Tasarım token'larına ve Halo temasına sadık kal; görsel "iyileştirme" yapma.
- `prefers-reduced-motion`, tek H1/sayfa, skip-link, odak halkaları korunur.
- VPS'te `conforcus-web` dışındaki hiçbir kaynağa dokunma; yıkıcı komut
  (silme, format) çalıştırma.
- Her faz sonunda kısa Türkçe özet ver ve sonraki faz için onay iste.
