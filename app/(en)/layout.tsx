import type { Metadata } from "next";
import { inter, sora } from "@/lib/fonts";
import "../globals.css";
import Shell from "@/components/Shell";
import { ROUTES, SITE_URL } from "@/lib/i18n";
import { verificationMeta } from "@/lib/analytics";

// EN kök layout (/en/...). <html lang="en">
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: ROUTES.home.title.en, template: "%s" },
  description: ROUTES.home.desc.en,
  openGraph: { type: "website", siteName: "Conforcus", locale: "en_US" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  verification: verificationMeta(),
};

export default function EnRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body>
        <Shell locale="en">{children}</Shell>
      </body>
    </html>
  );
}
