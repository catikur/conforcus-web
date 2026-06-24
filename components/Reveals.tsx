"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

// Kaydırınca beliren öğeler (.rv) ve sayaç animasyonları (.stat b).
// Her rota değişiminde yeni sayfa öğelerine yeniden bağlanır.
function statFmt(el: HTMLElement, v: number, locale: Locale): string {
  const tr = locale === "tr";
  const d = el.dataset;
  const pre = (tr ? (d.preTr ?? d.pre) : (d.preEn ?? "")) || "";
  const suf = (tr ? (d.sufTr ?? d.suf) : (d.sufEn ?? d.suf)) || "";
  return pre + v + suf;
}

export default function Reveals({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll<HTMLElement>("main.active .rv:not(.on)").forEach((el) => io.observe(el));

    const cio = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          cio.unobserve(e.target);
          const el = e.target as HTMLElement;
          const n = +(el.dataset.n || "0");
          if (reduce) {
            el.textContent = statFmt(el, n, locale);
            return;
          }
          const t0 = performance.now();
          const dur = 1200;
          const tick = (t: number) => {
            const p = Math.min((t - t0) / dur, 1);
            const v = Math.round(n * (1 - Math.pow(1 - p, 3)));
            el.textContent = statFmt(el, v, locale);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }),
      { threshold: 0.6 }
    );
    document.querySelectorAll<HTMLElement>("main.active .stat b").forEach((el) => cio.observe(el));

    return () => {
      io.disconnect();
      cio.disconnect();
    };
  }, [pathname, locale]);

  return null;
}
