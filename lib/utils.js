/**
 * @date 2017-03-10
 * @file utils.js
 * @desc 插件集
 * @author Cinchen
 */

const chalk = require('chalk')

exports.warn = msg => console.error(chalk.red(`[webpack-proxy-plugin] ${msg}`))

exports.info = info => console.log(chalk.green(`[webpack-proxy-plugin] ${info}`))

exports.tip = tip => console.log(chalk.yellow(`[webpack-proxy-plugin] ${tip}`))

exports.isEmptyObject = (obj) => {
  for (let name in obj) {
    return false
  }

  return true
}
