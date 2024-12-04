import jsEslintPlugin from '@eslint/js';
import type { Linter } from 'eslint';
import { composer } from 'eslint-flat-config-utils';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import importPlugin from 'eslint-plugin-import-x';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import tsEslintPlugin from 'typescript-eslint';

export const globalPlugins = [
  { ignores: ['**/node_modules/', '**/config/', '**/dist/', '**/.output/'] },
] as const satisfies Linter.Config[];

export const jsTsPlugins = [
  ...tsEslintPlugin.config(
    jsEslintPlugin.configs.recommended,
    // eslint-disable-next-line import-x/no-named-as-default-member
    ...tsEslintPlugin.configs.recommended,
    {
      rules: {
        curly: ['error', 'multi-line', 'consistent'],
        eqeqeq: 'warn',
        'linebreak-style': ['error', 'unix'],
        'object-shorthand': ['error', 'always'],
        'sort-imports': ['warn', { ignoreDeclarationSort: true }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-import-type-side-effects': 'error',
      },
    },
  ),
] as Linter.Config[];

export const importPlugins = [
  importPlugin.flatConfigs.recommended as Linter.Config,
  importPlugin.flatConfigs.typescript,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    rules: {
      'no-unused-vars': 'off',
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
    settings: {
      'import/resolver': [
        createTypeScriptImportResolver({ alwaysTryTypes: true }),
      ],
    },
  },
] as const satisfies Linter.Config[];

export const formattingPlugins = [
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
 * import moserConfig from '@moser-inc/eslint-config/flat';
 *
 * export default moserConfig().append(...);
 */
export function coreConfig() {
  return composer([
    ...globalPlugins,
    ...jsTsPlugins,
    ...importPlugins,
    ...formattingPlugins,
  ] as const satisfies Linter.Config[]);
}

export default coreConfig;
