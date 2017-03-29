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
	'project_name': {
	    // The file after compile which can `console.log`. In most time,
	    // it equals the output path.
	    develop:`/dist/develop/`,
	    // The file after compile which has been compress and drop console.
	    // And the others are same with `develop` options.
	    production: `/dist/production/`,
	    // True will read the file where in develop path, instead
	    // will read file through production path.
	    debug: true
	}
}
```

### License
MIT
 