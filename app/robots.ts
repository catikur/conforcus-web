import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* Arama ve yapay zekâ tarayıcıları açıkça davet edilir: Conforcus'un ChatGPT, Claude,
   Perplexity, Gemini ve Copilot yanıtlarında kaynak gösterilebilmesi için sayfaların
   bu tarayıcılara açık olması gerekir. Yalnızca /api/ kapalıdır.
   Not: test alan adında (web.conforcus.com) Caddy ayrıca X-Robots-Tag: noindex gönderir. */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "DuckAssistBot",
  "MistralAI-User",
  "meta-externalagent",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
