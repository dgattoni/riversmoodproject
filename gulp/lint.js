'use strict';

import eslint from 'gulp-eslint';
import gulp from 'gulp';

function scripts() {
  const src = [
    'gulpfile.babel.js',
    'gulp/**/*.js',
    'src/**/*.js'
  ];

  // TODO: Implement fail on error in production builds
  return gulp.src(src)
    .pipe(eslint())
    .pipe(eslint.format());
}

function styles(done) {
  // const src = ['src/**/*.styl'];
  // TODO: Implement style linting
  done();
}

export default {scripts, styles};
