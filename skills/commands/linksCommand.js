var mysql = require('mysql');

module.exports = (bot, message) => {
    bot.replyPrivate(message, "Solo un momento...")
    bot.replyPrivateDelayed(message, "e due")
    }
