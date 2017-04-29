'use strict';

const config = require('../../../config/index.js');

module.exports = function(name) {
  const META_COLLECTION = {
    default: {
      title: `${config.appName} - ${config.appShortDescription}`,
      description: config.appLongDescription
    },
    home: {
      title: `${config.appName} - Welcome to The River's mood project`,
      description: config.appLongDescription
    }
  };

  return META_COLLECTION[name] || META_COLLECTION['default'];
};
