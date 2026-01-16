import {
  type DefaultConfigNamesMap,
  type FlatConfigComposer,
  type MoserConfigOptions,
  coreConfig,
  formattingConfigs,
} from '@moser-inc/eslint-config';
import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export function reactConfigs(): Linter.Config[] {
  return defineConfig([
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    reactHooksPlugin.configs.flat['recommended-latest'],
    {
      name: 'moser/react/settings',
      settings: {
        react: {
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
    reactConfigs(),
    formattingConfigs(),
  ) as FlatConfigComposer<TConfig, TConfigNames>;
}

export * from '@moser-inc/eslint-config';

export default reactConfig;
