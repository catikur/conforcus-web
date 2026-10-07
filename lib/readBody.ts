// İstek gövdesini en çok `limit` bayt okur. Bildirilen (Content-Length) ya da okunan boyut sınırı
// aşarsa akışı keser ve null döner; büyük ya da parça parça gönderilen gövdeler belleğe alınmaz.
export async function readBodyCapped(req: Request, limit: number): Promise<string | null> {
  if (Number(req.headers.get("content-length")) > limit) return null;
  if (!req.body) return "";
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString("utf8");
}
