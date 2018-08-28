const Path = require('path');
const webpack = require('webpack');
const WebpackBundleSizeAnalyzerPlugin = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin,
    HtmlWebpackPlugin = require('html-webpack-plugin')



const babelOptions = {

};

module.exports = {
    entry: './src/index.ts',
    resolve: {
        mainFields: ['module', 'browser', 'main'],
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'],
    },
    mode: 'none',
    output: {
        filename: 'example.js',
        path: Path.join(process.cwd(), 'dist'),
        chunkFilename: "[id].chunk.js",
        //publicPath: "example/"
    },
    optimization: {
        splitChunks: {
            name: false,
            chunks: 'async',
        }
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
                            module: 'esnext',
                            target: 'es2017'
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
    plugins: [
        new HtmlWebpackPlugin(),
        new WebpackBundleSizeAnalyzerPlugin('plain-report2.txt')
    ],
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