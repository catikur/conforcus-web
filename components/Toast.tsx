"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/i18n";

// [data-toast="demo|confiq"] taşıyan herhangi bir bağlantı/düğmeye tıklanınca
// mesajı gösterir (olay devri). İçerik sunucuda statik kalır.
const MSGS: Record<string, { tr: string; en: string }> = {
  demo: {
    tr: "Prototip — bu aksiyon canlı sitede aktif olacak.",
    en: "Prototype — this action will be live on the production site.",
  },
  confiq: {
    tr: "confiq.ai ayrı ürün sitesi olarak yayına alınacak.",
    en: "confiq.ai will launch as the standalone product site.",
  },
};

export default function Toast({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-toast]");
      if (!el) return;
      e.preventDefault();
      const kind = el.dataset.toast || "demo";
      const tEl = ref.current;
      if (!tEl) return;
      tEl.textContent = (MSGS[kind] || MSGS.demo)[locale];
      tEl.style.opacity = "1";
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        tEl.style.opacity = "0";
      }, 2800);
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clearTimeout(timer.current);
    };
  }, [locale]);

  return <div id="toast" ref={ref} />;
}
