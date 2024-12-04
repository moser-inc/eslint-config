/** @type {import('eslint').Linter.LegacyConfig} */
// eslint-disable-next-line no-undef
module.exports = {
  extends: ['@moser-inc/eslint-config-vue'],
  ignorePatterns: ['dist', 'build.config.ts', 'src/flat.ts'],
};
