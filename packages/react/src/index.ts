import eslintReact from '@eslint-react/eslint-plugin';
import {
  type DefaultConfigNamesMap,
  type FlatConfigComposer,
  type MoserConfigOptions,
  coreConfig,
  formattingConfigs,
} from '@moser-inc/eslint-config';
import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export function reactConfigs(options?: MoserConfigOptions): Linter.Config[] {
  const tsconfigPath = options?.tsconfigPath;
  const isTypeAware = !!tsconfigPath;

  return defineConfig([
    ...(isTypeAware
      ? [eslintReact.configs['recommended-type-checked']]
      : [eslintReact.configs['recommended-typescript']]),
    reactHooksPlugin.configs.flat['recommended-latest'],
    {
      name: 'moser/react/settings',
      settings: {
        'react-x': {
          version: 'detect',
        },
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
 * import moser from '@moser-inc/eslint-config-react';
 *
 * export default moser().append(...);
 */
export function reactConfig<
  const TConfig extends Linter.Config = Linter.Config,
  const TConfigNames extends string = keyof DefaultConfigNamesMap,
>(options?: MoserConfigOptions) {
  return coreConfig<TConfig, TConfigNames>(options).append(
    reactConfigs(options),
    formattingConfigs(),
  ) as FlatConfigComposer<TConfig, TConfigNames>;
}

export * from '@moser-inc/eslint-config';

export default reactConfig;
