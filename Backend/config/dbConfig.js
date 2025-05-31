const mysql = require('mysql2');

require('dotenv').config(); //importacion de las variables globales


const connection = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name
});

connection.connect(err => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conexión a MySQL exitosa');
});

module.exports = connection;