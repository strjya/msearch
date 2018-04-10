var debug = require('debug')('botkit:incoming_webhooks');
var path = require('path')

module.exports = function(webserver, controller) {

  webserver.get('/', function(req, res) {
    return res.sendFile(path.join(__dirname, '../../public/website', 'index.html'));  });

}
