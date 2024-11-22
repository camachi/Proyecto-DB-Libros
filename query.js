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

  function agregarProfesor(nombre, departamento, programa, callback) {
    const query = 'INSERT INTO profesores (nombre, departamento_academico, programa_academico) VALUES (?, ?, ?)';
    const values = [nombre, departamento, programa];
    
    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error al insertar el profesor:', error);
            callback(error, null);
        } else {
            console.log('Profesor agregado correctamente');
            callback(null, results);
        }
    });
}

function editarProfesor(id,nombre, departamento, programa, callback) {
  const query = 'UPDATE profesores SET nombre = ?, departamento_academico = ?, programa_academico = ? WHERE idprofesores = ?';
  const values = [nombre, departamento, programa, id];
  
  connection.query(query, values, (error, results) => {
      if (error) {
          console.error('Error al editar el profesor:', error);
          callback(error, null);
      } else {
          console.log('Profesor editado correctamente');
          callback(null, results);
      }
  });
}

function eliminarProfesor(profesorId, callback) {
  const sql = `DELETE FROM profesores WHERE idprofesores = ?`;
  connection.query(sql, [profesorId], (error, results) => {
      callback(error, results);
  });
}

  module.exports = { obtenerProfesores,agregarProfesor,editarProfesor,eliminarProfesor};