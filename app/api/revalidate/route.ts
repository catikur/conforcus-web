import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { ROUTES } from "@/lib/i18n";
import { SECTOR_SLUGS } from "@/lib/sectorSlugs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Sanity publish webhook'u: secret doğrula, ilgili yolları revalidate et.
// Webhook URL: https://conforcus.com/api/revalidate?secret=XXX
// Webhook projection (önerilen): { "_type": _type, "slug": slug.current }
const SECRET = process.env.REVALIDATE_SECRET;

// Sanity içeriğini listeleyen/alıntılayan sabit sayfalar.
const SECTOR_PATHS = ["/sektorler", "/en/industries", ...SECTOR_SLUGS.flatMap((s) => [`/sektorler/${s.tr}`, `/en/industries/${s.en}`])];
const SERVICE_PATHS = (["hizmet-sap-ams", "hizmet-s4hana", "hizmet-rollout", "hizmet-urun"] as const).flatMap((k) => [ROUTES[k].tr, ROUTES[k].en]);
const LLMS_PATHS = ["/llms.txt", "/llms-full.txt", "/llms-full-tr.txt"];

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
      // llms-full belgeleri blog listesini de içerir; saatlik önbelleği beklemeden tazelensin.
      add("/blog", "/en/blog", ...LLMS_PATHS);
      if (slug) add(`/blog/${slug}`, `/en/blog/${slug}`);
      break;
    case "clientReference":
      add("/", "/en", "/referanslar", "/en/references", "/hakkimizda", "/en/about", ...SECTOR_PATHS, ...SERVICE_PATHS, ...LLMS_PATHS);
      if (slug) add(`/referanslar/${slug}`, `/en/references/${slug}`);
      break;
    case "solution":
      add("/", "/en", "/cozumler", "/en/solutions", "/e-cozumler", "/en/e-solutions", "/uzmanlik", "/en/expertise", ...SECTOR_PATHS, ...LLMS_PATHS);
      if (slug) add(`/cozumler/${slug}`, `/en/solutions/${slug}`);
      break;
    case "teamMember":
      add("/ekip", "/en/team");
      break;
    case "testimonial":
      add("/", "/en", "/referanslar", "/en/references");
      break;
    case "jobPosting":
      add("/conforcus-way", "/en/conforcus-way");
      break;
    case "siteSettings":
      add("/", "/en", "/hakkimizda", "/en/about", "/confiq", "/en/confiq");
      break;
    default:
      // tip belirsizse geniş tut
      add(
        "/", "/en", "/blog", "/en/blog", "/referanslar", "/en/references", "/cozumler", "/en/solutions",
        "/e-cozumler", "/en/e-solutions", "/conforcus-way", "/en/conforcus-way", "/ekip", "/en/team",
        "/hakkimizda", "/en/about", "/uzmanlik", "/en/expertise", ...SECTOR_PATHS, ...SERVICE_PATHS, ...LLMS_PATHS
      );
  }
  add("/sitemap.xml");

  const list = [...paths];
  list.forEach((p) => revalidatePath(p));
  return NextResponse.json({ ok: true, type: type || null, revalidated: list, now: Date.now() });
}
