#!/usr/bin/env python3
"""Caddy erişim günlüklerinden kısa bir özet çıkarır (yalnız standart kitaplık).

Ziyaret ölçümü (Plausible) tarayıcıları göremez; bu betik onu tamamlar: yapay zekâ asistanlarının
ve arama motorlarının siteyi ne kadar okuduğunu, asistanlardan gelen ziyaretleri, bulunamayan
adresleri ve analiz formu gönderimlerini gösterir. Hiçbir şeyi değiştirmez, yalnız okur.

Sunucuda:  python3 /opt/conforcus-web/scripts/log-report.py --days 7
Seçenekler: --dir <klasör>  --days <gün>  --top <satır>  --host <alan adı>  --json
Günlük biçimi ve saklama süresi Caddyfile'daki (erisim_gunlugu) parçasında tanımlıdır.
"""
import argparse
import collections
import glob
import gzip
import json
import os
import re
import sys
import time
from urllib.parse import parse_qs, urlsplit

DEFAULT_DIR = "/var/lib/docker/volumes/conforcus-web_caddy_data/_data/logs"
PREFIX = "conforcus-web-access"

# (kullanıcı aracısındaki işaret, görünen ad, sınıf) — ilk eşleşen geçerlidir, sıra önemlidir.
AI_FETCH, AI_SEARCH, AI_TRAIN, SEARCH, TOOL = "ai-kullanici", "ai-arama", "ai-egitim", "arama", "arac"
BOTS = [
    ("ChatGPT-User", "ChatGPT (kullanıcı adına)", AI_FETCH),
    ("OAI-SearchBot", "ChatGPT araması", AI_SEARCH),
    ("GPTBot", "OpenAI GPTBot", AI_TRAIN),
    ("Claude-User", "Claude (kullanıcı adına)", AI_FETCH),
    ("Claude-SearchBot", "Claude araması", AI_SEARCH),
    ("ClaudeBot", "Anthropic ClaudeBot", AI_TRAIN),
    ("anthropic-ai", "Anthropic (eski)", AI_TRAIN),
    ("Perplexity-User", "Perplexity (kullanıcı adına)", AI_FETCH),
    ("PerplexityBot", "Perplexity araması", AI_SEARCH),
    ("MistralAI-User", "Mistral (kullanıcı adına)", AI_FETCH),
    ("DuckAssistBot", "DuckDuckGo asistanı", AI_FETCH),
    ("Google-CloudVertexBot", "Google Vertex", AI_TRAIN),
    ("GoogleOther", "GoogleOther", AI_TRAIN),
    ("meta-externalagent", "Meta AI", AI_TRAIN),
    ("meta-externalfetcher", "Meta AI (kullanıcı adına)", AI_FETCH),
    ("Amazonbot", "Amazonbot", AI_TRAIN),
    ("Bytespider", "Bytespider", AI_TRAIN),
    ("CCBot", "Common Crawl", AI_TRAIN),
    ("cohere-ai", "Cohere", AI_TRAIN),
    ("YouBot", "You.com", AI_SEARCH),
    ("Applebot", "Applebot", SEARCH),
    ("Googlebot", "Googlebot", SEARCH),
    ("Google-InspectionTool", "Google denetim aracı", SEARCH),
    ("bingbot", "Bingbot", SEARCH),
    ("BingPreview", "Bing önizleme", SEARCH),
    ("YandexBot", "Yandex", SEARCH),
    ("DuckDuckBot", "DuckDuckGo", SEARCH),
    ("Baiduspider", "Baidu", SEARCH),
    ("AhrefsBot", "Ahrefs", TOOL),
    ("SemrushBot", "Semrush", TOOL),
    ("MJ12bot", "Majestic", TOOL),
    ("DotBot", "Moz", TOOL),
    ("DataForSeoBot", "DataForSEO", TOOL),
    ("Chrome-Lighthouse", "Lighthouse", TOOL),
]
BROWSER_PREFIXES = ("Mozilla/", "Opera/")
GENERIC_BOT = re.compile(r"bot\b|bot/|crawl|spider|slurp|curl/|wget|python-|go-http-client|okhttp|headless|scrapy|httpclient|monitor|uptime|node-fetch|axios|libwww|java/", re.I)
CLASS_TITLES = {
    AI_FETCH: "Yapay zekâ asistanı — kullanıcının sorusu üzerine sayfayı okudu",
    AI_SEARCH: "Yapay zekâ araması — dizine almak için taradı",
    AI_TRAIN: "Yapay zekâ — eğitim/genel tarama",
    SEARCH: "Arama motoru",
    TOOL: "SEO ve ölçüm araçları",
}
# Yapay zekâ asistanlarından gelen ziyaret: yönlendiren alan adı ya da utm_source değeri.
AI_REFERRERS = ["chatgpt.com", "chat.openai.com", "perplexity.ai", "claude.ai", "gemini.google.com", "copilot.microsoft.com", "you.com", "phind.com", "poe.com", "chat.deepseek.com", "chat.mistral.ai", "meta.ai", "duck.ai", "kagi.com"]
# Form ucunun yanıt kodları. 200, isteğin kabul edildiğini gösterir; e-postanın gerçekten gittiği
# günlükten anlaşılmaz (SMTP ayarlı değilken ve botların doldurduğu gizli alanda da 200 döner).
LEAD_LABELS = {
    200: "kabul edildi (200)",
    400: "geçersiz istek (400)",
    413: "gövde çok büyük (413)",
    422: "eksik ya da hatalı alan (422)",
    429: "hız sınırına takıldı (429)",
    502: "e-posta gönderilemedi (502)",
}
ASSET = re.compile(r"^/(_next/|img/|olcum/|api/|favicon\.ico|icon\.png|apple-icon\.png|logo\.png|og$|robots\.txt|sitemap\.xml|llms)")


def classify(ua):
    for token, name, kind in BOTS:
        if token.lower() in ua.lower():
            return name, kind
    # Tarayıcılar "Mozilla/" ile, Opera Mini ve eski Opera ise "Opera/" ile başlar; böyle başlamayan
    # (curl, node, betikler) ya da genel bot kalıbına uyan her şey otomatik sayılır. Kendini tarayıcı
    # gibi tanıtan botlar ayırt edilemez.
    if not ua.startswith(BROWSER_PREFIXES) or GENERIC_BOT.search(ua):
        return "Diğer otomatik istek", "diger"
    return None, "insan"


def read_lines(directory):
    files = sorted(glob.glob(os.path.join(directory, PREFIX + "*.log*")), key=os.path.getmtime)
    for path in files:
        opener = gzip.open if path.endswith(".gz") else open
        try:
            with opener(path, "rt", encoding="utf-8", errors="replace") as fh:
                yield from fh
        except OSError as err:
            print(f"uyarı: {path} okunamadı ({err})", file=sys.stderr)


def first(headers, name):
    value = headers.get(name) or headers.get(name.lower()) or []
    return value[0] if value else ""


def main():
    ap = argparse.ArgumentParser(description="Caddy erişim günlüğü özeti")
    ap.add_argument("--dir", default=os.environ.get("LOG_DIR", DEFAULT_DIR))
    ap.add_argument("--days", type=float, default=7)
    ap.add_argument("--top", type=int, default=10)
    ap.add_argument("--host", default="", help="yalnız bu alan adı (boş: hepsi)")
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()

    since = time.time() - args.days * 86400
    total = 0
    statuses = collections.Counter()
    human_pages = collections.Counter()
    human_views = 0
    referrers = collections.Counter()
    ai_visits = collections.Counter()
    ai_landing = collections.Counter()
    bots = {}  # ad -> {"kind", "hits", "paths": Counter}
    llms = collections.Counter()
    not_found = collections.Counter()
    leads = collections.Counter()
    first_ts = last_ts = None

    for line in read_lines(args.dir):
        try:
            e = json.loads(line)
        except ValueError:
            continue
        ts = e.get("ts")
        req = e.get("request") or {}
        if not isinstance(ts, (int, float)) or ts < since or not req:
            continue
        host = req.get("host", "")
        if args.host and host != args.host:
            continue
        total += 1
        first_ts = ts if first_ts is None else min(first_ts, ts)
        last_ts = ts if last_ts is None else max(last_ts, ts)
        status = int(e.get("status") or 0)
        statuses[status // 100 * 100] += 1
        headers = req.get("headers") or {}
        ua = first(headers, "User-Agent")
        uri = req.get("uri", "")
        parts = urlsplit(uri)
        path = parts.path or "/"
        method = req.get("method", "")
        name, kind = classify(ua)

        if path.startswith("/llms"):
            llms[(path, name or "tarayıcı")] += 1
        if method == "POST" and path == "/api/lead":
            leads[LEAD_LABELS.get(status, f"diğer ({status})")] += 1
        if status == 404 and kind == "insan" and not ASSET.match(path):
            not_found[path] += 1

        if name:
            b = bots.setdefault(name, {"kind": kind, "hits": 0, "paths": collections.Counter()})
            b["hits"] += 1
            if not ASSET.match(path) or path.startswith("/llms"):
                b["paths"][path] += 1
            continue
        if kind != "insan":
            continue

        ctype = first(e.get("resp_headers") or {}, "Content-Type")
        is_page = method == "GET" and status == 200 and ctype.startswith("text/html") and "_rsc=" not in parts.query
        if not is_page:
            continue
        human_views += 1
        human_pages[path] += 1
        ref_host = urlsplit(first(headers, "Referer")).netloc.lower().removeprefix("www.")
        utm = (parse_qs(parts.query).get("utm_source") or [""])[0].lower()
        if ref_host and ref_host != host.removeprefix("www."):
            referrers[ref_host] += 1
        source = next((d for d in AI_REFERRERS if ref_host.endswith(d) or d in utm), "")
        if source:
            ai_visits[source] += 1
            ai_landing[path] += 1

    by_kind = collections.defaultdict(list)
    for name, b in bots.items():
        by_kind[b["kind"]].append((name, b["hits"], len(b["paths"]), b["paths"].most_common(5)))

    if args.json:
        out = {
            "donem_gun": args.days,
            "ilk": first_ts,
            "son": last_ts,
            "toplam_istek": total,
            "durum": dict(statuses),
            "insan_sayfa": human_views,
            "sayfalar": human_pages.most_common(args.top),
            "gelinen": referrers.most_common(args.top),
            "asistandan_gelen": dict(ai_visits),
            "asistan_inis": ai_landing.most_common(args.top),
            "tarayicilar": {k: sorted(v, key=lambda x: -x[1]) for k, v in by_kind.items()},
            "llms": {f"{p} · {n}": c for (p, n), c in llms.items()},
            "bulunamayan": not_found.most_common(args.top),
            "form": dict(leads),
        }
        json.dump(out, sys.stdout, ensure_ascii=False, indent=1)
        print()
        return

    fmt = lambda t: time.strftime("%d.%m.%Y %H:%M UTC", time.gmtime(t)) if t else "—"
    print(f"Erişim günlüğü özeti — son {args.days:g} gün" + (f" · {args.host}" if args.host else ""))
    if not total:
        print(f"Bu dönemde kayıt yok ({args.dir}).")
        return
    print(f"Kayıt aralığı: {fmt(first_ts)} – {fmt(last_ts)}")
    print(f"Toplam istek: {total} · durum kodları: " + ", ".join(f"{k // 100}xx: {v}" for k, v in sorted(statuses.items())))

    def table(title, rows, empty="kayıt yok"):
        print(f"\n{title}")
        if not rows:
            print(f"  ({empty})")
        for label, count in rows:
            print(f"  {count:6d}  {label}")

    print(f"\nTarayıcıyla açılan sayfa (tahmini, botlar hariç): {human_views}")
    table("En çok açılan sayfalar", human_pages.most_common(args.top))
    table("Gelinen siteler", referrers.most_common(args.top), "yönlendiren site yok")
    table("Yapay zekâ asistanlarından gelen ziyaret", ai_visits.most_common(), "henüz yok")
    if ai_landing:
        table("  Asistanların gönderdiği sayfalar", ai_landing.most_common(args.top))

    for kind in (AI_FETCH, AI_SEARCH, AI_TRAIN, SEARCH, TOOL):
        rows = sorted(by_kind.get(kind, []), key=lambda x: -x[1])
        print(f"\n{CLASS_TITLES[kind]}")
        if not rows:
            print("  (istek yok)")
        for name, hits, distinct, top in rows:
            print(f"  {hits:6d}  {name} · {distinct} farklı sayfa")
            for p, c in top[:3]:
                print(f"            {c:5d}  {p}")
    other = by_kind.get("diger", [])
    if other:
        print(f"\nDiğer otomatik istekler: {sum(x[1] for x in other)}")

    table("llms.txt dosyalarını okuyanlar", [(f"{p} · {n}", c) for (p, n), c in llms.most_common(args.top)], "okunmadı")
    table("Bulunamayan adresler (404, tarayıcıdan)", not_found.most_common(args.top), "yok")
    table("Analiz formu gönderimleri (kabul, teslim anlamına gelmez; teslim için info@ kutusuna bakın)", sorted(leads.items()), "gönderim yok")


if __name__ == "__main__":
    main()
