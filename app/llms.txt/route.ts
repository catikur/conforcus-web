import { buildLlmsIndex, getLlmsData } from "@/lib/llms";

// İçerik Sanity'den kurulur; saatte bir ve Sanity webhook'u ile tazelenir.
export const revalidate = 3600;

export async function GET() {
  return new Response(buildLlmsIndex(await getLlmsData()), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
