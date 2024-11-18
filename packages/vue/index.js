// eslint-disable-next-line @typescript-eslint/no-require-imports
const { version, isVue2 } = require('vue-demi');

/** @type {import('eslint').Linter.LegacyConfig} */
module.exports = {
  extends: [
    '@moser-inc',
    isVue2 ? 'plugin:vue/recommended' : 'plugin:vue/vue3-recommended',
  ],
  rules: {
    // Customized
    'vue/component-tags-order': [
      'error',
      { order: ['script', 'template', 'style'] },
    ],
    'vue/valid-v-slot': ['warn', { allowModifiers: true }],

    // Uncategorized
    'vue/block-lang': ['warn', { script: { lang: ['ts', 'tsx'] } }],
    'vue/block-tag-newline': 'warn',
    'vue/component-api-style': ['warn', ['script-setup']],
    'vue/component-name-in-template-casing': 'warn',
    'vue/component-options-name-casing': 'warn',
    'vue/custom-event-name-casing': 'warn',
    'vue/define-emits-declaration': ['warn', 'type-based'],
    'vue/define-macros-order': [
      'warn',
      { order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'] },
    ],
    'vue/define-props-declaration': ['warn', 'type-based'],
    'vue/match-component-file-name': ['warn', { extensions: ['vue', 'tsx'] }],
    'vue/match-component-import-name': 'warn',
    'vue/no-duplicate-attr-inheritance': 'warn',
    'vue/no-empty-component-block': 'warn',
    'vue/no-multiple-objects-in-class': 'warn',
    'vue/no-ref-object-destructure': 'warn',
    'vue/no-required-prop-with-default': ['warn', { autofix: true }],
    'vue/no-reserved-component-names': 'warn',
    'vue/no-restricted-call-after-await': 'warn',
    'vue/no-root-v-if': 'warn',
    'vue/no-template-target-blank': 'warn',
    'vue/no-unsupported-features': ['warn', { version }],
    'vue/no-unused-emit-declarations': 'warn',
    'vue/no-unused-properties': 'warn',
    'vue/no-unused-refs': 'warn',
    'vue/no-useless-mustaches': 'warn',
    'vue/no-useless-v-bind': 'warn',
    'vue/no-v-text': 'warn',
    'vue/padding-line-between-blocks': 'warn',
    'vue/prefer-define-options': 'warn',
    'vue/require-direct-export': 'warn',
    'vue/require-name-property': 'warn',
    'vue/v-for-delimiter-style': 'warn',
    'vue/v-on-function-call': 'warn',
    'vue/valid-define-options': 'warn',

    // Deprecations
    'vue/no-deprecated-data-object-declaration': 'error',
    'vue/no-deprecated-destroyed-lifecycle': 'error',
    'vue/no-deprecated-dollar-listeners-api': isVue2 ? 'off' : 'error',
    'vue/no-deprecated-dollar-scopedslots-api': isVue2 ? 'off' : 'error',
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
};
