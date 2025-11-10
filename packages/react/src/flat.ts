import {
  type DefaultConfigNamesMap,
  type FlatConfigComposer,
  type MoserConfigOptions,
  coreConfig,
  formattingConfigs,
} from '@moser-inc/eslint-config/flat';
import type { Linter } from 'eslint';
// eslint-disable-next-line depend/ban-dependencies
import reactPlugin from 'eslint-plugin-react';
import * as reactHooksPlugin from 'eslint-plugin-react-hooks';

export function reactConfigs(): Linter.Config[] {
  return [
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    // @ts-expect-error missing from latest release https://github.com/facebook/react/issues/34705
    // eslint-disable-next-line import-x/namespace
    reactHooksPlugin.configs?.['recommended'],
    {
      name: 'moser/react/settings',
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  ] as const satisfies Linter.Config[];
}

/**
 * Exports a function that returns a
 * [composer instance](https://github.com/antfu/eslint-flat-config-utils)
 * for easily prepending, appending, and overriding configuration.
 *
 * @example
 * ```ts
 * import moser from '@moser-inc/eslint-config-react/flat';
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

export * from '@moser-inc/eslint-config/flat';

export default reactConfig;
