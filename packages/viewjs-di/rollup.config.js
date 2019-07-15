const resolve = require('rollup-plugin-node-resolve'),
      commonjs = require('rollup-plugin-commonjs'),
      babel = require('rollup-plugin-babel'),
      typescript = require('rollup-plugin-typescript');

const pkg = require('./package.json');

module.exports = [
  // browser-friendly UMD build
  {
    input: './src/index.ts',
    output: [
      {
        file: pkg.browser,
        format: 'umd',
        name: 'viewjs.di',
        globals: {
          'reflect-metadata': 'Reflect',
        }
      },
      {
        file: pkg.module,
        format: 'es',
      }
    ],
    external: ['reflect-metadata'],
    plugins: [
      typescript({
        exclude: ['node_modules/**'],
        typescript: require('typescript'),
        declaration: false,
        module: 'es2015'
      }),
      babel({exclude: ['node_modules/**']})
    ]
  }
];