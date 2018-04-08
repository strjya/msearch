
module.exports = function(controller, database) {
  controller.on('slash_command',function(bot,message) {
      switch (message.command) {
        default:
          bot.replyPrivate(message,'Chiedo venia, sembra che questo comando esuli dalle mie capacità attuali')

      }
      // reply to slash command

  })
}
