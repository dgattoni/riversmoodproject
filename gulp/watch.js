'use strict';

import {Gaze} from 'gaze';

function watchman(src, cb) {
  let gaze = new Gaze(src);

  gaze.on('ready', watcher => {
    watcher.on('all', cb);
  });
}

function scripts(cb) {
  watchman(['src/**/*.js'], cb);
}

function styles(cb) {
  watchman(['src/**/*.scss'], cb);
}

function assets(cb) {
  watchman(['src/images/**/*', 'src/fonts/**/*'], cb);
}

function views(cb) {
  watchman(['src/**/*.pug'], cb);
}

export default {scripts, styles, assets, views};
