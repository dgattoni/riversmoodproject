'use strict';

import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import env from './env.js';
import errorHandler from './errorHandler.js';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import postcss from 'gulp-postcss';
import rev from 'gulp-rev';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';

export default function() {
  let src = 'src/client/sass/*.scss';
  let dest = env.production ? 'dist/client/css' : '.tmp/client/css';
  let processors = env.production ? [autoprefixer(), cssnano()] : [autoprefixer()];

  return gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', function(error) {
      errorHandler('Sass error')(error);
      this.emit('end');
      if (env.production) process.exitCode = 1;
    })
    .pipe(postcss(processors))
    .pipe(gulpif(env.production, rev()))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(dest));
}
