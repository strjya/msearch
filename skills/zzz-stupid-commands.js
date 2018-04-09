/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's `hears` handler functions.

In these examples, Botkit is configured to listen for certain phrases, and then
respond immediately with a single line response.

*/

var wordfilter = require('wordfilter');

module.exports = function(controller) {


    controller.hears(['tass.'], 'direct_message,direct_mention,mention', function(bot, message) {
          bot.reply(message,"Ammiro il vostro ardimento, ma se permettete io preferirei che colui-che-non-dev'essere-nominato restasse tale")
    });

    controller.hears(['colp.', 'dritto', 'fendente', 'roverso'], 'direct_message,direct_mention,mention', function(bot, message) {
        bot.reply(message, "Ah, perdonate ma io non son certo un Maestro dell'Arte della spada. Tuttavia, <@Stria> mi ha insengato che non esiste che un colpo soltanto: il Tramazzone. E se non uccide il tuo nemico, è solo perché non l'hai tirato forte abbastanza.")
    });

    controller.hears(['punta', 'stoccata', 'imbroccata'], 'direct_message,direct_mention,mention', function(bot, message) {
        bot.reply(message, "Suppongo che anche le punte funzionino. Dopotutto, è difficile fare un tramazzone con una lancia...")
    });

    controller.hears(['Avalanche', 'Gabriele', 'vice presidente', 'vice', 'Lanche', 'Vitto', 'third lady'], 'direct_message,direct_mention,mention', function(bot, message) {
        bot.reply(message, "Fossi in voi chiederei direttamente ad <@Avalanche>. Non vorrei trovare pezzi di me stesso sparsi per tutta la palestra.")
    });

    controller.hears(['Federico', 'Stria', 'first lady', 'regina', 'presidente'], 'direct_message,direct_mention,mention', function(bot, message) {
        bot.reply(message, "Mi dispiace <@"+message.user+">, non disponete del livello di autorizzazione necessario ad accedere ad informazioni classificate. E sì, temo che tutte le informazioni su <@stria> sono classificate. Si sono classificate da sole per paura di quello che sarebbe successo se l'informazione sbagliata fosse diventata di dominiio pubblico...")
    });

    controller.hears(['Betty', 'Betta', 'summerchild', 'second lady'], 'direct_message,direct_mention,mention', function(bot, message) {
        bot.reply(message, "Mi dispiace <@"+message.user+">, <@stria> ha classificato la maggior parte delle informazioni su <@summerchild>. Ma di sicuro deve avere qualche dote nascosta, se è riuscita ad arrivare così in alto!")
    });

    controller.hears(['Dancer', 'tesoriere'], 'direct_message,direct_mention,mention', function(bot, message) {
        bot.reply(message, "Si dice appartenga a un'antica scuola di spadaccini. Qualcosa a che fare con l'acqua e con un feticismo per le spade di legno!")
    });

    controller.hears(['Gunther'], 'direct_message,direct_mention,mention', function(bot, message) {
        bot.reply(message, "Penso che l'immagine parli da sé: http://www.wallpapers4u.org/wp-content/uploads/gunther_girl_glasses_tie_smile_5087_1920x1080.jpg")
    });

    controller.hears(['Marozzo'], 'direct_message,direct_mention,mention', function(bot, message) {
        bot.reply(message, "Intendete il nobile Maestro, o quel branco di sbandati guidati da mentecatti?")
    });

    controller.hears(['(.*)'], 'direct_message,direct_mention,mention', function(bot, message) {
        bot.reply(message, "Chiedo venia, <@"+message.user+">, temo che <@stria> non mi abbia ancora reso in grado di comprendere questa richiesta.")
    });

};
