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
          bot.reply(message,"Buonasera, <@"+message.user+">" )
        else
          bot.reply(message,"Buongiorno, <@"+message.user+">" )
    });

    controller.hears(['banca','bancari.','coordinate', 'iban', 'pagar', 'pagament' ], 'direct_message,direct_mention', function(bot, message) {
        let response = {
                          "text": "Ecco le informazioni relative al pagamento. Mi raccomando di seguire l'esempio di causale che vi ho allegato!",
                          "attachments": [
                            {
                              "title": "IBAN",
                              "text": "IT54Y0569651290000008398X43",
                              "color" : "#000000"
                            },
                            {
                              "title": "Causale",
                              "text": "Contributo per attività _nome cognome_ mesi di _mesi_",
                              "color" : "#990000"
                            }
                          ]
                        }
        bot.reply(message, response)
    });

    controller.hears(['drive','google drive','cartella', 'cartelle', 'dispense', 'appunti' ], 'direct_message,direct_mention', function(bot, message) {
        let response = {
                          "text": "Qui trovate le cartelle condivise di tutti i corsi, che contengono dispense e appunti. Se cercate altri file condivisi, vi consiglio di provare dal vostro drive.",
                          "attachments": [
                            {
                              "fallback": "Chiedo venia, @stria, qualcosa è andato storto.",
                              "color" : "#000000",
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
    });

    controller.hears(['verbal.', 'statuto', 'regolament.'], 'direct_message,direct_mention', function(bot, message) {
        let response = {
                          "text": "Ecco i documenti della Sword Academy. Il vostro interesse nell'associazione è encomiabile!",
                          "attachments": [
                            {
                              "fallback": "Chiedo venia, @stria, qualcosa è andato storto.",
                              "color" : "#000000",
                              "actions": [
                                {
                                  "type": "button",
                                  "text": "Regolamenti",
                                  "url": "https://drive.google.com/drive/folders/1yz3kOkPFaOXe6G0PjYI5hqY72mJ2yiHt?usp=sharing"
                                },
                                {
                                  "type": "button",
                                  "text": "Verbali",
                                  "url": "https://drive.google.com/drive/folders/1L8Lk8gopn-IFRoeBo1nYijxYfEJphnGF?usp=sharing"
                                },
                                {
                                  "type": "button",
                                  "text": "Statuto",
                                  "url": "https://drive.google.com/file/d/0B_Htmk-DaHJ2VFM0V1B0QzJvOFE/view"
                                }
                              ]
                        }
                      ]}
        bot.reply(message, response)
  });
    controller.hears(['foto', 'album'], 'direct_message,direct_mention', function(bot, message) {
        let response = {
                          "text": "Qui trovate tutte le foto di sala. Ah, quanti bei ricordi!",
                          "attachments": [
                            {
                              "fallback": "Chiedo venia, @stria, qualcosa è andato storto.",
                              "color" : "#000000",
                              "actions": [
                                {
                                  "type": "button",
                                  "text": "Foto",
                                  "url": "https://photos.google.com/share/AF1QipMDdkJ2tDR3_5ZydEcxWnrPZDjbtiMVsN9HMyma7Nm7LWHvq9SmqjF6MVYeQvg3FA?key=bVdqZ2lvQmZYa3VoZlV5OUlqVDl3djY1LWVwMW5n"
                                }
                              ]
                        } ] }
        bot.reply(message, response)
    });

    controller.hears(['calendario', 'eventi'], 'direct_message,direct_mention', function(bot, message) {
        let response = {
                          "text": "Da qui potete accedere al calendario dell'Accademia. Non dimenticate che potete trovare informazioni sugli eventi su #eventi.",
                          "attachments": [
                            {
                              "fallback": "Chiedo venia, @stria, qualcosa è andato storto.",
                              "color" : "#000000",
                              "actions": [
                                {
                                  "type": "button",
                                  "text": "Calendario",
                                  "url": "https://calendar.sword.academy"
                                }
                              ]
                        } ]
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
