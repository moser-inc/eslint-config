/** @type {import('eslint').Linter.LegacyConfig} */
module.exports = {
  extends: ['@moser-inc/eslint-config-vue'],
  ignorePatterns: ['dist', 'build.config.ts', 'src/flat.*'],
};
