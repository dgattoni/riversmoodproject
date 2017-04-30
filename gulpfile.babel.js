'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';
import data from 'gulp-data';

/** Get tasks */
import env from './gulp/env.js';
import clean from './gulp/clean.js';
import fonts from './gulp/fonts.js';
import images from './gulp/images.js';
import inject from './gulp/inject.js';
import lint from './gulp/lint.js';
import nodemon from './gulp/nodemon.js';
import scripts from './gulp/scripts.js';
import styles from './gulp/styles.js';
import watch from './gulp/watch.js';

/** Linting */

gulp.task('lint:scripts', lint.scripts);
gulp.task('lint:styles', lint.styles);
gulp.task('lint', done => {
  runSequence(['lint:scripts', 'lint:styles'], done);
});

/** Cleaning */

gulp.task('clean', clean);

/** Scripts */

gulp.task('scripts:client', scripts.client);
gulp.task('scripts:server', scripts.server);
gulp.task('scripts', done => {
  runSequence(['scripts:client', 'scripts:server'], done);
});

/** Styles */

gulp.task('styles', styles);

/** Assets */

gulp.task('fonts', fonts);
gulp.task('images', images);
gulp.task('assets', done => {
  runSequence(['fonts', 'images'], done);
});

gulp.task('data', function() {
  let dest = env.production ? 'dist/server/data' : '.tmp/server/data';
  return gulp.src('src/server/data/*.json')
    .pipe(data(function(file) {
      return file;
    }))
  .pipe(gulp.dest(dest));
});

/** Injecting */

gulp.task('inject', inject);

/** Building */

gulp.task('build', done => {
  runSequence('clean', ['scripts', 'styles', 'assets', 'data'], 'inject', done);
});

/** Watching */

gulp.task('watch:scripts', () => {
  watch.scripts(() => {
    runSequence('lint:scripts', 'scripts');
  });
});

gulp.task('watch:styles', () => {
  watch.styles(() => {
    runSequence('lint:styles', 'styles');
  });
});

gulp.task('watch:assets', () => {
  watch.assets(() => {
    runSequence('assets');
  });
});

gulp.task('watch:views', () => {
  watch.views(() => {
    runSequence('inject');
  });
});

gulp.task('watch', done => {
  runSequence(['watch:scripts', 'watch:styles', 'watch:assets', 'watch:views'], done);
});

/** Local serving */

gulp.task('nodemon', nodemon);
gulp.task('serve', done => {
  runSequence('build', 'watch', 'lint', 'nodemon', done);
});

/** Default */

gulp.task('default', ['build']);
