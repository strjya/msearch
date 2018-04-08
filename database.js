var mysql = require('mysql');

var database = mysql.createConnection({
              user: 'root',
              password: 'ThisIsSAAMComo!',
              host: 'sword.academy',
              database: 'Sql1001475_3'
            })

exports = database
