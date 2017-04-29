'use strict';

import nodemon from 'gulp-nodemon';

export default function(done) {
  let started = false;

  return nodemon({
    script: '.tmp/server/index.js'
  }).on('start', () => {
    if (!started) {
      started = true;
      done();
    }
  });
}
