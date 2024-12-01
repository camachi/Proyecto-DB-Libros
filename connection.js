require('dotenv').config({ path: __dirname + '/.env' });
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


connection.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.stack);
    return;
  }
  console.log('Conexion exitosa');
});


module.exports = connection;
