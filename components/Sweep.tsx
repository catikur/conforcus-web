"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Sayfa geçişi süpürme perdesi (#sweep). Prototipte hashchange'de oynar;
// burada rota değişiminde oynatılır. prefers-reduced-motion'da devre dışı.
export default function Sweep() {
  const pathname = usePathname();
  const first = useRef(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const sw = ref.current;
    if (!sw || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    sw.style.transition = "transform .3s cubic-bezier(.7,0,.3,1)";
    sw.style.transform = "translateX(0)";
    const t1 = setTimeout(() => {
      sw.style.transform = "translateX(102%)";
      const t2 = setTimeout(() => {
        sw.style.transition = "none";
        sw.style.transform = "translateX(-102%)";
      }, 320);
      return () => clearTimeout(t2);
    }, 180);
    return () => clearTimeout(t1);
  }, [pathname]);

  return <div id="sweep" aria-hidden="true" ref={ref} />;
}
