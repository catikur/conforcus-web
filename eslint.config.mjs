import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

// Next 16'da `next lint` kaldırıldı; ESLint doğrudan çalışır (npm run lint).
export default defineConfig([
  ...nextVitals,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "jsx-a11y/anchor-is-valid": "off",
      "@next/next/no-img-element": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "studio/**", "node_modules/**"]),
]);
