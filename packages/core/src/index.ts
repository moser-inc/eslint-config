/* eslint-disable import-x/no-named-as-default-member */
import process from 'node:process';
import jsEslintPlugin from '@eslint/js';
import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import {
  type DefaultConfigNamesMap,
  type FlatConfigComposer,
  type ResolvableFlatConfig,
  composer,
} from 'eslint-flat-config-utils';
import { configs as dependConfigs } from 'eslint-plugin-depend';
import importPlugin from 'eslint-plugin-import-x';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import unicornPlugin from 'eslint-plugin-unicorn';
import tsEslintPlugin from 'typescript-eslint';

export function defineFlatConfigs<
  const TConfig extends Linter.Config = Linter.Config,
  const TConfigNames extends string = keyof DefaultConfigNamesMap,
>(...configs: ResolvableFlatConfig<TConfig>[]) {
  return composer(...configs) as FlatConfigComposer<TConfig, TConfigNames>;
}

export interface MoserConfigOptions {
  /**
   * Path to the TypeScript configuration file. Enables type-aware linting when
   * defined. Most often will be set to `tsconfig.json` to use the base project
   * configuration.
   */
  tsconfigPath?: string;
}

export function globalConfigs() {
  return defineConfig([
    {
      name: 'moser/global/ignores',
      ignores: [
        '**/node_modules/',
        '**/build/',
        '**/dist/',
        '**/.output/',
        '**/.next/',
        '**/.nuxt/',
      ],
    },
  ]);
}

export function jsTsConfigs(options?: MoserConfigOptions): Linter.Config[] {
  const tsconfigPath = options?.tsconfigPath;
  const isTypeAware = !!tsconfigPath;

  return defineConfig([
    jsEslintPlugin.configs.recommended,
    tsEslintPlugin.configs.eslintRecommended,
    tsEslintPlugin.configs.recommended,
    {
      name: 'moser/js-ts/base',
      rules: {
        // JavaScript
        curly: ['error', 'multi-line', 'consistent'],
        eqeqeq: 'warn',
        'linebreak-style': ['error', 'unix'],
        'object-shorthand': ['error', 'always'],
        'sort-imports': ['warn', { ignoreDeclarationSort: true }],

        // TypeScript
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-import-type-side-effects': 'error',
      },
    },
    ...(isTypeAware
      ? ([
          {
            name: 'moser/js-ts/settings',
            languageOptions: {
              parserOptions: {
                projectService: {
                  allowDefaultProject: ['./*.js'],
                  defaultProject: tsconfigPath,
                },
                tsconfigRootDir: process.cwd(),
              },
            },
          },
          {
            name: 'moser/js-ts/type-aware',
            files: ['**/*.{ts,tsx,mts,cts,vue}'],
            rules: {
              '@typescript-eslint/consistent-type-imports': [
                'error',
                { fixStyle: 'inline-type-imports' },
              ],
            },
          },
        ] satisfies Parameters<typeof tsEslintPlugin.config>)
      : []),
    {
      name: 'moser/js-ts/overrides',
      files: ['**/*.{js,mjs,cjs,jsx}'],
      extends: [tsEslintPlugin.configs.disableTypeChecked],
    },
    {
      name: 'moser/js-ts/commonjs-overrides',
      files: ['**/*.{js,cjs,cts}'],
      rules: {
        'no-undef': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ]);
}

export function importConfigs(): Linter.Config[] {
  return defineConfig([
    importPlugin.flatConfigs.recommended as Linter.Config,
    importPlugin.flatConfigs.typescript as Linter.Config,
    {
      name: 'moser/import/overrides',
      files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,vue}'],
      rules: {
        'import-x/no-unresolved': ['error', { ignore: [String.raw`\?*$`] }],
        'import-x/order': [
          'warn',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
            ],
            alphabetize: { order: 'asc', caseInsensitive: false },
          },
        ],
      },
    },
    {
      ...dependConfigs['flat/recommended'],
      name: 'moser/import/depend',
    },
  ]);
}

export function unicornConfigs(): Linter.Config[] {
  return defineConfig([
    {
      name: 'moser/unicorn',
      plugins: {
        unicorn: unicornPlugin,
      },
      rules: {
        'unicorn/prefer-node-protocol': 'error',
      },
    },
  ]);
}

export function formattingConfigs(): Linter.Config[] {
  return defineConfig([
    {
      ...prettierPlugin,
      name: 'moser/formatting/prettier',
      rules: {
        'prettier/prettier': 'warn',
      },
    },
  ]);
}

/**
 * Exports a function that returns a
 * [composer instance](https://github.com/antfu/eslint-flat-config-utils)
 * for easily prepending, appending, and overriding configuration.
 *
 * @example
 * ```ts
 * import moser from '@moser-inc/eslint-config';
 *
 * export default moser().append(...);
 */
export function coreConfig<
  const TConfig extends Linter.Config = Linter.Config,
  const TConfigNames extends string = keyof DefaultConfigNamesMap,
>(options?: MoserConfigOptions) {
  return composer<TConfig, TConfigNames>(
    globalConfigs(),
    jsTsConfigs(options),
    importConfigs(),
    unicornConfigs(),
    formattingConfigs(),
  ) as FlatConfigComposer<TConfig, TConfigNames>;
}

export {
  defineFlatConfig,
  type DefaultConfigNamesMap,
  type FlatConfigComposer,
} from 'eslint-flat-config-utils';

export default coreConfig;
