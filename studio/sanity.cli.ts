import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "bl5w7h11",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  // Dağıtım hedefi sabit: https://conforcus-website.sanity.studio
  // (appId olmadan `sanity deploy` her seferinde adres soruyor.)
  deployment: {
    appId: "ukfeobyxqj2lh3jj2eankmra",
  },
});
