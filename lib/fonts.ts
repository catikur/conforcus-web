import { Inter, Sora } from "next/font/google";

// Prototip Google Fonts — next/font ile self-host. latin-ext = Türkçe glifler.
export const sora = Sora({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
