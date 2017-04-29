'use strict';

module.exports = function() {
  let count = 0;

  return {read, increment, decrement};

  function read() {
    return count;
  }

  function increment() {
    return ++count;
  }

  function decrement() {
    return --count;
  }
};
