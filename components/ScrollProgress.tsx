"use client";

import { useEffect } from "react";

// Üstte kayan ilerleme çubuğu (#sprog) + kaydırınca nav gölgesi (.nav.scrolled).
// Prototip v6 davranışı (satır 1265-1270) birebir.
export default function ScrollProgress() {
  useEffect(() => {
    const sp = document.createElement("div");
    sp.id = "sprog";
    document.body.appendChild(sp);
    const nav = document.querySelector(".nav");
    const onScroll = () => {
      const h = document.documentElement;
      sp.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100 + "%";
      nav?.classList.toggle("scrolled", h.scrollTop > 8);
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      removeEventListener("scroll", onScroll);
      sp.remove();
    };
  }, []);
  return null;
}
