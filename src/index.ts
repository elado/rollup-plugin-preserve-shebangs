import { Plugin } from 'rollup';
import MagicString from 'magic-string';

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
    renderChunk(code, chunk, { sourcemap }) {
      if (chunk.facadeModuleId && shebangs[chunk.facadeModuleId]) {
        const str = new MagicString(code);
        str.prepend(shebangs[chunk.facadeModuleId] + '\n');
        return {
          code: str.toString(),
          map: sourcemap ? str.generateMap({ hires: true }) : null,
        };
      }
      return {
        code,
        map: null,
      };
    },
  };

  return plugin;
};
