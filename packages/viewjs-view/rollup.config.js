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
            name: 'viewjs.view',
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
    },

    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // the `targets` option which can specify `dest` and `format`)
    /*{
        entry: 'src/main.js',
        external: ['ms'],
        targets: [{
                dest: pkg.main,
                format: 'cjs'
            },
            {
                dest: pkg.module,
                format: 'es'
            }
        ],
        plugins: [
            babel({
                exclude: ['node_modules/**']
            })
        ]
    }*/
];