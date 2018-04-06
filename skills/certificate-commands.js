/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's `hears` handler functions.

In these examples, Botkit is configured to listen for certain phrases, and then
respond immediately with a single line response.

*/
var mysql = require('mysql');
var wordfilter = require('wordfilter')

module.exports = function(controller) {
    controller.hears(['certificat.'], 'direct_message,direct_mention', function(bot, message) {
      let attachments = getData(message.user);
      let response = createMessage(attachments);
      bot.reply(message, response)
      var connection = mysql.createConnection({
                    user: 'root',
                    password: 'ThisIsSAAMComo!',
                    host: 'sword.academy',
                    database: 'Sql1001475_3'
                  })
        // connect to your database
        connection.connect()
        connection.query("SELECT certificate_expiration, name, realname, realsurname, status, clevel, slackid FROM people");
        var expired = '';
        var expiring = '';
        var okCounter = 0;
        var koCounter = 0;
        var sosoCounter = 0;
        var auth = true;
        while (result.next() && auth) {

          var expiration_date = new Date(result.getString(1));
          // check now to speed up
          if (message.user === slackid && clevel == 0) auth = false;
          var now = new Date();
          var nowOneMonth = now.setMonth(now.getMonth()+1);
          now = new Date();

          if (status !== 'Fallen') {
            if (expiration_date.getTime() <= nowOneMonth &&
                expiration_date.getTime() >= now) {
              title = (name != null ? name : realname+' '+realsurname)
              expiring += title+", ";
              sosoCounter++;
            }
            else if (expiration_date.getTime() <= now) {
              title = (name != null ? name : realname+' '+realsurname)
              expired += title+", ";
              koCounter++;
            }
            else okCounter++;
          }
        }
        SQLstatement.close();
        connection.close();
        if (auth)
          var attachments = [{title: "Scaduti: "+koCounter, color: '#990000', text: expired},{title: "Scadono entro un mese: "+sosoCounter, color: '#FFFF00', text: expiring}, {title: "Validi: "+okCounter, color: '#00FF00'}];
        else
          attachments = [{title: "Mi dispiace", color: '#777777', text: 'Non disponete del livello di autorizzazione necessario per poter avere queste informazioni.'}]
        return attachments;
    });

  function createMessage(attachments) {
    let message = {
      link_names: true,
      response_type: 'ephemeral',
      attachments: attachments
    }
    return message;
  }

};
