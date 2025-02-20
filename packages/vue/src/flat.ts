import {
  type DefaultConfigNamesMap,
  type MoserConfigOptions,
  coreConfig,
  formattingConfigs,
} from '@moser-inc/eslint-config/flat';
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';
import type { Linter } from 'eslint';
import vuePlugin from 'eslint-plugin-vue';
import { isVue2, version } from 'vue-demi';

export function vueConfigs(options?: MoserConfigOptions) {
  const tsconfigPath = options?.tsconfigPath;
  const isTypeAware = !!tsconfigPath;

  return defineConfigWithVueTs(
    [
      ...vuePlugin.configs['flat/recommended'],
      {
        name: 'moser/vue/overrides',
        files: ['**/*.vue'],
        rules: {
          // Customized
          'vue/valid-v-slot': ['error', { allowModifiers: true }],

          // Disabled
          'vue/max-attributes-per-line': 'off',
          'vue/singleline-html-element-content-newline': 'off',

          // Uncategorized
          'vue/block-lang': ['error', { script: { lang: ['ts', 'tsx'] } }],
          'vue/block-order': [
            'error',
            { order: ['script', 'template', 'style'] },
          ],
          'vue/block-tag-newline': 'error',
          'vue/component-api-style': ['error', ['script-setup']],
          'vue/component-name-in-template-casing': 'error',
          'vue/component-options-name-casing': 'error',
          'vue/custom-event-name-casing': 'error',
          'vue/define-emits-declaration': ['error', 'type-based'],
          'vue/define-macros-order': [
            'error',
            {
              order: [
                'definePageMeta',
                'defineOptions',
                'defineModal',
                'defineProps',
                'defineEmits',
                'defineSlots',
              ],
              defineExposeLast: true,
            },
          ],
          'vue/define-props-declaration': ['error', 'type-based'],
          'vue/html-comment-content-newline': 'error',
          'vue/html-comment-content-spacing': 'error',
          'vue/html-comment-indent': 'error',
          'vue/match-component-file-name': [
            'error',
            { extensions: ['vue', 'tsx'] },
          ],
          'vue/match-component-import-name': 'error',
          'vue/next-tick-style': ['error', 'promise'],
          'vue/no-boolean-default': 'error',
          'vue/no-duplicate-attr-inheritance': 'error',
          'vue/no-empty-component-block': 'error',
          'vue/no-multiple-objects-in-class': 'error',
          'vue/no-ref-object-reactivity-loss': 'error',
          'vue/no-required-prop-with-default': ['error', { autofix: true }],
          'vue/no-reserved-component-names': 'error',
          'vue/no-root-v-if': 'error',
          'vue/no-template-target-blank': 'error',
          'vue/no-unsupported-features': ['error', { version }],
          'vue/no-unused-emit-declarations': 'error',
          'vue/no-unused-properties': 'error',
          'vue/no-unused-refs': 'error',
          'vue/no-use-v-else-with-v-for': 'error',
          'vue/no-useless-mustaches': 'error',
          'vue/no-useless-v-bind': 'error',
          'vue/no-v-text': 'error',
          'vue/padding-line-between-blocks': 'error',
          'vue/prefer-define-options': 'error',
          'vue/prefer-prop-type-boolean-first': 'error',
          'vue/prefer-separate-static-class': 'error',
          'vue/prefer-true-attribute-shorthand': 'error',
          'vue/prefer-use-template-ref': isVue2 ? 'off' : 'error',
          'vue/require-direct-export': 'error',
          'vue/require-macro-variable-name': 'error',
          'vue/require-name-property': 'error',
          'vue/require-typed-ref': 'error',
          'vue/slot-name-casing': 'error',
          'vue/v-bind-style': [
            isVue2 ? 'off' : 'error',
            'shorthand',
            { sameNameShorthand: 'always' },
          ],
          'vue/v-for-delimiter-style': 'error',
          'vue/v-on-function-call': 'error',
          'vue/valid-define-options': 'error',

          // Deprecations
          'vue/no-deprecated-data-object-declaration': 'error',
          'vue/no-deprecated-destroyed-lifecycle': 'error',
          'vue/no-deprecated-dollar-listeners-api': isVue2 ? 'off' : 'error',
          'vue/no-deprecated-dollar-scopedslots-api': isVue2 ? 'off' : 'error',
          'vue/no-deprecated-delete-set': isVue2 ? 'off' : 'error',
          'vue/no-deprecated-events-api': 'error',
          'vue/no-deprecated-filter': 'error',
          'vue/no-deprecated-functional-template': 'error',
          'vue/no-deprecated-html-element-is': 'error',
          'vue/no-deprecated-inline-template': 'error',
          'vue/no-deprecated-props-default-this': 'error',
          'vue/no-deprecated-router-link-tag-prop': 'error',
          'vue/no-deprecated-scope-attribute': 'error',
          'vue/no-deprecated-slot-attribute': 'error',
          'vue/no-deprecated-slot-scope-attribute': 'error',
          'vue/no-deprecated-v-bind-sync': isVue2 ? 'off' : 'error',
          'vue/no-deprecated-v-is': 'error',
          'vue/no-deprecated-v-on-native-modifier': 'error',
          'vue/no-deprecated-v-on-number-modifiers': 'error',
          'vue/no-deprecated-vue-config-keycodes': 'error',
        },
      },
    ],
    isTypeAware
      ? vueTsConfigs.recommendedTypeChecked
      : vueTsConfigs.recommended,
  ) as Linter.Config[];
}

/**
 * Exports a function that returns a
 * [composer instance](https://github.com/antfu/eslint-flat-config-utils)
 * for easily prepending, appending, and overriding configuration.
 *
 * @example
 * ```ts
 * import moser from '@moser-inc/eslint-config-vue/flat';
 *
 * export default moser().append(...);
 */
export function vueConfig<
  const TConfig extends Linter.Config = Linter.Config,
  const TConfigNames extends string = keyof DefaultConfigNamesMap,
>(options?: MoserConfigOptions) {
  return coreConfig<TConfig, TConfigNames>(options).append(
    vueConfigs(options),
    formattingConfigs(),
  );
}

export * from '@moser-inc/eslint-config/flat';

export type { MoserConfigOptions, DefaultConfigNamesMap };

export default vueConfig;
