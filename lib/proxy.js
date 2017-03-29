/**
 * @date 2017-03-10
 * @file proxy.js
 * @desc 代理
 * @author Cinchen
 */

const chalk = require('chalk')
const dns = require('dns')
const fs = require('fs')
const http = require('http')
const path = require('path')
const url = require('url')
const utils = require('./utils')

// defend the proxy start repeat
let started = false

function doRequest(request, response, address, port) {
  const options = {
    headers: request.headers,
    hostname: address,
    port: port,
    method: request.method,
    path: request.url
  }

  const req = http.request(options, res => {
    response.writeHead(res.statusCode, res.headers)
    res.pipe(response)
  })

  req.on('error', err => {
    response.writeHead(500, {'Content-Type': 'text/plain'})
    response.write(`Request URL: ${request.url}`)
    response.end(`\nBad Host Error: ${err.message}`)
  })

  request.pipe(req)
}

function goOnline(request, response) {
  const hp = (request.headers.host || '').split(':')
  const host = hp[0]

  dns.resolve4(host, (err, addresses) => {
    if (err) {
      response.writeHead(404, {'Content-Type': 'text/plain'})
      response.write(`Request URL: ${request.url}`)
      response.end(`\nBad Host Error: ${err.message}`)
    }

    doRequest(request, response, addresses[0], hp[1] || request.port)
  })
}

function readLocalFiles(request, response, rule, project) {
  const filePath = path.join(process.cwd(), rule.debug ? rule.develop : rule.production)

  if (!fs.statSync(filePath)) {
    utils.warn(`The path ${filePath} doesn't exit. Please check your path again.`)
    return;
  }

  response.writeHead(200, {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/javascript'
  })

  const js = fs.readFileSync(path.join(filePath, `${project}.js`))
  response.write(js)
  response.end()

  typeof callback === 'function' && callback()
}

function transmit(request, response, rule, project) {
  if (!rule) {
    utils.tip(`Oops. The ${project}.js match miss. Transmit online.`)
    goOnline(request, response)
  } else {
    utils.info(`${project} will proxy on local file.`)
    readLocalFiles(request, response, rule, project)
  }

}

function getSDKURL(request, response, rules) {
  const URL_REG = /\/(\w+)\.js/

  if (URL_REG.test(request.url)) {
    transmit(request, response, rules[RegExp.$1], RegExp.$1)
  }
}

function createProxy(rules) {
  const port = rules.port || 80

  http.createServer((request, response) => {
    request.type = 'http'
    request.port = port
    getSDKURL(request, response, rules)
  }).listen(port, () => utils.info(`Server running on ${port}.`))
}

process.on('uncaughtException', err => {
  if (err.code === 'EACCES') {
    utils.warn(`${err.message}. \nPlease use "sudo" or check if you are root. \n`)
    process.exit(1)
  }

  utils.warn(`${err.message}. \n`)
})

createProxy(require('../example/proxy-rules'))

module.exports = {
  run(rules) {
    if (started) return
    started = true
    createProxy(rules)
  }
}
