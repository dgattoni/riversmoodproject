'use strict';

const production = !!process.argv.includes('--production');

export default {
  development: !production,
  production
};
