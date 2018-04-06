var mysql = require('mysql');

module.exports = (bot, message) => {
    bot.replyPrivate(message, "Solo un momento...")
    bot.replyPrivateDelayed(message, "e due")
    var connection = mysql.createConnection({
                  user: 'root',
                  password: 'ThisIsSAAMComo!',
                  server: 'sword.academy',
                  database: 'Sql1001475_3'
                })
      // connect to your database
      connection.connect()
      bot.replyPrivateDelayed(message, "connesso")
    }
