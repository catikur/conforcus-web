# conforcus-web — Next.js 14 (App Router) standalone üretim imajı
# CLAUDE.md kararı: Node 20-alpine, output: 'standalone'.

# ---- 1) Bağımlılıklar ----
FROM node:20-alpine AS deps
WORKDIR /app
# libc uyumluluğu (sharp/next image vb. için güvenli)
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

# ---- 2) Derleme ----
FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
# Sanity build-time env — derleme sırasında da gerçek içerik üretilsin (SSG ilk hali);
# runtime'da compose environment ile birlikte ISR tazeler.
ARG SANITY_PROJECT_ID=""
ARG SANITY_DATASET="production"
ARG SANITY_API_VERSION="2024-01-01"
ENV SANITY_PROJECT_ID=$SANITY_PROJECT_ID \
    SANITY_DATASET=$SANITY_DATASET \
    SANITY_API_VERSION=$SANITY_API_VERSION
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- 3) Çalıştırma ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Root olmayan kullanıcı
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Standalone çıktı: server.js + izlenen node_modules + public + static
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
