'use strict';

import env from './env.js';
import errorHandler from './errorHandler.js';
import fs from 'fs-extra';

export default function(done) {
  let src = 'src/client/fonts';
  let dest = env.production ? 'dist/client/fonts' : '.tmp/client/fonts';

  fs.copy(src, dest, error => {
    if (error && error.code !== 'ENOENT') {
      errorHandler('Fonts error')(error);
      if (env.production) process.exitCode = 1;
    } else {
      done();
    }
  });
}
