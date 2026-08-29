import { sanityClient, sanityConfigured } from "./sanity";
import { TEAM_QUERY } from "./sanity.queries";
import type { Locale } from "./i18n";

/* Ekip kadrosu — tamamen Sanity'den yönetilir (teamMember dokümanı).
   Kayıt yoksa liste boş döner ve /ekip sayfası "yakında" durumunu gösterir;
   sahte kişi üretilmez. Fotoğrafı olmayan üye baş harf avatarıyla görünür. */

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  expertise: string[];
  photoUrl?: string;
  photoAlt?: string;
  linkedin?: string;
  email?: string;
  featured: boolean;
};

type Raw = {
  _id: string;
  name: string;
  role_tr?: string;
  role_en?: string;
  bio_tr?: string;
  bio_en?: string;
  expertise?: string[];
  photoUrl?: string;
  photoAlt?: string;
  linkedin?: string;
  email?: string;
  featured?: boolean;
};

const loc = (l: Locale, tr?: string, en?: string) => (l === "tr" ? tr : en) || tr || en || "";

export async function getTeam(l: Locale): Promise<TeamMember[]> {
  if (!sanityConfigured || !sanityClient) return [];
  try {
    const d: Raw[] = await sanityClient.fetch(TEAM_QUERY);
    return (d || []).map((m) => ({
      id: m._id,
      name: m.name,
      role: loc(l, m.role_tr, m.role_en),
      bio: loc(l, m.bio_tr, m.bio_en) || undefined,
      expertise: m.expertise || [],
      photoUrl: m.photoUrl,
      photoAlt: m.photoAlt,
      linkedin: m.linkedin,
      email: m.email,
      featured: !!m.featured,
    }));
  } catch {
    return [];
  }
}

// Ad Soyad → "AK" (fotoğraf yokken kullanılan avatar).
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toLocaleUpperCase("tr-TR") || "")
    .join("");
}
