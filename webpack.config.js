const Path = require('path');
const webpack = require('webpack');


const babelOptions = {
    "presets": [
        "env"
    ]
};

module.exports = {
    entry: './src/index.ts',
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
        filename: 'view.js',
        path: Path.join(process.cwd(), 'dist'),
        library: 'view',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [{
                    loader: 'babel-loader',
                    options: babelOptions
                },
                {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            declaration: false,
                        }
                    }
                }
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: babelOptions
            }]
        }]
    },
    node: {
        console: false,
        global: false,
        process: false,
        __filename: "mock",
        __dirname: "mock",
        Buffer: false,
        setImmediate: false
    }
}