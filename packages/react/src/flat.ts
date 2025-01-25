import { coreConfig, formattingConfigs } from '@moser-inc/eslint-config/flat';
import type { MoserConfigOptions } from '@moser-inc/eslint-config/flat';
import type { Linter } from 'eslint';
import type { DefaultConfigNamesMap } from 'eslint-flat-config-utils';
import reactPlugin from 'eslint-plugin-react';
// @ts-expect-error untyped module
import reactCompilerPlugin from 'eslint-plugin-react-compiler';
// @ts-expect-error untyped module
import reactHooksPlugin from 'eslint-plugin-react-hooks';

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
  const reactConfigs = [
    reactPlugin.configs.flat!.recommended,
    reactPlugin.configs.flat!['jsx-runtime'],
    reactHooksPlugin.configs['recommended-latest'],
    {
      plugins: {
        'react-compiler': reactCompilerPlugin,
      },
      rules: {
        'react-compiler/react-compiler': 'warn',
      },
    },
    {
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  ] as const satisfies Linter.Config[];

  return coreConfig<TConfig, TConfigNames>(options).append([
    ...reactConfigs,
    ...formattingConfigs,
  ] as const satisfies Linter.Config[]);
}

export * from '@moser-inc/eslint-config/flat';

export type { MoserConfigOptions };

export default reactConfig;
