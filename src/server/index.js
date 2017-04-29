'use strict';

if (process.env.NODE_ENV === 'development') require('dotenv').config();
if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') require('newrelic');

const express = require('express');
const config = require('../../config/index.js');
const app = express();

require('./settings/index.js')(app, config);
require('./middleware/index.js')(app);
require('./routes/index.js')(app);
require('./routes/search.js')(app);
require('./routes/error.js')(app);

app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});
