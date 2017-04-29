'use strict';

module.exports = (function(env) {
  // Edit these!
  let appName = 'The River`s Mood Project';
  let appShortDescription = 'The River`s mood project for space apps challenge 2017 by NASA';
  let appLongDescription = 'The River`s mood project for space apps challenge 2017 by NASA!';

  let defaults = {
    'appName': (function() {
      if (process.env.NODE_ENV === 'development') {
        return `Development - ${appName}`;
      } else if (process.env.NODE_ENV === 'staging') {
        return `Staging - ${appName}`;
      } else {
        return appName;
      }
    })(),
    'appShortDescription': appShortDescription,
    'appLongDescription': appLongDescription
  };

  return require(`./${env}.js`)(defaults);
})(process.env.NODE_ENV || 'development');
