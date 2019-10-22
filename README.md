# rollup-plugin-preserve-shebangs

> Preserve shebangs in output files

## Install

```
npm i -D rollup-plugin-preserve-shebangs

yarn add -D rollup-plugin-preserve-shebangs
```

## Usage

```js
// rollup.config.js

const { preserveShebangs } = require('rollup-plugin-preserve-shebangs');

module.exports = {
  // ...
  plugins: [
    // ...
    preserveShebangs(),
  ],
};
```
