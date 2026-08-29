/** @type {import('next').NextConfig} */
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://web.conforcus.com").replace(/\/+$/, "");
const WWW = SITE === "https://www.conforcus.com";

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Fotoğraflar eklendiğinde sayfa ağırlığını korumak için: modern format + ölçekleme.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" }, // Sanity görselleri
      { protocol: "https", hostname: "i.ytimg.com" }, // YouTube kapak görselleri
    ],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600],
    imageSizes: [64, 96, 128, 200, 320, 420],
  },
  async redirects() {
    /** Eski Hostinger HTML yolları — yalnızca bilinen dört adres. */
    const paths = [
      { source: "/indexen.html", destination: "/en", permanent: true },
      { source: "/ourservices.html", destination: "/en/services", permanent: true },
      { source: "/hakkimizda.html", destination: "/hakkimizda", permanent: true },
      { source: "/aboutus.html", destination: "/en/about", permanent: true },
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
