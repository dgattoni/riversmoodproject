'use strict';

const path = require('path');
const pkg = require('../package.json');
const port = process.env.PORT || 3000;

module.exports = function(defaults) {
  let config = {
    env: 'development',
    port: port,
    version: pkg.version,
    viewsPath: path.resolve(__dirname, '../.tmp/client/pug'),
    staticPath: path.resolve(__dirname, '../.tmp/client'),
    faviconPath: path.resolve(__dirname, '../.tmp/client/img/icons/favicon.ico')
  };

  return Object.assign({}, config, defaults);
};
