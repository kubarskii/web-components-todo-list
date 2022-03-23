const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

const config = {
    mode: 'production',
    entry: {
        index: './src/index.js'
    },
    resolve: {
        extensions: ['.js']
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "umd2"
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
