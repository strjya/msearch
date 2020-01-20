var mysql = require('mysql');

var database = mysql.createPool({
              connectionLimit : 10,
              user: 'b2cbe34878ab9d',
              password: 'bdf8ad88',
              host: 'eu-cdbr-west-02.cleardb.net',
              database: 'heroku_6f79a61f820c4b8'
            })

module.exports = database
