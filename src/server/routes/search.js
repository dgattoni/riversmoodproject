'use strict';

const meta = require('../content/meta.js');
const maipo = require('../data/maipo.json');
const yarra = require('../data/yarra.json');
let data;

module.exports = function(app) {
  app.get('/search/:river', (req, res) => {
    switch (req.params.river) {
      case 'maipo':
        data = maipo;
      break;
      case 'yarra':
        data = yarra;
      break;
      case 'mapocho':
        data = mapocho;
      break;
      default:
        data = maipo;
      break;
    }

    res.render('home/river', {
      page: 'river',
      meta: meta('home'),
      data: data[0] || []
    });
  });
};
