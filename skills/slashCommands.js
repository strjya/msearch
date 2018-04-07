var links = require('./commands/linksCommand');

module.exports = function(controller) {
  controller.on('slash_command',function(bot,message) {
      switch (message.command) {
        case '/prova':
          bot.replyPrivate(message, "Solo un momento...")
          links(bot, message)
          break
        default:
          bot.replyPrivate(message,'Chiedo venia, sembra che questo comando esuli dalle mie capacità attuali')

      }
      // reply to slash command

  })
}
