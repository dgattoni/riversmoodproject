'use strict';

const meta = require('../content/meta.js');

module.exports = function(app) {
  app.get('/', (req, res) => {
    res.render('home/index', {
      page: 'home',
      meta: meta('home')
    });
  });
};
