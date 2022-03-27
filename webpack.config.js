const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

const config = {
    mode: 'development',
    entry: {
        index: './src/index.ts'
    },
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.ts']
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "umd2",
        chunkFilename: '[id].js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9001,
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.ts$/i,
                loader: "ts-loader"
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'public'), to: ''},
            ]
        })
    ]
}

module.exports = config
