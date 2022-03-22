const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

const config = {
    experiments: {
        outputModule: true
    },
    mode: 'production',
    entry: {
        index:
            './src/index.js'
    },
    output: {
        filename: "index.js",
        module: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
    plugins: [
        new CopyPlugin({
            patterns: [{from: path.join(__dirname, 'public'), to: ''}]
        })
    ]
}

module.exports = config
