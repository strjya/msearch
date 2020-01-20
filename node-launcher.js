var env = require('node-env-file');
env(__dirname + '/.env');

// Set up an Express-powered webserver to expose oauth and webhook endpoints
var webserver = require(__dirname + '/components/express_webserver.js')();
