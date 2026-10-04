import { buildLlmsFull, getLlmsData } from "@/lib/llms";

// Sitenin tam içeriği, tek belgede (Türkçe). İngilizcesi: /llms-full.txt
export const revalidate = 3600;

export async function GET() {
  return new Response(buildLlmsFull(await getLlmsData(), "tr"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
