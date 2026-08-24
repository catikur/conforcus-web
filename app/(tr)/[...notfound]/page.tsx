import { notFound } from "next/navigation";

// Eşleşmeyen TR adresleri yakalar → (tr)/not-found.tsx'i 404 durumuyla gösterir.
// Kök layout olmadığı için (iki dil, iki kök layout) global not-found kullanılamıyor;
// grup içindeki catch-all doğru çözüm.
export default function CatchAll() {
  notFound();
}
