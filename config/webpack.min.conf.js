/* eslint-disable */

const webpack = require('webpack')
const base = require('./webpack.base.conf')

const config = {
  ...base,
  output: {
    ...base.output,
    filename: 'mapkit-vue-min.js'
  },
  plugins: [
    ...base.plugins,
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
}

module.exports = config
