import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

// Conforcus blog — Sanity Studio.
// Kurulum:  cd studio && npm install
// Yayın:    npx sanity login && npx sanity deploy
export default defineConfig({
  name: "conforcus",
  title: "Conforcus Blog",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "bl5w7h11",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
