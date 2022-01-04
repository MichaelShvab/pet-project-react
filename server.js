const express = require('express');
const mysql = require('mysql');

const app = express()
let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'adoption_db',
    port:'3306'
})

const port = process.env.PORT || 5000;
app.listen(port)

app.get('/profile', (req, res) => {res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' })
});

console.log(`App listening on port ${port}`);