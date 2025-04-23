import type { Linter } from 'eslint';

const legacyReactConfig = {
  extends: [
    '@moser-inc',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended-legacy',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
} satisfies Linter.LegacyConfig;

export default legacyReactConfig;
