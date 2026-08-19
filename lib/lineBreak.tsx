import type { ReactNode } from "react";

// Crawler'lar <br> öncesi boşluğu yutunca "ülkedeSAP" / "ofyour" / "across6" oluşuyor.
// Satır kırılsa da harfler yutulmasın diye her iki yanda gerçek boşluk bırakılır.
export function lineBreak(a: ReactNode, b: ReactNode) {
  return (
    <>
      {a} <br /> {b}
    </>
  );
}
