/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Base
    curly: ['error', 'multi-line', 'consistent'],
    eqeqeq: 'warn',
    'linebreak-style': ['error', 'unix'],
    'object-shorthand': ['error', 'always'],

    // Import
    'import/no-unresolved': ['error', { ignore: ['\\?*$'] }],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        alphabetize: { order: 'asc', caseInsensitive: false },
      },
    ],

    // Prettier
    'prettier/prettier': ['warn', { singleQuote: true, trailingComma: 'all' }],

    // TypeScript
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', `${__dirname}/src`]],
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
