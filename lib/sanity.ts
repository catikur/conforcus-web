import "server-only";
import { createClient } from "next-sanity";

// CLAUDE.md docker env: SANITY_PROJECT_ID, SANITY_DATASET=production.
export const projectId = process.env.SANITY_PROJECT_ID || "";
export const dataset = process.env.SANITY_DATASET || "production";
export const apiVersion = process.env.SANITY_API_VERSION || "2024-01-01";

// Sanity henüz yapılandırılmadıysa blog örnek yazılara düşer (site çalışmaya devam eder).
export const sanityConfigured = Boolean(projectId);

export const sanityClient = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // yayın içeriği; webhook revalidate ile tazelik sağlanır
      perspective: "published",
    })
  : null;
