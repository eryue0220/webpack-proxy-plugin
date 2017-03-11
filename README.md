# # webpack-proxy-plugin


-------------------------

### Introduction
The local proxy server for [webpack](http://webpack.js.org/) and [node.js](http://nodejs.org/), which can match the online files to the local. For better develop.

### Installation
```bash
$ npm install webpack-proxy-plugin --save-dev
```

### Usage
Just add the plugin to your webpack config as follows:

```javascript
// webpack.config.js
const WebpackProxyPlugin = require('webpack-proxy-plugin');
const proxyRules = require('./proxy-rules');

const webpackConfig = {
	entry: {
		// code
	},
	output: {
		// code
	},
	plugins: [
		new WebpackProxyPlugin(proxyRules)
	]
}
```

```javascript
// proxy-rules.js
module.exports = {
	'xxx.xxx.com': {
	    // sdk prject name
	    project: 'sdk_name',
	    // the file after compile which can `console.log`
	    develop_path:`${__dirname}/dist/develop`,
	    // the file after compile which has been compress and drop console
	    production_path: `${__dirname}/dist/production`,
	    // sdk url path: only support regexp
	    url: /\/sdk\/sdk\.js/,
	    // true will read the file where in develop path, instead
	    // will read file through production_path
	    debugMode: true,
	    callback: function() {}
	}
}
```

### License
MIT
 