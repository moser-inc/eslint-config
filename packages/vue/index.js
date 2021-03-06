const { isVue2 } = require('vue-demi');

module.exports = {
  extends: [
    '@moser-inc/eslint-config',
    '@vue/eslint-config-typescript/recommended',
    isVue2 ? 'plugin:vue/recommended' : 'plugin:vue/vue3-recommended',
    '@vue/eslint-config-prettier',
  ],
  rules: {
    // Vue Uncategorized
    'vue/block-tag-newline': 'warn',
    'vue/component-name-in-template-casing': 'warn',
    'vue/component-options-name-casing': 'warn',
    'vue/match-component-file-name': ['warn', { extensions: ['vue'] }],
    'vue/match-component-import-name': 'warn',
    'vue/no-duplicate-attr-inheritance': 'warn',
    'vue/no-reserved-component-names': 'warn',
    'vue/no-template-target-blank': 'warn',
    'vue/no-unused-properties': 'warn',
    'vue/no-unused-refs': 'warn',
    'vue/no-useless-mustaches': 'warn',
    'vue/no-useless-v-bind': 'warn',
    'vue/no-v-text': 'warn',
    'vue/require-name-property': 'warn',
    'vue/v-on-function-call': 'warn',
    'vue/valid-v-slot': 'warn',

    // Vue Deprecations
    'vue/no-deprecated-data-object-declaration': 'error',
    'vue/no-deprecated-destroyed-lifecycle': 'error',
    'vue/no-deprecated-dollar-listeners-api': 'error',
    'vue/no-deprecated-dollar-scopedslots-api': 'error',
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
    'vue/no-deprecated-v-bind-sync': 'error',
    'vue/no-deprecated-v-is': 'error',
    'vue/no-deprecated-v-on-native-modifier': 'error',
    'vue/no-deprecated-v-on-number-modifiers': 'error',
    'vue/no-deprecated-vue-config-keycodes': 'error',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: [
          '.vue',
          '.js',
          '.jsx',
          '.cjs',
          '.mjs',
          '.ts',
          '.tsx',
          '.cts',
          '.mts',
        ],
      },
    },
  },
};
