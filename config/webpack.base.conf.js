/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const package = require('../package.json')
const projectRoot = path.resolve(__dirname, '../')

const banner = [
  `mapkit-vue v${package.version}`,
  `(c) ${(new Date().getFullYear())} ${package.author}`,
  package.homepage
].join('\n')

module.exports = {
  entry: './src/',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'mapkit-vue.js',
    library: 'MapkitVue',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/,
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel'
    }
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ]
}
