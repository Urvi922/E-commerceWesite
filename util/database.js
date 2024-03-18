const mysql = require('mysql2');



const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejs',
    password: 'MYSQLl0g!n'
})


module.exports = pool.promise();
