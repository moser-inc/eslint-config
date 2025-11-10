import type { Linter } from 'eslint';
import { version } from 'vue';

const legacyVueConfig = {
  parserOptions: {
    parser: {
      js: 'espree',
      jsx: 'espree',
      cjs: 'espree',
      mjs: 'espree',
      ts: '@typescript-eslint/parser',
      tsx: '@typescript-eslint/parser',
      cts: '@typescript-eslint/parser',
      mts: '@typescript-eslint/parser',
    },
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    '@moser-inc',
    'plugin:vue/vue2-recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['*.ts', '*.cts', '*.mts', '*.tsx', '*.vue'],
      rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
      },
    },
  ],
  rules: {
    // Prettier
    'prettier/prettier': 'warn',

    // Customized
    'vue/valid-v-slot': ['warn', { allowModifiers: true }],

    // Uncategorized
    'vue/block-lang': ['warn', { script: { lang: ['ts', 'tsx'] } }],
    'vue/block-order': ['warn', { order: ['script', 'template', 'style'] }],
    'vue/block-tag-newline': 'warn',
    'vue/component-api-style': ['warn', ['script-setup']],
    'vue/component-name-in-template-casing': 'warn',
    'vue/component-options-name-casing': 'warn',
    'vue/custom-event-name-casing': 'warn',
    'vue/define-emits-declaration': ['warn', 'type-based'],
    'vue/define-macros-order': [
      'warn',
      {
        order: [
          'defineOptions',
          'defineModel',
          'defineProps',
          'defineEmits',
          'defineSlots',
        ],
        defineExposeLast: true,
      },
    ],
    'vue/define-props-declaration': ['warn', 'type-based'],
    'vue/match-component-file-name': ['warn', { extensions: ['vue', 'tsx'] }],
    'vue/match-component-import-name': 'warn',
    'vue/no-duplicate-attr-inheritance': 'warn',
    'vue/no-empty-component-block': 'warn',
    'vue/no-multiple-objects-in-class': 'warn',
    'vue/no-ref-object-reactivity-loss': 'warn',
    'vue/no-required-prop-with-default': ['warn', { autofix: true }],
    'vue/no-reserved-component-names': 'warn',
    'vue/no-root-v-if': 'warn',
    'vue/no-template-target-blank': 'warn',
    'vue/no-unsupported-features': ['warn', { version }],
    'vue/no-unused-emit-declarations': 'warn',
    'vue/no-unused-properties': 'warn',
    'vue/no-unused-refs': 'warn',
    'vue/no-use-v-else-with-v-for': 'warn',
    'vue/no-useless-mustaches': 'warn',
    'vue/no-useless-v-bind': 'warn',
    'vue/no-v-text': 'warn',
    'vue/padding-line-between-blocks': 'warn',
    'vue/prefer-define-options': 'warn',
    'vue/prefer-prop-type-boolean-first': 'warn',
    'vue/prefer-separate-static-class': 'warn',
    'vue/prefer-true-attribute-shorthand': 'warn',
    'vue/prefer-use-template-ref': 'off',
    'vue/require-direct-export': 'warn',
    'vue/require-macro-variable-name': 'warn',
    'vue/require-name-property': 'warn',
    'vue/require-typed-ref': 'warn',
    'vue/v-for-delimiter-style': 'warn',
    // 'vue/v-on-handler-style': ['warn', ['method', 'inline']],
    'vue/valid-define-options': 'warn',

    // Deprecations
    'vue/no-deprecated-data-object-declaration': 'error',
    'vue/no-deprecated-destroyed-lifecycle': 'error',
    'vue/no-deprecated-dollar-listeners-api': 'off',
    'vue/no-deprecated-dollar-scopedslots-api': 'off',
    'vue/no-deprecated-delete-set': 'off',
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
    'vue/no-deprecated-v-bind-sync': 'off',
    'vue/no-deprecated-v-is': 'error',
    'vue/no-deprecated-v-on-native-modifier': 'error',
    'vue/no-deprecated-v-on-number-modifiers': 'error',
    'vue/no-deprecated-vue-config-keycodes': 'error',
  },
} satisfies Linter.LegacyConfig;

export default legacyVueConfig;
