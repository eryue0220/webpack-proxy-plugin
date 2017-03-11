/**
 * @date 2017-03-10
 * @file index.js
 * @desc webpack-proxy-plugin/index.js
 * @author Cinchen
 */

const chalk = require('chalk')
const proxy = require('./proxy')
const utils = require('./utils')
const pkg = require('../package.json')

function ProxyPlugin(options = {}) {
  this.version = pkg.version
  this.options = options
}

ProxyPlugin.prototype = {
  constructor: ProxyPlugin,
  apply(compile) {
    if (compile.options.target !== 'web') {
      utils.warn('webpack congfig `target` should be "web".')
    }

    if (!this.options) {
      utils.warn(`The arguments is undefined .`)
      return
    }

    if (utils.isEmptyObject(this.options)) {
      utils.warn('The arguments is empty object.')
      return
    }

    compile.plugin('done', (compilation, callback) => {
      proxy.run(this.options)
      typeof callback === 'function' && callback()
    })
  }
}

module.exports = ProxyPlugin
