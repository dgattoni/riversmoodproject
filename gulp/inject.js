'use strict';

import env from './env.js';
import inject from 'gulp-inject';
import gulp from 'gulp';

export default function() {
  let src = 'src/client/pug/**/*.*';
  let dest = env.production ? 'dist/client/pug' : '.tmp/client/pug';

  let ignorePath = env.production ? 'dist/client' : '.tmp/client';

  let stylesheets = {
    'style.css': env.production ? 'dist/client/css/style-*.css' : '.tmp/client/css/style.css'
  };

  let scripts = {
    'main.js': env.production ? 'dist/client/js/main-*.js' : '.tmp/client/js/main.js'
  };

  // TODO: Programatically inject these sources from an array. The reason is
  // that if we ever wanted to add another css or js bundle, we would need to
  // update the task below.
  return gulp.src(src)
    .pipe(inject(gulp.src(stylesheets['style.css'], {read: false}), {
      ignorePath,
      name: 'style'
    }))
    .pipe(inject(gulp.src(scripts['main.js'], {read: false}), {
      ignorePath,
      name: 'main'
    }))
    .pipe(gulp.dest(dest));
}
