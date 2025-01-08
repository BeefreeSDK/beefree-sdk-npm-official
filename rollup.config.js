import nodeExternals from 'rollup-plugin-node-externals'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import url from '@rollup/plugin-url'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'
import dotenv from 'dotenv'
import pkg from './package.json' assert { type: 'json' }

// import .env variables
dotenv.config();

export default {
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
  plugins: [
    nodeExternals(),
    replace({
      preventAssignment: true,
      values: {
        "process.env.NPM_PACKAGE_NAME": JSON.stringify(pkg.name),
        "process.env.NPM_PACKAGE_VERSION": JSON.stringify(pkg.version),
      },
    }),
    url(),
    json(),
    resolve(
      {
        preferBuiltins: true,
        browser: true,
      },
    ),
    typescript({
      clean: true,
    }),
    commonjs({}),
   // terser(),
  ],
  // external: ['axios', 'load-script', 'fp-ts/lib/function', 'fp-ts/lib/Either'],
};
