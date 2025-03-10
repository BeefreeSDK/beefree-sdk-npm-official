import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import dotenv from 'dotenv';
import { createRequire } from 'node:module';

// Load environment variables
dotenv.config();

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  external: ['crypto'],
  plugins: [
    external(),
    json(),
    resolve({
      preferBuiltins: true,
      browser: true,
    }),
    typescript({
      clean: true,
    }),
    commonjs(),
  ],
});
