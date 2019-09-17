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
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {     
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),   
  ]
}
