import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  exports: { customExports: { './flat': './dist/index.mjs' } },
  dts: true,
  deps: {
    neverBundle: ['eslint-flat-config-utils'],
  },
  onSuccess: 'node ./scripts/typegen.ts',
});
