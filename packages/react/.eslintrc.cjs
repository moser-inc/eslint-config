/** @type {import('eslint').Linter.LegacyConfig} */
module.exports = {
  extends: ['@moser-inc/eslint-config-react'],
  ignorePatterns: ['dist', 'build.config.ts', 'src/flat.ts'],
};
