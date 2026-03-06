import { appendFile } from 'node:fs/promises';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import { flatConfigsToRulesDTS } from 'eslint-typegen/core';
import moser from '../src/index.ts';

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
  const declarationFilePath = `dist/${declarationFileName}`;

  try {
    await appendFile(declarationFilePath, dts);
  } catch {
    continue;
  }
}

console.log('Vue config type definitions generated');
