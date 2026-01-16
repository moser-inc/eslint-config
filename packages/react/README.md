# Moser ESLint Config React [![npm](https://img.shields.io/npm/v/@moser-inc/eslint-config-react.svg)](https://npmjs.com/package/@moser-inc/eslint-config-react)

This is the set of rules to for usage in React based projects.

## Installation

```shell
npm i -D eslint prettier @moser-inc/eslint-config-react
```

## Usage

Export the config from your `eslint.config.mjs` file. The config exports a function that returns a `composer` instance ([see here](https://github.com/antfu/eslint-flat-config-utils)) that can prepend/append/override rules and configuration.

```ts
import moser from '@moser-inc/eslint-config-react';

export default moser().append(...);
```

For support for type checked rules, include the `tsconfigPath` option.

```ts
import moser from '@moser-inc/eslint-config-react';

export default moser({ tsconfigPath: './tsconfig.json' }).append(...);
```
