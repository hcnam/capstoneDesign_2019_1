const mysql = require('mysql');

var connection = mysql.createConnection({
    host : "192.168.55.192",
    port : 3306,
    user : "root",
    password : "N@mghcjf616",
    database : "MovieDB",
})

module.exports = connection;