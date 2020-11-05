var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// ––––– Routers ––––––
var indexRouter = require('./routes/index');
var familiaRouter = require('./routes/familia')

var app = express();

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

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on http://localhost:3000")
});

// set up a route to redirect http to https
app.get('*', function(req, res) {  
  res.redirect('https://' + req.headers.host + req.url);

  // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
  // res.redirect('https://example.com' + req.url);
});

module.exports = app;