// imports
const express = require('express');
var fs = require('fs');
const http = require('http');
const https = require('https');
const app = require('./app');

let hostName = 'church.memo-test.club'

// HTTPS server
let httpsPort = 443
let httpsOptions = {
    cert: fs.readFileSync('./ssl/server.crt', 'utf8'),
    ca: fs.readFileSync('./ssl/server.ca-bundle', 'utf8'),
    key: fs.readFileSync('./ssl/server.key', 'utf8')
  }
const httpsServer = https.createServer(httpsOptions, app);

// redirect HTTP server
let httpPort = 80
const httpApp = express();
httpApp.all('*', (req, res) => res.redirect(301, `https://${req.headers.host}${req.url}`));
const httpServer = http.createServer(httpApp);



// httpServer.listen(httpPort, hostName);
// httpsServer.listen(httpsPort, hostName);

// ––– Localhost run
httpServer.listen(httpPort);
httpsServer.listen(httpsPort);
console.log('Running on: http://localhost')