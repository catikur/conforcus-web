/** @type {import('next').NextConfig} */
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://web.conforcus.com").replace(/\/+$/, "");
const WWW = SITE === "https://www.conforcus.com";

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  // Sunucu tarafı görsel optimizasyonu (/_next/image) KAPALI: uç nokta 404 döner.
  // Görseller Sanity CDN'de ölçeklenir (lib/img.ts). Neden: Next 14 hattında düzeltilmeyen
  // Image Optimization API açıkları (2026) ve VPS'te gereksiz CPU yükü.
  images: { unoptimized: true },
  async redirects() {
    /** Eski Hostinger statik sitesinin tüm adresleri (2026-10-04 taramasında bulunan sayfalar). */
    const paths = [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/indexen.html", destination: "/en", permanent: true },
      { source: "/hizmetlerimiz.html", destination: "/hizmetler", permanent: true },
      { source: "/ourservices.html", destination: "/en/services", permanent: true },
      { source: "/hakkimizda.html", destination: "/hakkimizda", permanent: true },
      { source: "/aboutus.html", destination: "/en/about", permanent: true },
      { source: "/referanslarimiz.html", destination: "/referanslar", permanent: true },
      { source: "/ourreferences.html", destination: "/en/references", permanent: true },
      { source: "/iletisim.html", destination: "/iletisim", permanent: true },
      { source: "/contact.html", destination: "/en/contact", permanent: true },
    ];
    // Apex / web. → www yalnızca production canonical www iken. Preview web. çalışmaya devam eder.
    if (WWW) {
      paths.push(
        {
          source: "/:path*",
          has: [{ type: "host", value: "conforcus.com" }],
          destination: "https://www.conforcus.com/:path*",
          permanent: true,
        },
        {
          source: "/:path*",
          has: [{ type: "host", value: "web.conforcus.com" }],
          destination: "https://www.conforcus.com/:path*",
          permanent: true,
        }
      );
    }
    return paths;
  },
};

export default nextConfig;
