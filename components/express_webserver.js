var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var querystring = require('querystring');
var debug = require('debug')('botkit:webserver');
var http = require('http');
var hbs = require('express-hbs');

var apiRouter = require('../msearch/api');
var msearchRouter = require('../msearch/router')

module.exports = function() {

    var webserver = express();
    webserver.use(cookieParser());
    webserver.use(bodyParser.json());
    webserver.use(bodyParser.urlencoded({ extended: true }));
    webserver.use('/',express.static(require("path").join(__dirname, '../public/')));

    var server = http.createServer(webserver);
    server.listen(process.env.PORT || 3000, null, function() {
        console.log('Express webserver configured and listening at http://localhost:' + (process.env.PORT || 3000));

    });

    webserver.use('/', msearchRouter);
    webserver.use('/api', apiRouter);

    return webserver;

}
