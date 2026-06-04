import jsonPlugin, { type JSONLanguageOptions } from '@eslint/json';
import mdPlugin, { type MarkdownLanguageOptions } from '@eslint/markdown';
import stylisticPlugin from '@stylistic/eslint-plugin';
import type { Linter } from 'eslint';
import * as mdxPlugin from 'eslint-plugin-mdx';
import { globalIgnores } from 'eslint/config';
import tsPlugin, { type ConfigWithExtends } from 'typescript-eslint';

type tsLanguageOptions = ConfigWithExtends['languageOptions'];

const jsonConfig = jsonPlugin.configs.recommended;

const mdConfig = mdPlugin.configs.recommended;

const mdxConfig = mdxPlugin.configs.flat;

const stylisticConfig = stylisticPlugin.configs.customize({
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

const eslintConfig: Linter.Config[] = [
  globalIgnores([
    '**',
    '!packages/**/',
    '!**/*.{code-workspace,js,json,jsx,md,mdx,ts,tsx}',
    '**/{coverage,node_modules}/**',
    '**/*.d.ts',
  ]),
  {
    ...stylisticConfig,
    files: [
      '**/*.{js,jsx}',
    ],
  },
  {
    ...jsonConfig,
    files: [
      '**/*.json',
    ],
    language: 'json/json',
  },
  {
    ...jsonConfig,
    files: [
      '**/*.code-workspace',
      '**/tsconfig*.json',
    ],
    language: 'json/jsonc',
    languageOptions: {
      allowTrailingCommas: true,
    } satisfies JSONLanguageOptions,
  },
  ...mdConfig,
  {
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
    ...mdxConfig,
    files: [
      '**/*.{md,mdx}',
    ],
    processor: mdxPlugin.createRemarkProcessor({
      lintCodeBlocks: true,
    }),
  },
  {
    ...stylisticConfig,
    files: [
      '**/*.{ts,tsx}',
    ],
    languageOptions: {
      parser: tsPlugin.parser,
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
  {
    files: [
      /** See `configs.flatCodeBlocks` in `eslint-plugin-mdx`. */
      '**/*.{md,mdx}/**/*',
    ],
    rules: {
      /** Allow empty code blocks. */
      '@stylistic/no-multiple-empty-lines': 'off',
    },
  },
  {
    files: [
      /** See `configs.flatCodeBlocks` in `eslint-plugin-mdx`. */
      '**/*.{md,mdx}/**/*.{ts,tsx}',
    ],
    languageOptions: {
      parser: tsPlugin.parser,
      parserOptions: {
        projectService: false,
      },
    } satisfies tsLanguageOptions,
  },
];

export {
  eslintConfig as default,
};
