module.exports = {
  extends: [
    '@moser-inc/eslint-config',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'airbnb',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
