
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
