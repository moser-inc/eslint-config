import { coreConfig, formattingPlugins } from '@moser-inc/eslint-config/flat';
import type { Linter } from 'eslint';
import reactPlugin from 'eslint-plugin-react';

export const reactConfig = coreConfig.append([
  reactPlugin.configs.flat!.recommended as Linter.Config,
  reactPlugin.configs.flat!['jsx-runtime'] as Linter.Config,
  ...formattingPlugins,
] as const satisfies Linter.Config[]);

export * from '@moser-inc/eslint-config/flat';

export default reactConfig;
