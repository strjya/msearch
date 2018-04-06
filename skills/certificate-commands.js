/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's `hears` handler functions.

In these examples, Botkit is configured to listen for certain phrases, and then
respond immediately with a single line response.

*/

var wordfilter = require('wordfilter');
module.exports = function(controller) {
    controller.hears(['certificat.'], 'direct_message,direct_mention', function(bot, message) {
      let attachments = getData(userID);
      let response = createMessage(attachments);
      bot.reply(message, response)
    });

  function getData(userID) {
    var connection = Jdbc.getConnection("jdbc:mysql://sword.academy:3306/Sql1001475_3", "root", "ThisIsSAAMComo!");
    var SQLstatement = connection.createStatement();
    result = SQLstatement.executeQuery("SELECT certificate_expiration, name, realname, realsurname, status, clevel, slackid FROM people");
    var expired = '';
    var expiring = '';
    var okCounter = 0;
    var koCounter = 0;
    var sosoCounter = 0;
    var auth = true;
    while (result.next() && auth) {

      var expiration_date = new Date(result.getString(1));
      var name = result.getString(2);
      var realname = result.getString(3);
      var realsurname = result.getString(4);
      var status = result.getString(5);
      var clevel = result.getString(6);
      var slackid = result.getString(7);
      // check now to speed up
      if (userID === slackid && clevel == 0) auth = false;
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
  }

  function createMessage(attachments) {
    let message = {
      link_names: true,
      response_type: 'ephemeral',
      attachments: attachments
    }
    return message;
  }

};
