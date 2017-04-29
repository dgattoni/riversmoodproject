'use strict';

const path = require('path');
const pkg = require('../package.json');
const port = process.env.PORT || 3000;

module.exports = function(defaults) {
  let config = {
    env: 'production',
    port: port,
    version: pkg.version,
    viewsPath: path.resolve(__dirname, '../dist/client/pug'),
    staticPath: path.resolve(__dirname, '../dist/client'),
    faviconPath: path.resolve(__dirname, '../dist/client/img/icons/favicon.ico')
  };

  return Object.assign({}, config, defaults);
};
