var mysql = require('mysql');

exports.database = mysql.createConnection({
              user: 'root',
              password: 'ThisIsSAAMComo!',
              host: 'sword.academy',
              database: 'Sql1001475_3'
            })
