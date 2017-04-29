'use strict';

import env from './env.js';
import fs from 'fs-extra';
import errorHandler from './errorHandler.js';

function clean(dir) {
  return new Promise((resolve, reject) => {
    fs.remove(dir, err => {
      if (err) reject();

      resolve();
    });
  });
}

export default function(done) {
  Promise.all([clean('.tmp'), clean('dist')]).then(() => {
    done();
  }).catch(() => {
    errorHandler('Clean error')({
      message: 'Error cleaning'
    });
    if (env.production) process.exitCode = 1;
  });
}
