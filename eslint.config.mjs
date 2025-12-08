// eslint.config.mjs
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "app/generated/**",
      "prisma/**",
    ],
  },
  {
    files: [
      "app/components/BenefitsHighlight.tsx",
      "app/components/HowItWorks.tsx",
    ],
    rules: {
      "@next/next/no-img-element": "off", // disable only for these files
    },
  },
];
