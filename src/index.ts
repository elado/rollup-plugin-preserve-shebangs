import { Plugin } from 'rollup';

const SHEBANG_RX = /^#!.*/;

export const preserveShebangs = () => {
  const shebangs: Record<string, string> = {};

  const plugin: Plugin = {
    name: 'rollup-plugin-preserve-shebangs',
    transform(code, id) {
      const match = code.match(SHEBANG_RX);

      if (match) {
        shebangs[id] = match[0];
      }

      code = code.replace(SHEBANG_RX, '');

      return {
        code,
        map: null,
      };
    },
    renderChunk(code, chunk) {
      if (chunk.facadeModuleId && shebangs[chunk.facadeModuleId]) {
        code = [shebangs[chunk.facadeModuleId], code].join('\n');
      }

      return { code };
    },
  };

  return plugin;
};
