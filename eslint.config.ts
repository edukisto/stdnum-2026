import jsonPlugin, { type JSONLanguageOptions } from '@eslint/json';
import mdPlugin, { type MarkdownLanguageOptions } from '@eslint/markdown';
import stylisticPlugin from '@stylistic/eslint-plugin';
import type { Linter } from 'eslint';
import * as mdxPlugin from 'eslint-plugin-mdx';
import { defineConfig, globalIgnores } from 'eslint/config';
import tsPlugin, { type ConfigWithExtends } from 'typescript-eslint';

type tsLanguageOptions = ConfigWithExtends['languageOptions'];

const stylisticConfig: Linter.Config = stylisticPlugin.configs.customize({
  arrowParens: true,
  blockSpacing: true,
  braceStyle: 'stroustrup',
  commaDangle: 'always-multiline',
  indent: 2,
  jsx: true,
  quoteProps: 'as-needed',
  quotes: 'single',
  semi: true,
  severity: 'error',
});

const eslintConfig: Linter.Config[] = defineConfig([
  globalIgnores([
    '**',
    '!packages/**/',
    '!**/*.{code-workspace,json,md,mdx,ts,tsx}',
    '**/{coverage,node_modules}/**',
    '**/*.d.ts',
  ]),
  {
    extends: [
      jsonPlugin.configs.recommended,
    ],
    files: [
      '**/*.json',
    ],
    language: 'json/json',
  },
  {
    extends: [
      jsonPlugin.configs.recommended,
    ],
    files: [
      '**/*.code-workspace',
      '**/tsconfig*.json',
    ],
    language: 'json/jsonc',
    languageOptions: {
      allowTrailingCommas: true,
    } satisfies JSONLanguageOptions,
  },
  {
    extends: [
      mdPlugin.configs.recommended,
    ],
    files: [
      '**/*.md',
    ],
    language: 'markdown/gfm',
    languageOptions: {
      frontmatter: false,
      math: true,
    } satisfies MarkdownLanguageOptions,
    rules: {
      'markdown/no-bare-urls': 'error',
      'markdown/no-missing-label-refs': 'warn',
    },
  },
  {
    extends: [
      mdxPlugin.configs.flat,
    ],
    files: [
      '**/*.{md,mdx}',
    ],
    processor: mdxPlugin.createRemarkProcessor({
      lintCodeBlocks: true,
    }),
  },
  {
    extends: [
      tsPlugin.configs.strict,
      tsPlugin.configs.stylistic,
      stylisticConfig,
    ],
    files: [
      /** See `configs.flatCodeBlocks` in `eslint-plugin-mdx`. */
      '**/*.{md,mdx}/**/*.{ts,tsx}',
    ],
    rules: {
      /** Allow empty code blocks. */
      '@stylistic/no-multiple-empty-lines': 'off',
    },
  },
  {
    extends: [
      tsPlugin.configs.strictTypeChecked,
      tsPlugin.configs.stylisticTypeChecked,
      stylisticConfig,
    ],
    files: [
      '**/*.{ts,tsx}',
    ],
    ignores: [
      '**/*.{md,mdx}/**/*.{ts,tsx}',
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    } satisfies tsLanguageOptions,
  },

  /** Overrides. */
  {
    files: [
      '**/package-lock.json',
    ],
    rules: {
      'json/no-empty-keys': 'off',
    },
  },
]);

export {
  eslintConfig as default,
};
