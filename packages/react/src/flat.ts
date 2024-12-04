import path from 'node:path';
import { fileURLToPath } from 'node:url';
// @ts-expect-error untyped module
import { FlatCompat } from '@eslint/eslintrc';
import { coreConfig, formattingPlugins } from '@moser-inc/eslint-config/flat';
import type { Linter } from 'eslint';
import reactPlugin from 'eslint-plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * Exports a function that returns a
 * [composer instance](https://github.com/antfu/eslint-flat-config-utils)
 * for easily prepending, appending, and overriding configuration.
 *
 * @example
 * ```ts
 * import moserConfig from '@moser-inc/eslint-config-react/flat';
 *
 * export default moserConfig().append(...);
 */
export function reactConfig() {
  return coreConfig().append([
    reactPlugin.configs.flat!.recommended,
    reactPlugin.configs.flat!['jsx-runtime'],
    ...compat.config({
      extends: ['plugin:react-hooks/recommended'],
      plugins: ['react-compiler'],
      rules: {
        'react-compiler/react-compiler': 'warn',
      },
    }),
    ...formattingPlugins,
  ] as const satisfies Linter.Config[]);
}

export * from '@moser-inc/eslint-config/flat';

export default reactConfig;
