var mysql      = require('mysql');
var config = require('./');

var connection = mysql.createConnection({
    host     : config.db.host,
    user     : config.db.username,
    password : config.db.password,
    database : config.db.dbname
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;