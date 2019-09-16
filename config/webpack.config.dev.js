var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var paths = require('./paths')

module.exports = {
  entry: [
    require.resolve('whatwg-fetch'),
    './src/integration.js'
  ],
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimize: false,
  },
  module: { 
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.integrationHtml,
    }),
  ]
}
