/* eslint-disable import-x/no-named-as-default-member */
import process from 'node:process';
import jsEslintPlugin from '@eslint/js';
import type { Linter } from 'eslint';
import {
  type DefaultConfigNamesMap,
  type ResolvableFlatConfig,
  composer,
} from 'eslint-flat-config-utils';
import importPlugin from 'eslint-plugin-import-x';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import tsEslintPlugin from 'typescript-eslint';

export {
  defineFlatConfig,
  type DefaultConfigNamesMap,
} from 'eslint-flat-config-utils';

export function defineFlatConfigs<
  const TConfig extends Linter.Config = Linter.Config,
  const TConfigNames extends string = keyof DefaultConfigNamesMap,
>(...configs: ResolvableFlatConfig<TConfig>[]) {
  return composer<TConfig, TConfigNames>(...configs);
}

export interface MoserConfigOptions {
  /**
   * Path to the TypeScript configuration file. Enables type-aware linting when
   * defined. Most often will be set to `tsconfig.json` to use the base project
   * configuration.
   */
  tsconfigPath?: string;
}

export const globalConfigs = [
  {
    ignores: [
      '**/node_modules/',
      '**/build/',
      '**/dist/',
      '**/.output/',
      '**/.next/',
      '**/.nuxt/',
    ],
  },
] as const satisfies Linter.Config[];

export const jsTsConfigs = (options?: MoserConfigOptions) => {
  const tsconfigPath = options?.tsconfigPath;
  const isTypeAware = !!tsconfigPath;

  return tsEslintPlugin.config(
    jsEslintPlugin.configs.recommended,
    tsEslintPlugin.configs.eslintRecommended,
    tsEslintPlugin.configs.recommended,
    {
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
            files: ['**/*.{ts,tsx,mts,cts}'],
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
      files: ['**/*.{js,mjs,cjs,jsx}'],
      extends: [tsEslintPlugin.configs.disableTypeChecked],
    },
    {
      files: ['**/*.{js,cjs,cts}'],
      rules: {
        'no-undef': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ) as Linter.Config[];
};

export const importConfigs = [
  importPlugin.flatConfigs.recommended as Linter.Config,
  importPlugin.flatConfigs.typescript,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,vue}'],
    rules: {
      'import-x/no-unresolved': ['error', { ignore: ['\\?*$'] }],
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
] as const satisfies Linter.Config[];

export const formattingConfigs = [
  {
    ...prettierPlugin,
    rules: {
      ...prettierPlugin.rules,
      'prettier/prettier': 'warn',
    },
  },
] as const satisfies Linter.Config[];

/**
 * Exports a function that returns a
 * [composer instance](https://github.com/antfu/eslint-flat-config-utils)
 * for easily prepending, appending, and overriding configuration.
 *
 * @example
 * ```ts
 * import moser from '@moser-inc/eslint-config/flat';
 *
 * export default moser().append(...);
 */
export function coreConfig<
  const TConfig extends Linter.Config = Linter.Config,
  const TConfigNames extends string = keyof DefaultConfigNamesMap,
>(options?: MoserConfigOptions) {
  return composer<TConfig, TConfigNames>(
    globalConfigs,
    jsTsConfigs(options),
    importConfigs,
    formattingConfigs,
  );
}

export default coreConfig;
