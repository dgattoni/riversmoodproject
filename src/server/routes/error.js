'use strict';

module.exports = function(app) {
  app.use((req, res, next) => {
    var err = new Error('The page you are looking for cannot be found.');
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    console.error('url: %s, stack: %s', req.url, err.stack);
    next(err);
  });

  if (process.env.NODE_ENV !== 'production') {
    console.log('using dev/staging error handler');
    app.use((err, req, res, next) => { //eslint-disable-line
      const status = err.status || 500;
      res.status(status);
      res.render('errors/error', {
        error: err,
        status: status
      });
    });
  }

  app.use((err, req, res, next) => { //eslint-disable-line
    const status = err.status || 500;
    res.status(status);
    res.render('errors/error', {
      error: {},
      status: status
    });
  });
};
