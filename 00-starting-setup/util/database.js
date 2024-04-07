const mysql = require('mysql2')

const pool = mysql.createConnection({
    host:'localhost',
    user : 'root',
    database : 'nodejs_complete',
    password:'jagadeesh99'
})

module.exports = pool.promise();