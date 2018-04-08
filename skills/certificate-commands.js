/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's `hears` handler functions.

In these examples, Botkit is configured to listen for certain phrases, and then
respond immediately with a single line response.

*/
var wordfilter = require('wordfilter')

module.exports = function(controller, database) {
    controller.hears(['certificat.'], 'direct_message,direct_mention', function(bot, message) {
        // connect to your database
        database.connect()
        database.query("SELECT certificate_expiration, name, realname, realsurname, status, clevel, slackid FROM people", function (err, results){
          var expired = '';
          var expiring = '';
          var okCounter = 0;
          var koCounter = 0;
          var sosoCounter = 0;
          var your = null
          var auth = true;
          for (k in results) {
          var expiration_date = new Date(results[k].certificate_expiration);
          // check now to speed up
          if (message.user === results[k].slackid) {
            your = new Date(results[k].certificate_expiration)
            if (results[k].clevel == 0) auth = false;
          }
          var now = new Date();
          var nowOneMonth = now.setMonth(now.getMonth()+1);
          now = new Date();

          if (results[k].status !== 'Fallen') {
            if (expiration_date.getTime() <= nowOneMonth &&
                expiration_date.getTime() >= now) {
              title = (results[k].name != null ? results[k].name : results[k].realname+' '+results[k].realsurname)
              expiring += title+", ";
              sosoCounter++;
            }
            else if (expiration_date.getTime() <= now) {
              title = (results[k].name != null ? results[k].name : results[k].realname+' '+results[k].realsurname)
              expired += title+", ";
              koCounter++;
            }
            else okCounter++;
          }
        }
          if (auth)
            attachments = [{title: "Scaduti: "+koCounter, color: '#990000', text: expired},
                            {title: "Scadono entro un mese: "+sosoCounter, color: '#FFFF00', text: expiring},
                            {title: "Validi: "+okCounter, color: '#00FF00'},
                            {color: '#000000', text: 'PS: il tuo certificato scade il '+your.getDate()+'/'+your.getMonth()+'/'+your.getYear()}];
          else
            attachments = [{color: '#000000', text: 'Il tuo certificato scade il '+your.getDate()+'/'+your.getMonth()+'/'+your.getYear()}]
          let response = createMessage(attachments);
          bot.reply(message, response)
          database.end();
        })



    });

  function createMessage(attachments) {
    let message = {
      text: "Ecco le informazioni sui certificti che avete richiesto.",
      attachments: attachments
    }
    return message;
  }

};
