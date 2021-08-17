const path = require('path')
const webpack = require('webpack')
process.env.NODE_ENV = 'development'
require('dotenv').config({ path: './.env' })

module.exports = {
    entry: './src/integration.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './',
        port: 8080,
        writeToDisk: true
    },
    plugins:[
        new webpack.DefinePlugin({"process.env": JSON.stringify(process.env)}),
    ]
};