import js from "@eslint/js"
import globals from "globals"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import { default as tseslint } from "typescript-eslint"
import importPlugin from "eslint-plugin-import"
import tailwindPlugin from "eslint-plugin-tailwindcss"

const fileNamingPlugin = {
  rules: {
    "file-naming": {
      meta: {
        type: "suggestion",
        docs: {
          description: "Enforce kebab-case file naming conventions"
        }
      },
      create(context) {
        return {
          Program(node) {
            const filename = context.getFilename()
            if (filename === "<input>") return

            if (filename.endsWith("vite-env.d.ts")) return
            if (filename.endsWith("main.tsx")) return
            if (filename.endsWith("index.tsx")) return
            if (filename.endsWith(".config.ts")) return
            if (filename.endsWith(".d.ts")) return

            if (filename.includes("/assets/")) return
            if (filename.includes("/routes/")) return
            if (filename.includes("/__tests__/")) return

            const isTsFile = filename.endsWith(".ts")
            const isTsxFile = filename.endsWith(".tsx")
            const basename = filename.split("/").pop().split(".").slice(0, -1).join(".")

            const isKebabCase = (str) => /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(str)

            if ((isTsFile || isTsxFile) && !basename.split(".").every(isKebabCase)) {
              context.report({
                node,
                message: "Files must use kebab-case naming (example: user-profile.service.ts, user-list.component.tsx)"
              })
            }
          }
        }
      }
    }
  }
}

export default tseslint.config(
  {
    files: ["**/*.config.{ts,mts,cts}"],
    languageOptions: {
      parserOptions: {
        project: null
      }
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-var-requires": "off"
    }
  },
  {
    ignores: [
      "**/dist/**",
      "**/build/**",
      "**/node_modules/**",
      "**/coverage/**",
      "**/.next/**"
    ]
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest
      },
      parser: tseslint.parser,
      parserOptions: {
        project: ["./packages/*/tsconfig.json", "./apps/*/tsconfig.json"],
        tsconfigRootDir: "."
      }
    },
    settings: {
      react: {
        version: "18.3"
      }
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
      tailwindcss: tailwindPlugin,
      custom: fileNamingPlugin
    },
    rules: {
      // Base ESLint rules
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "double"],
      "semi": ["error", "never"],
      "comma-dangle": ["error", "never"],
      "eol-last": ["error", "always"],
      "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-unused-vars": "off", // Using TypeScript's checker instead
      "prefer-const": "error",
      "arrow-body-style": ["error", "as-needed"],
      "curly": ["error", "all"],
      "brace-style": ["error", "1tbs", { allowSingleLine: false }],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "space-in-parens": ["error", "never"],
      "space-before-blocks": "error",
      "function-paren-newline": ["error", "multiline"],
      "object-curly-newline": ["error", { multiline: true, consistent: true }],
      "array-bracket-newline": ["error", { multiline: true }],
      "operator-linebreak": ["error", "before"],

      // Spacing and organization
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
        { blankLine: "always", prev: "function", next: "*" },
        { blankLine: "always", prev: "*", next: "function" },
        { blankLine: "always", prev: "*", next: "export" },
        { blankLine: "always", prev: "export", next: "*" },
        { blankLine: "always", prev: "import", next: "*" },
        { blankLine: "never", prev: "import", next: "import" }
      ],

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }],
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
          allowFunctionsWithoutTypeParameters: true
        }
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports"
        }
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/ban-ts-comment": "error",

      // React rules
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function"
        }
      ],
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-closing-bracket-location": ["error", "line-aligned"],
      "react/jsx-curly-spacing": ["error", "never"],
      "react/jsx-equals-spacing": ["error", "never"],
      "react/jsx-first-prop-new-line": ["error", "multiline"],
      "react/jsx-fragments": ["error", "syntax"],
      "react/jsx-max-props-per-line": ["error", { maximum: 1, when: "multiline" }],
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/jsx-one-expression-per-line": ["error", { allow: "single-child" }],
      "react/jsx-pascal-case": "error",
      "react/jsx-sort-props": ["error", {
        callbacksLast: true,
        shorthandFirst: true,
        reservedFirst: true
      }],
      "react/no-unused-prop-types": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      // Import rules
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling"], "index", "type"],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before"
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "after"
            }
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ],
      "import/no-duplicates": "error",
      "import/no-unresolved": "off", // TypeScript handles this

      // Tailwind rules
      "tailwindcss/classnames-order": "error",
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/no-contradicting-classname": "error",

      // Custom rules
      "custom/file-naming": "error"
    }
  }
)
