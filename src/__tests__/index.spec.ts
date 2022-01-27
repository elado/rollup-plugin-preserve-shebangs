import path from 'path';
import { rollup, RollupWarning } from 'rollup';

import { preserveShebangs } from '..';

type WarningParam = RollupWarning

const getWarningCode = (warning: WarningParam) =>
  typeof warning === 'string' ? warning : warning.code;

it('preserves shebang in output file', async () => {
  const bundle = await rollup({
    input: path.join(__dirname, './fixtures/file.js'),
    plugins: [preserveShebangs()],
  });

  const output = await bundle.generate({ format: 'cjs' });
  expect(output.output[0].code.startsWith('#!/usr/bin/env node')).toBe(true);
});

it('supports sourcemaps', async () => {
  let sourcemapOk = true;

  const bundle = await rollup({
    input: path.join(__dirname, './fixtures/file.js'),
    plugins: [preserveShebangs()],
    onwarn: (warning, deafultHandler) => {
      sourcemapOk = sourcemapOk && getWarningCode(warning) !== 'SOURCEMAP_BROKEN';
      deafultHandler(warning);
    },
  });

  const output = await bundle.write({
    format: 'cjs',
    sourcemap: true,
    dir: path.join(__dirname, './__out'),
  });
  expect(output.output[0].code.startsWith('#!/usr/bin/env node')).toBe(true);
  expect(sourcemapOk).toBe(true);
});
