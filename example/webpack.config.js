
const path = require('path')
const webpack = require('webpack')
const WebpackProxyPlugin = require('../')
const proxyRules = require('./proxy-rules')

module.exports = {
  entry: {
    report_sdk: path.join(__dirname, './report_sdk.js')
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist/develop`
  },
  cache: true,
  watch: true,
  target: 'web',
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new WebpackProxyPlugin(proxyRules)
  ]
}