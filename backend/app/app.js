const express = require('express');

const bodyParser = require('body-parser');

const passport = require('passport');

const winston = require('winston');
const morgan = require('morgan');

const appConfig = require('./config/app')[process.env.NODE_ENV || 'dev'];
const webConfig = require('./config/web')[process.env.NODE_ENV || 'dev'];

winston.level = appConfig.APP_LOG_LEVEL;

// DB Setup
require('./app.db')("mongo");

// Passport setup
require('./app.passport')(passport);

const app = express();
app.use(bodyParser.json());
app.use(morgan(webConfig.HTTP_LOGGER_FORMAT));
app.use(passport.initialize());

// Routes setup
require('./app.routes')(app);


module.exports = app;
