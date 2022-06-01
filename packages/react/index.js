module.exports = {
  extends: [
    '@moser-inc/eslint-config',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  rules: {},
  settings: {
    react: {
      version: 'detect',
    },
  },
};
