module.exports = function(controller) {

    controller.on('user_channel_join,user_group_join', function(bot, message) {
      if (message.channel === 'C1Z1AMHNZ')
        bot.reply(message, 'Welcome, <@' + message.user + '>');
    });

}
