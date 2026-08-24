"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

// Kaydırınca beliren öğeler (.rv) ve sayaç animasyonları (.stat b).
// SSR final sayıyı basar; JS varsa (hareket açıksa) 0'dan animasyonlar.
// IntersectionObserver kaçırırsa sayı 0'da kalmaz.
function statFmt(el: HTMLElement, v: number, locale: Locale): string {
  const tr = locale === "tr";
  const d = el.dataset;
  const pre = (tr ? (d.preTr ?? d.pre) : (d.preEn ?? "")) || "";
  const suf = (tr ? (d.sufTr ?? d.suf) : (d.sufEn ?? d.suf)) || "";
  return pre + v + suf;
}

function inView(el: HTMLElement): boolean {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight * 0.95;
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
    document.querySelectorAll<HTMLElement>("main.active .rv:not(.on)").forEach((el) => {
      if (inView(el)) el.classList.add("on");
      else io.observe(el);
    });

    const run = (el: HTMLElement) => {
      if (el.dataset.counted === "1") return;
      el.dataset.counted = "1";
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
    };

    const cio = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          cio.unobserve(e.target);
          run(e.target as HTMLElement);
        }),
      { threshold: 0.2 }
    );

    document.querySelectorAll<HTMLElement>("main.active .stat b[data-n], .stats .stat b[data-n]").forEach((el) => {
      if (reduce) {
        run(el);
        return;
      }
      if (inView(el)) run(el);
      else cio.observe(el);
    });

    return () => {
      io.disconnect();
      cio.disconnect();
    };
  }, [pathname, locale]);

  return null;
}
