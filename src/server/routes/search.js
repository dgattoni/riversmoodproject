'use strict';

const meta = require('../content/meta.js');

module.exports = function(app) {
  app.get('/search/:river', (req, res) => {
    res.render('home/river', {
      page: 'river',
      meta: meta('home')
    });
  });
};
