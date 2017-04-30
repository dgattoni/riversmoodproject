'use strict';

const meta = require('../content/meta.js');
const maipo = require('../data/maipo.json');
const yarra = require('../data/yarra.json');
const moment = require('moment');

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
      default:
        data = maipo;
      break;
    }

    const augmentedData = data.slice();

    augmentedData.forEach(card => {
      let dayOfYear = moment(card.date).dayOfYear();
      let year = moment(card.date).year();
      let floodmap = `https://floodmap.modaps.eosdis.nasa.gov/getTile.php?location=080W030S&day=${dayOfYear}&year=${year}&product=3`;
      Object.assign(card, {floodmap: floodmap});
    });

    res.render('home/timeline', {
      page: 'timeline',
      meta: meta('home'),
      cards: augmentedData || [],
      riverName: req.params.river
    });
  });
};
