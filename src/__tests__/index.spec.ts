import path from 'path';
import { rollup } from 'rollup';

import { preserveShebangs } from '..';

it('preserves shebang in output file', async () => {
  const bundle = await rollup({
    input: path.join(__dirname, './fixtures/file.js'),
    plugins: [preserveShebangs()],
  });

  const output = await bundle.generate({ format: 'cjs' });

  expect(output.output[0].code.startsWith('#!/usr/bin/env node')).toBe(true);
});
