import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";

export default [
    // Ignore build output
    {
        ignores: ["dist/**", "node_modules/**"],
    },

    // Base JS rules
    js.configs.recommended,

    // TypeScript files
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: process.cwd(),
                sourceType: "module",
            },
            globals: {
                // Node.js globals
                console: "readonly",
                process: "readonly",
                Buffer: "readonly",
                // ES2021 globals
                Set: "readonly",
                Map: "readonly",
                Promise: "readonly",
                // Add more if needed
            },
        },
        plugins: {
            "@typescript-eslint": tseslint,
            import: importPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            "prettier/prettier": "warn",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    "args": "all",
                    "argsIgnorePattern": "^_",
                    "varsIgnorePattern": "^_",
                    "ignoreRestSiblings": true
                },
            ],

            "@typescript-eslint/no-explicit-any": "off",
            "import/order": [
                "warn",
                {
                    groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
                    "newlines-between": "always",
                    alphabetize: { order: "asc", caseInsensitive: true },
                },
            ],
            "no-console": "off",
            "no-undef": "off",
        },
    }
];
