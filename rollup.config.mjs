import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import nodeExternals from 'rollup-plugin-node-externals'
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
      sourcemap: false,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: false,
    },
  ],
  external: ['crypto'],
  plugins: [
    nodeExternals(),
    replace({
      preventAssignment: true,
      values: {
        "process.env.NPM_PACKAGE_NAME": JSON.stringify(pkg.name),
        "process.env.NPM_PACKAGE_VERSION": JSON.stringify(pkg.version),
      },
    }),
    json(),
    resolve({
      preferBuiltins: true,
      browser: true,
    }),
    typescript({
      clean: true,
    }),
    commonjs(),
    terser(),
  ],
});
