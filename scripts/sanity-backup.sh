#!/bin/sh
# Sanity veri seti yedeği — belgeler (NDJSON) + görsel/dosya varlıkları.
#
# Sunucuda haftalık çalışır (bkz. scripts/README-backup.md). Veri seti herkese açık
# olduğundan token gerekmez; taslaklar yedeğe girmez (yalnız yayımlanmış içerik).
# Hiçbir şey silmez: her çalıştırma yeni bir tarihli dosya ekler, varlıklar bir kez iner.
#
# Geri yükleme: gunzip -k sanity-production-<tarih>.ndjson.gz
#               npx sanity dataset import sanity-production-<tarih>.ndjson production --replace
set -eu

PROJECT="${SANITY_PROJECT_ID:-bl5w7h11}"
DATASET="${SANITY_DATASET:-production}"
DIR="${BACKUP_DIR:-/opt/conforcus-web/backups/sanity}"
STAMP=$(date -u +%Y%m%d-%H%M%S)
OUT="$DIR/sanity-$DATASET-$STAMP.ndjson"

mkdir -p "$DIR/assets"
curl -fsS -m 300 "https://$PROJECT.api.sanity.io/v2024-01-01/data/export/$DATASET" -o "$OUT.part"

LINES=$(wc -l < "$OUT.part" | tr -d ' ')
if [ "$LINES" -lt 100 ] || ! head -c 1 "$OUT.part" | grep -q '{'; then
  echo "sanity-backup: çıktı şüpheli ($LINES satır) — yedek alınmadı" >&2
  exit 1
fi
mv "$OUT.part" "$OUT"

# Varlıklar: adlar içerik özetinden türediği için bir dosya bir kez indirilir.
NEW=0
for URL in $(grep -o '"url":"https://cdn\.sanity\.io/[^"]*"' "$OUT" | cut -d'"' -f4 | sort -u); do
  F="$DIR/assets/$(basename "$URL")"
  if [ ! -s "$F" ]; then
    curl -fsS -m 120 "$URL" -o "$F.part" && mv "$F.part" "$F" && NEW=$((NEW + 1))
  fi
done

gzip -9 "$OUT"
echo "sanity-backup: $OUT.gz ($LINES belge satırı, $NEW yeni varlık, toplam $(ls "$DIR/assets" | wc -l | tr -d ' ') varlık)"
