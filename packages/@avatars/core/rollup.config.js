import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import autoExternal from 'rollup-plugin-auto-external';
import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const name = 'Avatars';

export default [
  {
    input: './src/index.ts',
    plugins: [resolve({ extensions }), commonjs(), babel({ extensions, include: ['src/**/*'] }), terser()],
    external: ['crypto'],
    output: [
      {
        file: pkg.browser,
        format: 'iife',
        name: name,
      },
    ],
  },
  {
    input: './src/index.ts',
    plugins: [resolve({ extensions }), babel({ extensions, include: ['src/**/*'] }), autoExternal()],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
    ],
  },
];
