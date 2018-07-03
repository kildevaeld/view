const resolve = require('rollup-plugin-node-resolve'),
    commonjs = require('rollup-plugin-commonjs'),
    babel = require('rollup-plugin-babel'),
    typescript = require('rollup-plugin-typescript');

const pkg = require('./package.json');

module.exports = [
    // browser-friendly UMD build
    {
        input: './src/index.ts',
        output: {
            file: pkg.browser,
            format: 'umd',
            name: 'viewjs.view',
            globals: {
                '@viewjs/utils': 'viewjs.utils',
            }
        },
        external: ["@viewjs/utils"],
        treeshake: {
            pureExternalModules: false,
            propertyReadSideEffects: false
        },

        plugins: [
            typescript({
                typescript: require('typescript'),
                declaration: false
            }),
            //resolve(), // so Rollup can find `ms`
            commonjs(), // so Rollup can convert `ms` to an ES module
            babel({
                //presets: ['env'],
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