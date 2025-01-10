import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import url from '@rollup/plugin-url'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'
import dotenv from 'dotenv'
import pkg from './package.json' assert { type: 'json' }

// import .env variables
dotenv.config({ path: './.env' })

export default {
  input: 'example/integration.ts',
  output: [
    {
      file: 'dist/dist/bundle.js',
      format: 'iife',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    replace({
      preventAssignment: true,
      values: {
        "process.env.PLUGIN_CLIENT_ID": JSON.stringify(process.env.PLUGIN_CLIENT_ID),
        "process.env.PLUGIN_CLIENT_SECRET": JSON.stringify(process.env.PLUGIN_CLIENT_SECRET),
        "process.env.NPM_PACKAGE_NAME": JSON.stringify(pkg.name),
        "process.env.NPM_PACKAGE_VERSION": JSON.stringify(pkg.version),
      },
    }),
    url(),
    json(),
    resolve({
      preferBuiltins: true,
      browser: true,
    }),
    typescript({
      clean: true,
    }),
    commonjs({}),
    serve({
      open: true,
      port: 8081,
      contentBase: ['example', 'dist'],
    }),
    livereload({
      watch: ['dist', 'example'],
    }),
  ],
}
