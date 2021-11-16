import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'
import dotenv from 'dotenv'
import pkg from './package.json'

// import .env variables
dotenv.config();
export default {
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
    url(),
    json(),
    resolve(
      {
        preferBuiltins: true,
      },
    ),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    commonjs({}),
  ],
};
