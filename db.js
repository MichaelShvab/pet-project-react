const mysql = require('mysql');

export let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'adoption_db',
    timezone: 'utc',
    port:'3306'
})

connection.connect()