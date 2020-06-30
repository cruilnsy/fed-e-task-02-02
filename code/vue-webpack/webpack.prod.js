const merge = require('webpack-merge')
const common = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const copyWebpackPlugin = require("copy-webpack-plugin")
const path = require('path')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name]-[contenthash:8].bundle.js',
        path: path.join(__dirname, 'dist')
    },
    optimization: {
        minimizer: [
            new TerserWebpackPlugin(),
            new OptimizeCssAssetsPlugin()
        ]   
    },
    plugins: [
        new CleanWebpackPlugin(),
        new copyWebpackPlugin({
            patterns: [
                {from: 'public'}
            ]
        }),
        new HtmlWebpackPlugin({
            title: 'Vue Assignment Compress',
            template: './public/index.html',
            minify: {
                collapseWhitespace: true
            }
        })
    ]
})