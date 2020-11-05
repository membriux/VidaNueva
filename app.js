var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var http = require('http');
var https = require('https');
var fs = require('fs')

// ––––– App
var app = express();

// ––––– HTTPS server
let httpPort = 80
let httpsPort = 443
let hostName = 'church.memo-test.club'

let httpsOptions = {
    cert: fs.readFileSync('./ssl/server.crt', 'utf8'),
    ca: fs.readFileSync('./ssl/server.ca-bundle', 'utf8'),
    key: fs.readFileSync('./ssl/server.key', 'utf8')
  }

const httpServer = http.createServer(app)
const httpsServer = https.createServer(httpsOptions, app);

// redirect http -> https
app.use((req, res, next) => {
  if(req.protocol === 'http') {
    res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
});


// ––––– Routers ––––––
var indexRouter = require('./routes/index');
var familiaRouter = require('./routes/familia');
const { hostname } = require('os');

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

// app.all('*', function(req, res) {
//   res.redirect(301, `https://${req.headers.host}${req.url}`)
// });


httpServer.listen(httpPort)
httpsServer.listen(httpsPort)

console.log('Running on http://localhost')


module.exports = app;
