var mysql = require('mysql');

var database = mysql.createPool({
              connectionLimit : 10,
              user: 'root',
              password: 'ThisIsSAAMComo!',
              host: '52.187.131.185',
              database: 'Sql1001475_3'
            })

module.exports = database
