var mysql = require('mysql');

var database = mysql.createPool({
              connectionLimit : 10,
              user: 'stria@swordacademy-db',
              password: 'ThisIsSAAMComo!',
              host: 'swordacademy-db.mysql.database.azure.com',
              database: 'people'
            })

module.exports = database
