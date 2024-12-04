# Moser ESLint Config React

This is the set of rules to for usage in React based projects.

## Installation

```shell
npm i -D eslint prettier @moser-inc/eslint-config-react
```

## Usage (Flat)

Export the config from your `eslint.config.mjs` file. The config exports a `composer` instance ([see here](https://github.com/antfu/eslint-flat-config-utils)) that can prepend/append/override rules and configuration.

```ts
import moserConfig from '@moser-inc/eslint-config-react/flat';

export default moserConfig();
```

## Usage (Legacy)

Add the config to the `extends` option in your `.eslintrc.cjs` file.

```js
module.exports = {
  extends: ['@moser-inc/eslint-config-react']
}
```
