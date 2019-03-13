var webpack = require('webpack')
var path = require('path')
var paths = require('./paths')

module.exports = {
  entry: [
    require.resolve('whatwg-fetch'),
    './src/bee.js'
  ],
  output: {
    path:  path.join(process.cwd(), 'dist'),
    filename: 'index.js',
    library: 'Bee',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader?presets[]=env'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
  ]
}
