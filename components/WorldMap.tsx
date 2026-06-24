"use client";

import { useEffect, useRef } from "react";
import { COUNTRY_INFO, COUNTRY_NAMES_EN, DEFAULT_INFO, MAP_ANCHOR, MAP_REGIONS } from "@/lib/data";
import { WORLDMAP_SVG } from "@/lib/worldmap";
import type { Locale } from "@/lib/i18n";

const MAP_NS = "http://www.w3.org/2000/svg";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
type MapRefInternal = { name: string; slug: string; logoUrl?: string };

// Çok parçalı ülke çizimlerinde en büyük parçanın merkezi.
function mainCenter(svg: SVGSVGElement, t: SVGGraphicsElement): [number, number] {
  if (t.tagName === "circle") {
    return [+t.getAttribute("cx")!, +t.getAttribute("cy")!];
  }
  const d = t.getAttribute("d") || "";
  const subs = d.match(/M[^M]+/g) || [d];
  if (subs.length === 1) {
    const b = t.getBBox();
    return [b.x + b.width / 2, b.y + b.height / 2];
  }
  const tmp = document.createElementNS(MAP_NS, "path");
  svg.appendChild(tmp);
  let best: DOMRect | null = null;
  let bestA = -1;
  subs.forEach((sd) => {
    tmp.setAttribute("d", sd);
    const b = tmp.getBBox();
    const a = b.width * b.height;
    if (a > bestA) {
      bestA = a;
      best = b;
    }
  });
  tmp.remove();
  const r = best as unknown as DOMRect;
  return [r.x + r.width / 2, r.y + r.height / 2];
}

function setupMap(slot: HTMLElement, locale: Locale, refsByCountry: Record<string, MapRefInternal[]>, refsBase: string) {
  const svg = slot.querySelector("svg") as SVGSVGElement | null;
  if (!svg) return;
  const isTr = locale === "tr";
  // Görüntüleme adı: EN'de İngilizce, eşleştirme anahtarı (n) Türkçe kalır.
  const name = (n: string) => (isTr ? n : COUNTRY_NAMES_EN[n] || n);

  // sabit bilgi paneli
  const info = document.createElement("div");
  info.className = "minfo";
  const idleHTML =
    '<div class="mi-eyebrow">' +
    (isTr ? "Global Deneyim" : "Global Experience") +
    "</div>" +
    '<span class="mi-sub">' +
    (isTr ? "Bir ülkenin üzerine gelin" : "Hover over a country") +
    "</span>";
  info.innerHTML = idleHTML;
  slot.appendChild(info);

  // sol alt ülke listesi (ülke adları her iki dilde de Türkçe — prototip)
  const list = document.createElement("div");
  list.className = "clist";
  list.innerHTML = MAP_REGIONS.map(
    (g) =>
      '<div class="grp"><span class="glabel">' +
      (isTr ? g[0].tr : g[0].en) +
      "</span>" +
      g[1].map((n) => '<span class="cn" data-n="' + n + '">' + name(n) + "</span>").join('<span class="sepc">,</span><wbr>') +
      "</div>"
  ).join("");
  slot.appendChild(list);

  const els: Record<string, SVGGraphicsElement> = {};
  svg.querySelectorAll<SVGGraphicsElement>(".sel, .sel-dot").forEach((e) => {
    const n = (e as unknown as HTMLElement).dataset?.n;
    if (n) els[n] = e;
  });
  const spans: Record<string, HTMLElement> = {};
  list.querySelectorAll<HTMLElement>(".cn").forEach((s) => {
    if (s.dataset.n) spans[s.dataset.n] = s;
  });

  let hqC: [number, number] | null = null;
  const cCache: Record<string, [number, number]> = {};
  function hqCenter(): [number, number] {
    if (!hqC) {
      const b = (svg!.querySelector(".tr-hq") as SVGGraphicsElement).getBBox();
      hqC = [b.x + b.width / 2, b.y + b.height / 2];
    }
    return hqC;
  }
  function center(t: SVGGraphicsElement): [number, number] {
    const n = (t as unknown as HTMLElement).dataset.n!;
    if (!cCache[n]) cCache[n] = MAP_ANCHOR[n] || mainCenter(svg!, t);
    return cCache[n];
  }

  let lineG: SVGGElement | null = null;
  function clearLine() {
    if (lineG) {
      lineG.remove();
      lineG = null;
    }
  }
  function drawLine(t: SVGGraphicsElement) {
    clearLine();
    const [hx, hy] = hqCenter();
    const [tx, ty] = center(t);
    const mx = (hx + tx) / 2;
    const my = Math.min(hy, ty) - Math.max(22, Math.abs(tx - hx) * 0.16);
    lineG = document.createElementNS(MAP_NS, "g");
    const p = document.createElementNS(MAP_NS, "path");
    p.setAttribute("d", "M" + hx + "," + hy + " Q" + mx + "," + my + " " + tx + "," + ty);
    p.setAttribute("class", "hline");
    lineG.appendChild(p);
    const c = document.createElementNS(MAP_NS, "circle");
    c.setAttribute("cx", String(tx));
    c.setAttribute("cy", String(ty));
    c.setAttribute("r", "2.6");
    c.setAttribute("class", "hdot");
    lineG.appendChild(c);
    svg!.appendChild(lineG);
    const L = p.getTotalLength();
    const dur = Math.min(0.8, Math.max(0.3, L / 700));
    p.style.strokeDasharray = String(L);
    p.style.strokeDashoffset = String(L);
    p.getBoundingClientRect();
    p.style.transition = "stroke-dashoffset " + dur + "s ease-out";
    p.style.strokeDashoffset = "0";
    c.style.animationDelay = dur * 0.85 + "s";
  }

  function setActive(n: string) {
    const t = els[n];
    if (!t) return;
    const inf = COUNTRY_INFO[n] || DEFAULT_INFO;
    const eyebrow = n === "Türkiye" ? (isTr ? "Merkez" : "Headquarters") : isTr ? "SAP Projesi" : "SAP Project";
    const refs = refsByCountry[n];
    const sub =
      refs && refs.length
        ? '<div class="mlogos">' +
          refs
            .map((r) => {
              const inner = r.logoUrl ? '<img src="' + esc(r.logoUrl) + '" alt="' + esc(r.name) + '">' : esc(r.name);
              return '<a class="mlogo" href="' + esc(refsBase + "/" + r.slug) + '">' + inner + "</a>";
            })
            .join("") +
          "</div>"
        : '<span class="mi-sub">' + (isTr ? inf.tr : inf.en) + "</span>";
    info.innerHTML = '<div class="mi-eyebrow">' + eyebrow + "</div>" + "<b>" + name(n) + "</b>" + sub;
    if (spans[n]) spans[n].classList.add("on");
    t.classList.add("hl");
    if (!t.classList.contains("tr-hq")) drawLine(t);
  }
  function clearActive(n: string) {
    info.innerHTML = idleHTML;
    if (spans[n]) spans[n].classList.remove("on");
    const t = els[n];
    if (t) t.classList.remove("hl");
    clearLine();
  }

  Object.keys(els).forEach((n) => {
    els[n].addEventListener("pointerenter", () => setActive(n));
    els[n].addEventListener("pointerleave", () => clearActive(n));
  });
  Object.keys(spans).forEach((n) => {
    spans[n].addEventListener("pointerenter", () => setActive(n));
    spans[n].addEventListener("pointerleave", () => clearActive(n));
  });
}

export type MapRef = { name: string; slug: string; logoUrl?: string };

export default function WorldMap({
  locale,
  className = "map-card map-slot",
  refsByCountry = {},
  refsBase = "/referanslar",
}: {
  locale: Locale;
  className?: string;
  refsByCountry?: Record<string, MapRef[]>;
  refsBase?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const slot = ref.current;
    if (!slot) return;
    slot.innerHTML = WORLDMAP_SVG;
    setupMap(slot, locale, refsByCountry, refsBase);
    return () => {
      slot.innerHTML = "";
    };
    // refsByCountry/refsBase sayfa başına sabittir; locale değişiminde yeniden kurulur.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);
  return <div className={className} ref={ref} />;
}
