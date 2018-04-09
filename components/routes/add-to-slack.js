var debug = require('debug')('botkit:incoming_webhooks');

module.exports = function(webserver, controller) {

    webserver.get('/slack/add', function(req, res){
      res.render('index', {
        domain: req.get('host'),
        protocol: req.protocol,
        glitch_domain:  process.env.PROJECT_DOMAIN,
        layout: 'layouts/default'
      });
    })

}
