var mysql = require('mysql');

var database = mysql.createPool({
              connectionLimit : 10,
              user: 'stria@swordacademy-db',
              password: 'ThisIsSAAMComo!',
              host: 'swordacademy-db.mysql.database.azure.com',
              database: 'msearch'
            })

module.exports = database
