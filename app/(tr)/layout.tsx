import type { Metadata } from "next";
import { inter, sora } from "@/lib/fonts";
import "../globals.css";
import Shell from "@/components/Shell";
import { ROUTES, SITE_URL } from "@/lib/i18n";

// TR kök layout (varsayılan dil, kök yollar). <html lang="tr">
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: ROUTES.home.title.tr, template: "%s" },
  description: ROUTES.home.desc.tr,
  openGraph: { type: "website", siteName: "Conforcus", locale: "tr_TR" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function TrRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${sora.variable} ${inter.variable}`}>
      <body>
        <Shell locale="tr">{children}</Shell>
      </body>
    </html>
  );
}
