var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// ––––– App
var app = express();
// –––– Env Configs
require('dotenv').config()

// ––––– Routers ––––––
var indexRouter = require('./routes/index');
var familiaRouter = require('./routes/familia');
const { hostname } = require('os');

// ––––– view engine setup
app.set('views', [
    path.join(__dirname, '/views'),
    path.join(__dirname, '/views/familia/')
]);
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// ––––– Routes –––––
app.use('/', indexRouter);
app.use('/', familiaRouter);

// –––– Static Files Cache Age for specific directories ––––
app.use('/js', express.static(path.join(__dirname, 'public', 'js'), {
    maxAge: '1d' // 1 days for JavaScript files
}));

app.use('/css', express.static(path.join(__dirname, 'public', 'css'), {
    maxAge: '1d' // 1 days for CSS files
}));

app.use('/img', express.static(path.join(__dirname, 'public', 'img'), {
    maxAge: '7d' // 7 days for iamge files
}));

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
