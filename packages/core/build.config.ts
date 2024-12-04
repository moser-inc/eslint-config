import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/legacy.ts', 'src/flat.ts'],
  externals: ['eslint-flat-config-utils'],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
});
