import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Sanity publish webhook'u: secret doğrula, ilgili yolları revalidate et.
// Webhook URL: https://conforcus.com/api/revalidate?secret=XXX
// Webhook projection (önerilen): { "_type": _type, "slug": slug.current }
const SECRET = process.env.REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret") || req.headers.get("x-revalidate-secret");
  if (!SECRET || secret !== SECRET) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let type: string | undefined;
  let slug: string | undefined;
  try {
    const body = (await req.json()) as { _type?: string; slug?: { current?: string } | string };
    type = body?._type;
    slug = typeof body?.slug === "string" ? body.slug : body?.slug?.current;
  } catch {
    /* gövde olmayabilir */
  }

  const paths = new Set<string>();
  const add = (...ps: string[]) => ps.forEach((p) => paths.add(p));

  switch (type) {
    case "post":
      add("/blog", "/en/blog");
      if (slug) add(`/blog/${slug}`, `/en/blog/${slug}`);
      break;
    case "clientReference":
      add("/", "/en", "/referanslar", "/en/references");
      if (slug) add(`/referanslar/${slug}`, `/en/references/${slug}`);
      break;
    case "solution":
      add("/", "/en", "/cozumler", "/en/solutions");
      if (slug) add(`/cozumler/${slug}`, `/en/solutions/${slug}`);
      break;
    case "testimonial":
      add("/", "/en", "/referanslar", "/en/references");
      break;
    case "jobPosting":
      add("/conforcus-way", "/en/conforcus-way");
      break;
    case "siteSettings":
      add("/", "/en");
      break;
    default:
      // tip belirsizse geniş tut
      add("/", "/en", "/blog", "/en/blog", "/referanslar", "/en/references", "/cozumler", "/en/solutions", "/conforcus-way", "/en/conforcus-way");
  }

  const list = [...paths];
  list.forEach((p) => revalidatePath(p));
  return NextResponse.json({ ok: true, type: type || null, revalidated: list, now: Date.now() });
}
