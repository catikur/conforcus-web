"use client";

import Link from "next/link";
import { useState, type ComponentProps } from "react";

// Görünür olunca değil, niyet belli olunca (fare üstünde, odak, dokunma) ön yükleyen bağlantı.
// Hedef sayfanın RSC verisi, parçaları ve kapak görseli ilk yüklemeyle yarışmasın diye.
export default function IntentLink(props: ComponentProps<typeof Link>) {
  const [armed, setArmed] = useState(false);
  const arm = () => setArmed(true);
  return <Link {...props} prefetch={armed ? null : false} onMouseEnter={arm} onFocus={arm} onTouchStart={arm} />;
}
