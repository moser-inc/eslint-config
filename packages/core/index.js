module.exports = {
  env: { node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['node_modules', 'dist'],
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier'],
  root: true,
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    curly: ['error', 'multi-line', 'consistent'],
    eqeqeq: 'warn',
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
    'linebreak-style': ['error', 'unix'],
    'object-shorthand': ['error', 'always'],
    'prettier/prettier': ['warn', { singleQuote: true, trailingComma: 'all' }],
  },
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
