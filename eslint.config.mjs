import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [".next/**", "shrimp_data/**", ".claude/**"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // unused-imports가 처리하도록 기본 규칙 비활성화
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      // import 정렬: React/Next → 외부 → @/ → 상대경로 → CSS
      "simple-import-sort/imports": [
        "error",
        {
          groups: [["^react", "^next"], ["^@?\\w"], ["^@/"], ["^\\."], ["^.+\\.css$"]],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
  // eslint-config-prettier는 반드시 마지막에 위치
  ...compat.extends("prettier"),
];

export default eslintConfig;
