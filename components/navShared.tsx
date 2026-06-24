import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { pathFor, type Locale } from "@/lib/i18n";
import type { MegaLink } from "@/lib/nav";

// Bir mega/mobil bağlantının locale'e göre çözülmüş URL'si.
export function linkHref(l: MegaLink, locale: Locale): string {
  if (l.href) return l.href;
  return pathFor(l.key!, locale) + (l.query ?? "");
}

// mailto/http/tel için <a>, iç rotalar için next/link.
export function MLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
}) {
  const external = /^(mailto:|https?:|tel:)/.test(href);
  if (external) {
    return (
      <a className={className} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link className={className} href={href} onClick={onClick}>
      {children}
    </Link>
  );
}
