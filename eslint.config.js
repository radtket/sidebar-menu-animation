import globals from "globals";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";
import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...compat.extends("airbnb", "airbnb/hooks", "prettier"),
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...prettier.configs.recommended.rules,
      quotes: [
        "error",
        "double",
        {
          avoidEscape: true,
        },
      ],

      "comma-dangle": 0,
      "react/jsx-filename-extension": 0,
      "react/jsx-sort-props": 1,
      "react/jsx-props-no-spreading": 0,
      "react/no-unescaped-entities": 0,
      "react/jsx-uses-react": 1,
      "react/react-in-jsx-scope": 0,
      "react/require-default-props": [
        2,
        {
          functions: "defaultArguments",
        },
      ],

      "no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],

      "no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: false,
          argsIgnorePattern: "^_",
        },
      ],

      "prettier/prettier": [
        "error",
        {
          trailingComma: "es5",
          printWidth: 80,
          jsxBracketSameLine: false,
          "number-leading-zero": null,
          arrowParens: "avoid",
          singleQuote: false,
        },
      ],

      // 'react/jsx-filename-extension': ['error', { extensions: ['.jsx'] }],
      // 'react/jsx-uses-react': 'off',
      // 'react/react-in-jsx-scope': 'off',
      // 'react-hooks/rules-of-hooks': 'error',
      // 'react-hooks/exhaustive-deps': 'warn',
      // 'react-refresh/no-scope': 'error',
      // 'react-refresh/no-self-refresh': 'error',
    },
  },
  // js.configs.recommended,
  // react.configs.flat.recommended,
];
