// server/config/app.js

require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
const MongoStore = require('connect-mongo');

let mongoose = require('mongoose');
let DB = require('./db');

// Passport configuration
const passport = require('./passport');

// Routers
var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var AssignmentRouter = require('../routes/AssignmentDatabase');
var authRouter = require('../routes/auth');

var app = express();

// ----------------------
// MongoDB Connection
// ----------------------
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;

mongoDB.on('error', console.error.bind(console, 'Connection Error: '));
mongoDB.once('open', () => {
  console.log('Connected to MongoDB...');
});

// ----------------------
// View Engine Setup
// ----------------------
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// ----------------------
// Middleware
// ----------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// ----------------------
// Session Configuration
// ----------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change_this_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: DB.URI
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
  })
);

// ----------------------
// Passport Initialization
// ----------------------
app.use(passport.initialize());
app.use(passport.session());

// Expose user in all views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// ----------------------
// Routes  (MUST be BEFORE 404)
// ----------------------
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/applications', AssignmentRouter);

// ----------------------
// 404 Handler (AFTER routes)
// ----------------------
app.use(function (req, res, next) {
  next(createError(404));
});

// ----------------------
// Error Handler
// ----------------------
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { title: 'Error', message: err.message, error: err });
});

module.exports = app;
