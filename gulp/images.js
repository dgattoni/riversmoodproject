'use strict';

import env from './env.js';
import errorHandler from './errorHandler.js';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';

export default function() {
  let src = 'src/client/img/**/*';
  let dest = env.production ? 'dist/client/img' : '.tmp/client/img';

  return gulp.src(src)
    .pipe(imagemin())
    .on('error', error => {
      errorHandler('Images error')(error);
      this.emit('end');
      if (env.production) process.exitCode = 1;
    })
    .pipe(gulp.dest(dest));
}
