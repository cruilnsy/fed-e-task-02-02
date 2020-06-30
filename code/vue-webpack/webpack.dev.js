const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
const path = require('path')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-eval-module-source-map',
    output: {
        filename: '[name]-[hash:8].bundle.js',
        path: path.join(__dirname, 'dist')
    },
    devServer: {
        // hotOnly: true,
        contentBase: './public'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})