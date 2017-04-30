'use strict';

const meta = require('../content/meta.js');
const maipo = require('../data/maipo.json');
const yarra = require('../data/yarra.json');
const moment = require('moment');
let data;
let location;
module.exports = function(app) {
  app.get('/search', (req, res) => {
    console.log('req.query.river', req.query.river);
    switch (req.query.river) {
      case 'maipo':
        data = maipo;
        location='080W030S';
      break;
      case 'yarra':
        data = yarra;
        location='140E030S';
      break;
      default:
        data = maipo;
        location='080W030S';
      break;
    }

    const augmentedData = data.slice();

    augmentedData.forEach(card => {
      let dayOfYear = moment(card.date).dayOfYear();
      let year = moment(card.date).year();
      let floodmap = `https://floodmap.modaps.eosdis.nasa.gov/getTile.php?location=${location}&day=${dayOfYear}&year=${year}&product=3`;
      Object.assign(card, {floodmap: floodmap});
    });

    res.render('home/timeline', {
      page: 'timeline',
      meta: meta('home'),
      cards: augmentedData || [],
      riverName: req.query.river || 'maipo'
    });
  });
};
