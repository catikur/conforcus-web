import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "bl5w7h11",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  // İlk `sanity deploy` çalıştırmasında studio adresi sorulur (ör. conforcus → conforcus.sanity.studio).
});
