
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Configuración de la base de datos MySQL
const db = mysql.createConnection({
    host: 'mysqldb',
    user: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
    port: parseInt(process.env.MYSQLDB_DOCKER_PORT)
}); 


db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = db;