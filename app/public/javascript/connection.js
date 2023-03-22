const mysql = require('mysql');
require('dotenv').config();
var connection;

connection = mysql.createConnection({
    host: process.env.URL,
    user: process.env.USER,
    password: process.env.PASSWORD,  // your password
    database: process.env.DATABASE,
    port: 3306
});

module.exports = connection;