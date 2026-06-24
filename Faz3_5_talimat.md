# Faz 3.5 — İçerik Tiplerini Sanity'ye Taşıma (Claude Code talimatı)

## ÖNCE OKU — kapsam ve sınır
- Bu talimat, kullanıcının ÜZERİNDE ÇALIŞTIĞI MEVCUT KODU temel alır; mevcut
  sayfa yapısı, mobil uyumlu düzen ve kullanıcının yaptığı tüm değişiklikler
  KORUNUR. Hiçbir mevcut sayfa eski bir sürümle değiştirilMEZ.
- Yeni eklenecek ve mevcutta OLMAYAN üç bileşenin TASARIM referansı ayrı bir
  dosyadır: `conforcus_yeni_bilesenler_v14.html`. Bu föy tam site değildir;
  ondan SADECE şu üç bileşenin görünümü alınır: (1) referans detay sayfası,
  (2) testimonial kartları, (3) harita logo-popup'ı. Föydeki renk/tema zaten
  sitede mevcuttur; yeniden tanımlama.
- Mevcut blog (post/author) kurulumunu BOZMA.

Aşağıdaki içerik tiplerini Sanity'ye taşı; kodda gömülü olan eşdeğer veriyi
(data/*.ts, content/*.json) Sanity'den okumaya çevir. Her tip için TR/EN
alanları zorunlu.

## Yeni/genişletilen şemalar
1. reference: name, logo(image), slug, sector_tr, sector_en,
   countries (string[]; harita eşleşmesi için prototipteki ülke adlarıyla
   BİREBİR aynı yazım), blurb_tr, blurb_en (popup; kısa), body_tr, body_en
   (portable text; detay sayfası), featured(bool), order(number).
2. testimonial: quote_tr, quote_en, person, role, company,
   reference (ref→reference, opsiyonel), featured(bool), order(number).
3. solution: name_tr, name_en, module(FI|CO|MM|SD|PS|FM),
   group(fin|log), slug, short_tr, short_en, body_tr, body_en,
   featured(bool), order(number). (Mevcut 48 kaydı seed olarak içe aktar.)
4. jobPosting: title_tr, title_en, location, body_tr, body_en,
   active(bool), applyEmail/applyUrl.
5. siteSettings (tek doküman/singleton): hero_title_tr/en,
   hero_sub_tr/en, hero_cta_primary_tr/en, hero_cta_secondary_tr/en.

## Yeni route'lar / sayfa değişiklikleri
- `/referanslar/[slug]` ve `/en/references/[slug]`: reference detay sayfası
  (body + logo + sektör + bağlı testimonial'lar). ISR revalidate:60.
- Referanslar listesi + ana sayfa logo duvarı: REFS verisini Sanity
  `reference`'tan çek; her logo detay sayfasına link.
- Harita (components/WorldMap): boyalı ülkeler OTOMATİK belirlenir =
  en az bir reference kaydının countries[] alanında geçen her ülke.
  Ayrı 'boyanacak ülke' listesi TUTULMAZ. Ülke hover panelinde o ülkeye
  bağlı reference LOGOLARI gösterilir; her logo → ilgili referans detay
  sayfası linki. Harita motorunun mevcut davranışı/görünümü korunur;
  sadece panel içeriği logo'ya döner ve veri kaynağı Sanity olur.
- Ana sayfa + referanslar: testimonial bölümü (featured=true olanlar).
  Tasarım: Halo temasına uygun, alıntı kartları (sade, tırnak vurgulu).
- Çözüm kataloğu (/cozumler) ve ana sayfa Finans/Lojistik tabları:
  solution'dan oku; tablardaki 6'şar kart featured=true seçilenler.
- /cozumler/[slug] detay sayfası (body_tr/en) — opsiyonel ama tercih edilir.
- Kariyer (conforcus-way içindeki iş listesi): jobPosting active=true'dan.
- Hero metinleri: siteSettings'ten.

## Webhook
Sanity publish webhook'u zaten /api/revalidate'i tetikliyor; yeni doküman
tiplerinin yollarını (reference, solution, testimonial, jobPosting,
siteSettings → ana sayfa) revalidate listesine ekle.

## Kabul kriterleri
- Panelden bir reference eklenince: logo duvarı, referanslar sayfası,
  (ülke etiketliyse) harita ve detay sayfası birkaç dakikada güncellenir.
- testimonial featured işaretlenince ana sayfada görünür.
- Tüm metinler TR/EN; eksik dilde zarif geri-dönüş (fallback).
- Yeni üç bileşenin görünümü `conforcus_yeni_bilesenler_v14.html`e uygun;
  mevcut sayfaların görünümü ve mobil düzeni AYNEN korunur; tema korunur.
- next build hatasız; Lighthouse skorları gerilemez.
