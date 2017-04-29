'use strict';

import babel from 'gulp-babel';
import babelify from 'babelify';
import browserify from 'browserify';
import env from './env.js';
import errorHandler from './errorHandler.js';
import es from 'event-stream';
import glob from 'glob';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import path from 'path';
import rev from 'gulp-rev';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import streamify from 'gulp-streamify';

// Client scripts need to be browserified as well as babelified in order to work
// in the browser environment.
function client(done) {
  let src = 'src/client/js/*.js';
  let dest = env.production ? 'dist/client/js' : '.tmp/client/js';

  return glob(src, (error, files) => {
    if (error) done(error);

    const tasks = files.map(file => {
      return browserify(file)
        .transform(babelify, {
          presets: [
            'es2015'
          ]
        })
        .bundle()
        .on('error', function(error) {
          errorHandler('JS Compile error')(error);
          this.emit('end');
          if (env.production) process.exitCode = 1;
        })
        .pipe(source(path.basename(file)))
        .pipe(streamify(sourcemaps.init()))
        .pipe(gulpif(env.production, streamify(rev())))
        .pipe(gulpif(env.production, streamify(uglify())))
        .pipe(streamify(sourcemaps.write('../maps')))
        .pipe(gulp.dest(dest));
    });

    es.merge(tasks).on('end', done);
  });
}

// Server scripts need only to be babelified, as they work with transpiled
// modules / imports / etc on the server.
function server() {
  let src = 'src/server/**/*.js';
  let dest = env.production ? 'dist/server' : '.tmp/server';

  return gulp.src(src)
    .pipe(babel({
      presets: [
        'es2015'
      ]
    }))
    .pipe(gulp.dest(dest));
}

export default {client, server};
