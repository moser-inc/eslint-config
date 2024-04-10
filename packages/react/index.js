/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    '@moser-inc',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
