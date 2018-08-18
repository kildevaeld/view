const resolve = require('rollup-plugin-node-resolve'),
    commonjs = require('rollup-plugin-commonjs'),
    babel = require('rollup-plugin-babel'),
    typescript = require('rollup-plugin-typescript');

const pkg = require('./package.json');

module.exports = [
    // browser-friendly UMD build
    {
        input: './src/index.ts',
        output: [{
            file: pkg.browser,
            format: 'umd',
            name: 'viewjs.html',
            globals: {
                '@viewjs/utils': 'viewjs.utils',
            }
        }, {
            file: pkg.module,
            format: 'es',
        }],
        external: ["@viewjs/utils"],
        plugins: [
            typescript({
                exclude: ['node_modules/**'],
                typescript: require('typescript'),
                declaration: false,
                module: 'es2015'
            }),
            babel({
                exclude: ['node_modules/**']
            })
        ]
    }
];