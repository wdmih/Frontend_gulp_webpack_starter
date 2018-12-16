'use strict';
var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './app/js/src/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js)$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['@babel/preset-env']
      }
    }]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      // Options...
    }),
    new UglifyJsPlugin()
  ]
};