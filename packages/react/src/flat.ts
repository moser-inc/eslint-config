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

export const reactConfig = coreConfig.append([
  reactPlugin.configs.flat!.recommended as Linter.Config,
  reactPlugin.configs.flat!['jsx-runtime'] as Linter.Config,
  ...compat.config({
    extends: ['plugin:react-hooks/recommended'],
    plugins: ['react-compiler'],
    rules: {
      'react-compiler/react-compiler': 'warn',
    },
  }),
  ...formattingPlugins,
] as const satisfies Linter.Config[]);

export * from '@moser-inc/eslint-config/flat';

export default reactConfig;
