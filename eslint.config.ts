import jsonPlugin, {
  type JSONLanguageOptions as JsonLanguageOptions,
} from '@eslint/json';
import markdownPlugin, {
  type MarkdownLanguageOptions,
  type MarkdownRuleDefinition,
} from '@eslint/markdown';
import stylisticPlugin from '@stylistic/eslint-plugin';
import type { Linter } from 'eslint';
import * as mdxPlugin from 'eslint-plugin-mdx';
import { defineConfig, globalIgnores } from 'eslint/config';
import typescriptPlugin, {
  type ConfigWithExtends as TypescriptConfig,
} from 'typescript-eslint';

type JsonLanguage = 'json/json' | 'json/jsonc';
type MarkdownLanguage = 'markdown/commonmark' | 'markdown/gfm';
type MarkdownRawRules = typeof markdownPlugin.rules;
type MarkdownRules = {
  readonly [K in keyof MarkdownRawRules as `markdown/${K}`]?:
    Linter.RuleSeverity | [
      Linter.RuleSeverity,
      MarkdownRawRules[K] extends MarkdownRuleDefinition<{
        RuleOptions: [infer First, ...unknown[]];
      }> ? First : never,
    ];
};
type TypescriptLanguageOptions = TypescriptConfig['languageOptions'];

const stylisticConfig: Linter.Config = stylisticPlugin.configs.customize({
  arrowParens: true,
  blockSpacing: true,
  braceStyle: '1tbs',
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
    '!**/*.{code-workspace,js,json,jsx,md,mdx,ts,tsx}',
    '**/{coverage,node_modules}/**',
    '**/*.d.ts',
  ]),
  {
    extends: [
      stylisticConfig,
    ],
    files: [
      '**/*.{js,jsx}',
    ],
  },
  {
    extends: [
      jsonPlugin.configs.recommended,
    ],
    files: [
      '**/*.json',
    ],
    ignores: [
      '**/tsconfig*.json',
    ],
    language: 'json/json' satisfies JsonLanguage,
  },
  {
    extends: [
      jsonPlugin.configs.recommended,
    ],
    files: [
      '**/*.code-workspace',
      '**/tsconfig*.json',
    ],
    language: 'json/jsonc' satisfies JsonLanguage,
    languageOptions: {
      allowTrailingCommas: false,
    } satisfies JsonLanguageOptions,
  },
  {
    extends: [
      /** Can't lint inside and outside code blocks simultaneously. */
      /** See <https://github.com/eslint/markdown/issues/276>. */
      /** Use `eslint-plugin-mdx` for code blocks in both Markdown and MDX. */
      markdownPlugin.configs.recommended,
    ],
    files: [
      '**/*.md',
    ],
    language: 'markdown/gfm' satisfies MarkdownLanguage,
    languageOptions: {
      frontmatter: false,
      math: true,
    } satisfies MarkdownLanguageOptions,
    /** See <https://github.com/eslint/markdown#rules>. */
    rules: {
      /** Non-recommended. */
      'markdown/fenced-code-meta': 'off',
      'markdown/no-bare-urls': 'error',
      'markdown/no-duplicate-headings': ['error', { checkSiblingsOnly: true }],
      'markdown/no-html': ['error', { allowed: [
        'i',
      ] }],
      /** Recommended. */
      'markdown/fenced-code-language': ['error', { required: [
        'typescript',
      ] }],
      'markdown/heading-increment': ['error', { frontmatterTitle: '' }],
      'markdown/no-missing-atx-heading-space': ['error', {
        checkClosedHeadings: true,
      }],
      'markdown/no-missing-label-refs': ['warn', { allowLabels: [] }],
      'markdown/no-missing-link-fragments': ['error', { ignoreCase: false }],
      'markdown/no-multiple-h1': ['error', { frontmatterTitle: '' }],
      'markdown/no-space-in-emphasis': ['error', { checkStrikethrough: true }],
      'markdown/table-column-count': ['error', { checkMissingCells: true }],
    } satisfies MarkdownRules,
  },
  {
    extends: [
      mdxPlugin.configs.flat,
    ],
    files: [
      '**/*.mdx',
    ],
    processor: mdxPlugin.createRemarkProcessor({
      lintCodeBlocks: true,
    }),
  },
  {
    extends: [
      typescriptPlugin.configs.strictTypeChecked,
      typescriptPlugin.configs.stylisticTypeChecked,
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
    } satisfies TypescriptLanguageOptions,
  },
  {
    extends: [
      typescriptPlugin.configs.strict,
      typescriptPlugin.configs.stylistic,
      stylisticConfig,
    ],
    files: [
      '**/*.{md,mdx}/**/*.{ts,tsx}',
    ],
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
    extends: [
      mdxPlugin.configs.flatCodeBlocks,
    ],
    files: [
      '**/*.{md,mdx}/**',
    ],
    rules: {
      /** Allow empty code blocks. */
      '@stylistic/no-multiple-empty-lines': 'off',
    },
  },
]);

export {
  eslintConfig as default,
};
