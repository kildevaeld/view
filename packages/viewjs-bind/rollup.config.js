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
            name: 'viewjs.bind',
            globals: {
                '@viewjs/utils': 'viewjs.utils',
                '@viewjs/html': 'viewjs.events',
                '@viewjs/events': 'viewjs.html',
            }
        }, {
            file: pkg.module,
            format: 'es',
        }],
        external: [
            "@viewjs/utils",
            "@viewjs/html",
            "@viewjs/events"
        ],
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