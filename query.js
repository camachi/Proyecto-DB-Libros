const connection = require('./connection');


// Función para obtener todos los profesores
function obtenerProfesores(callback) {
    const query = 'SELECT * FROM profesores';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error en la consulta:', error);
        callback(error, null);
      } else {
        callback(null, results);
      }
    });
  }
  module.exports = { obtenerProfesores };