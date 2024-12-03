import jsEslint from '@eslint/js';
import type { Linter } from 'eslint';
import { composer } from 'eslint-flat-config-utils';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import eslintPluginImportX from 'eslint-plugin-import-x';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import tsEslint from 'typescript-eslint';

const globalPlugins = [
  { ignores: ['**/node_modules/', '**/config/', '**/dist/', '**/.output/'] },
] as Linter.Config[];

const jsTsPlugins = [
  ...tsEslint.config(
    jsEslint.configs.recommended,
    // eslint-disable-next-line import-x/no-named-as-default-member
    ...tsEslint.configs.recommended,
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

const importPlugins = [
  eslintPluginImportX.flatConfigs.recommended as Linter.Config,
  eslintPluginImportX.flatConfigs.typescript,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    rules: {
      'no-unused-vars': 'off',
      'import-x/no-dynamic-require': 'warn',
      'import-x/no-nodejs-modules': 'warn',
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
] satisfies Linter.Config[];

const formattingPlugins = [
  prettierPlugin,
  { rules: { 'prettier/prettier': 'warn' } },
] satisfies Linter.Config[];

export const moserConfig = composer([
  ...globalPlugins,
  ...jsTsPlugins,
  ...importPlugins,
  ...formattingPlugins,
] as Linter.Config[]);

export default moserConfig;
