'use strict';

const bodyParser = require('body-parser');
const compress = require('compression');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const methodOverride = require('method-override');
const morgan = require('morgan');

module.exports = function(app) {
  if (app.get('config').env === 'development') app.locals.pretty = true;

  app.use(express.static(app.get('config').staticPath));
  app.use(favicon(app.get('config').faviconPath));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(process.env.NODE_ENV === 'production' ? morgan('combined') : morgan('dev'));
  app.use(methodOverride());
  app.use(compress());
  app.use(helmet.frameguard('deny'));
};
