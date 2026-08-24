/** @type {import('next').NextConfig} */
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://web.conforcus.com").replace(/\/+$/, "");
const WWW = SITE === "https://www.conforcus.com";

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
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
