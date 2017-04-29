'use strict';

module.exports = function(app, config) {
  app.set('config', config);
  app.set('view engine', 'pug');
  app.set('views', app.get('config').viewsPath);
  app.set('port', app.get('config').port);
};
