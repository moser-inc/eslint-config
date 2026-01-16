import { appendFile } from 'node:fs/promises';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import { flatConfigsToRulesDTS } from 'eslint-typegen/core';
import { defineBuildConfig } from 'unbuild';
import moser from './src';

export default defineBuildConfig({
  entries: ['src/index.ts'],
  externals: ['eslint-flat-config-utils'],
  declaration: true,
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

      const flatDtsEntries = ctx.buildEntries.filter((entry) =>
        entry.path.includes('flat.d'),
      );

      for (const entry of flatDtsEntries) {
        await appendFile(`${ctx.options.outDir}/${entry.path}`, dts);
      }

      console.log('React config type definitions generated');
    },
  },
});
