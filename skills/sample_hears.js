/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's `hears` handler functions.

In these examples, Botkit is configured to listen for certain phrases, and then
respond immediately with a single line response.

*/

var wordfilter = require('wordfilter');

module.exports = function(controller) {

    /* Collect some very simple runtime stats for use in the uptime/debug command */
    var stats = {
        triggers: 0,
        convos: 0,
    }

    controller.on('heard_trigger', function() {
        stats.triggers++;
    });

    controller.on('conversationStarted', function() {
        stats.convos++;
    });


    controller.hears(['^uptime','^debug'], 'direct_message,direct_mention', function(bot, message) {

        bot.createConversation(message, function(err, convo) {
            if (!err) {
                convo.setVar('uptime', formatUptime(process.uptime()));
                convo.setVar('convos', stats.convos);
                convo.setVar('triggers', stats.triggers);

                convo.say('My main process has been online for {{vars.uptime}}. Since booting, I have heard {{vars.triggers}} triggers, and conducted {{vars.convos}} conversations.');
                convo.activate();
            }
        });

    });

    controller.hears(['^ciao(.*)','^buongiorn(.*)','^buon giorn(.*)','^buonaser(.*)','^buona ser(.*)','^ave (.*)', '^ave', '^ave!'], 'direct_message,direct_mention', function(bot, message) {
        let hours = new Date().getHours()
        if (hours < 3 || hours > 18)
          bot.reply(message,"Buonasera, Signore" )
        else
          bot.reply(message,"Buongiorno, Signore" )
    });

    controller.hears(['banca','bancari.','coordinate', 'iban', 'pagar', 'pagament' ], 'direct_message,direct_mention', function(bot, message) {
        let response = {
                          "text": "Ecco le informazioni relative al pagamento. Mi raccomando di seguire l'esempio di causale che vi ho allegato!",
                          "attachments": [
                            {
                              "title": "IBAN",
                              "text": "IT54Y0569651290000008398X43"
                              "color" : "#000000"
                            },
                            {
                              "title": "Causale",
                              "text": "Contributo per attività _nome cognome_ mesi di _mesi_"
                              "color" : "#990000"
                            }
                          ]
                        }
        bot.reply(message, response)

    controller.hears(['drive','google drive','cartella', 'cartelle', 'dispense', 'appunti' ], 'direct_message,direct_mention', function(bot, message) {
        let response = {
                          "text": "Qui trovate le cartelle condivise di tutti i corsi, che contengono dispense e appunti. Se cercate altri file condivisi, vi consiglio di provare dal vostro drive.",
                          "attachments": [
                            {
                              "color" : "#000000"
                              "actions": [
                                {
                                  "type": "button",
                                  "text": "Drive primo anno",
                                  "url": "https://drive.google.com/drive/folders/0B_Htmk-DaHJ2cDdCTkhubUZyNkk?usp=sharing"
                                },
                                {
                                  "type": "button",
                                  "text": "Drive corsi",
                                  "url": "https://drive.google.com/drive/folders/0B_Htmk-DaHJ2bXZjekpkQUh1NXM?usp=sharing"
                                },
                                {
                                  "type": "button",
                                  "text": "Drive",
                                  "url": "https://drive.sword.academy"
                                }
                              ]
                            }
                          ]
                        }
        bot.reply(message, response)

    controller.hears(['nada'], 'direct_message,direct_mention', function(bot, message) {
        let response = {
                          "text": "Ecco le informazioni relative al pagamento. Mi raccomando di seguire l'esempio di causale che vi ho allegato!",
                          "attachments": [
                            {
                              "title": "IBAN",
                              "text": "IT54Y0569651290000008398X43"
                              "color" : "#000000"
                            },
                            {
                              "title": "Causale",
                              "text": "Contributo per attività _nome cognome_ mesi di _mesi_"
                              "color" : "#990000"
                            }
                          ]
                        }
        bot.reply(message, response)

    controller.hears(['noh'], 'direct_message,direct_mention', function(bot, message) {
        let response = {
                          "text": "Ecco le informazioni relative al pagamento. Mi raccomando di seguire l'esempio di causale che vi ho allegato!",
                          "attachments": [
                            {
                              "title": "IBAN",
                              "text": "IT54Y0569651290000008398X43"
                              "color" : "#000000"
                            },
                            {
                              "title": "Causale",
                              "text": "Contributo per attività _nome cognome_ mesi di _mesi_"
                              "color" : "#990000"
                            }
                          ]
                        }
        bot.reply(message, response)
    });


    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* Utility function to format uptime */
    function formatUptime(uptime) {
        var unit = 'second';
        if (uptime > 60) {
            uptime = uptime / 60;
            unit = 'minute';
        }
        if (uptime > 60) {
            uptime = uptime / 60;
            unit = 'hour';
        }
        if (uptime != 1) {
            unit = unit + 's';
        }

        uptime = parseInt(uptime) + ' ' + unit;
        return uptime;
    }

};
