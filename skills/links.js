
module.exports = function(controller) {
  controller.on('/prova',function(bot,message) {

      // reply to slash command
      bot.replyPublic(message,'Everyone can see this part of the slash command');
      bot.replyPrivate(message,'Only the person who used the slash command can see this.');

  })
}
