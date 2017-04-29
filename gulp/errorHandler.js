'use strict';

import gutil from 'gulp-util';

export default function(title) {
  return error => {
    gutil.log(gutil.colors.red(`[${title}]`), error.message.toString());
  };
}
