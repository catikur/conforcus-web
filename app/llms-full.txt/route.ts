import { buildLlmsFull, getLlmsData } from "@/lib/llms";

// Sitenin tam içeriği, tek belgede (İngilizce). Türkçesi: /llms-full-tr.txt
export const revalidate = 3600;

export async function GET() {
  return new Response(buildLlmsFull(await getLlmsData(), "en"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
