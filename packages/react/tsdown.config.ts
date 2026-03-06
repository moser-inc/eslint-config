import { appendFile } from 'node:fs/promises';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import { flatConfigsToRulesDTS } from 'eslint-typegen/core';
import { defineConfig } from 'tsdown';
import moser from '@moser-inc/eslint-config-react';

export default defineConfig({
  entry: ['src/index.ts'],
  exports: { customExports: { './flat': './dist/index.mjs' } },
  dts: true,
  deps: {
    neverBundle: ['eslint-flat-config-utils'],
  },
  hooks: {
    'build:done': async (ctx) => {
      const config = await moser().append({
        plugins: {
          '': {
            rules: Object.fromEntries(builtinRules),
          },
        },
      });

      let dts = await flatConfigsToRulesDTS(config, {
        includeIgnoreComments: false,
        includeTypeImports: false,
      });

      const configNames = [
        ...new Set(
          config
            .map((item) => item.name)
            .filter((name) => name !== undefined && !!name),
        ),
      ];

      dts += `
        declare module 'eslint-flat-config-utils' {
          interface DefaultConfigNamesMap {
            ${configNames.map((name) => `'${name}': true;`).join('\n')}
          }
        }
      `;

      for (const declarationFileName of ['index.d.mts']) {
        const declarationFilePath = `${ctx.options.outDir}/${declarationFileName}`;

        try {
          await appendFile(declarationFilePath, dts);
        } catch {
          continue;
        }
      }

      console.log('React config type definitions generated');
    },
  },
});
