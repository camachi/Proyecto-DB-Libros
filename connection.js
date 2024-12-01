require('dotenv').config({ path: __dirname + '/.env' });
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306, 
});


connection.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
    process.exit(1); 
  } else {
    console.log('Conexión a la base de datos establecida exitosamente.');
  }
});


connection.on('error', (err) => {
  console.error('Error en la conexión a la base de datos:', err.message);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Intentando reconectar...');
   
    connection.connect((reconnectErr) => {
      if (reconnectErr) {
        console.error('Error al reconectar con la base de datos:', reconnectErr.message);
      } else {
        console.log('Reconexión exitosa.');
      }
    });
  } else {
    throw err;
  }
});


module.exports = connection;

