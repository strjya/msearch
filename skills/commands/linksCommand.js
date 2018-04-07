var mysql = require('mysql');

module.exports = (bot, message) => {
    var connection = mysql.createConnection({
                  user: 'root',
                  password: 'ThisIsSAAMComo!',
                  host: 'sword.academy',
                  database: 'Sql1001475_3'
                })
      // connect to your database
      connection.connect();
      connection.query("SELECT status, course FROM people WHERE slackid = '"+message.user+"'", function(error, results) {
        bot.replyPrivateDelayed(message,"vjvjfj")
        /*if (results.length > 0) {
          if (results[0].status !== 'Fallen' && results[0].status !== 'Rifiutato' && results[0].course === 'Adulti') {
            auth = results[0].status
            key = generateKey();
            connection.query("UPDATE people SET accesskey = '"+key+"' , expiration = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE slackid = "+message.user);
          } else
            auth = false;
        }
        else auth = false;
        var response = createMessage(auth, key);
        bot.replyPrivateDelayed(message,response)*/
      })
      connection.end();


}
