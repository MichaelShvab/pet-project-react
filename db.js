const mysql = require('mysql');

export let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'adoption_db',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    port:'3306'
})

connection.connect()