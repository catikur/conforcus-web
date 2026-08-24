import { notFound } from "next/navigation";

// Eşleşmeyen /en/* adreslerini yakalar → (en)/not-found.tsx (İngilizce 404).
export default function CatchAll() {
  notFound();
}
