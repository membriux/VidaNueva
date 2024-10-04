var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();


var http = require('http');
var https = require('https');
var fs = require('fs')

// ––––– App
var app = express();
const Parse = require('parse/node');

Parse.initialize(process.env.APP_ID, process.env.JAVASCRIPT_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';



// ––––– Routers ––––––
var indexRouter = require('./routes/index');
var familiaRouter = require('./routes/familia');
const { hostname } = require('os');
var blogRouter = require('./routes/blogs.js');  // Manuel was here - blog router



// ––––– view engine setup
let paths = [
  path.join(__dirname, '/views'), 
  path.join(__dirname, '/views/familia/')
]

app.set('views', paths);
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// ––––– Routes –––––
app.use('/', indexRouter);
app.use('/', familiaRouter);
app.use('/blog', blogRouter);  // Manuel was here - blog router


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || 3000)

console.log('Running in http://localhost:3000')


module.exports = app;
