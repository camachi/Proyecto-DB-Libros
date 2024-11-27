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

  

function editarProfesor(id,nombre, departamento, callback) {
  const query = 'UPDATE profesores SET nombre = ?, departamento_academico = ? WHERE idprofesores = ?';
  const values = [nombre, departamento, id];
  
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

function agregarRecomendacion(autor, titulo, idProfesor, fecha, callback) {
  const sql = `
      INSERT INTO recomendaciones (autor, titulo, id_profesor, fecha)
      VALUES (?, ?, ?, ?)
  `;
  
  connection.query(sql, [autor, titulo, idProfesor, fecha], (error, result) => {
      if (error) {
          callback(error, null);
      } else {
          callback(null, result);
      }
  });
}

function obtenerRecomendaciones(callback) {
  const sql = `
      SELECT 
          r.id, 
          r.autor, 
          r.titulo, 
          r.fecha, 
          IFNULL(p.nombre, 'Profesor eliminado') AS profesor
      FROM 
          recomendaciones r
      LEFT JOIN 
          profesores p
      ON 
          r.id_profesor = p.idprofesores
  `;
  
  connection.query(sql, (error, results) => {
      if (error) {
        
          callback(error, null);
      } else {
        console.log('Resultados de la consulta:', results);
          callback(null, results);
      }
  });
}


const obtenerRecomendacionPorId = (id) => {
  return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM recomendaciones WHERE id = ?';
      connection.query(query, [id], (error, results) => {
          if (error) {
              reject(error);
          } else {
              resolve(results[0]);
          }
      });
  });
};

const actualizarRecomendacion = (id, titulo, autor, idProfesor, fecha) => {
  return new Promise((resolve, reject) => {
      const query = 'UPDATE recomendaciones SET titulo = ?, autor = ?, id_profesor = ?, fecha = ? WHERE id = ?';
      connection.query(query, [titulo, autor, idProfesor, fecha, id], (error, results) => {
          if (error) {
              reject(error);  
          } else {
              resolve(results); 
          }
      });
  });
};

function agregarProfesor(nombre, departamento, callback) {
  const query = 'INSERT INTO profesores (nombre, departamento_academico) VALUES (?, ?)';
  const values = [nombre, departamento];

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
function obtenerProfesorPorId(id) {
  return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM profesores WHERE idprofesores = ?';
      connection.query(query, [id], (error, results) => {
          if (error) {
              reject(error);
          } else {
              resolve(results[0]); 
          }
      });
  });
}

function eliminarRecomendacionPorId(id) {
  return new Promise((resolve, reject) => {
      const query = 'DELETE FROM recomendaciones WHERE id = ?';
      connection.query(query, [id], (error, results) => {
          if (error) {
              reject(error);
          } else if (results.affectedRows === 0) {
              reject(new Error('No se encontró la recomendación con ese ID.'));
          } else {
              resolve({ success: true, message: 'Recomendación eliminada exitosamente.' });
          }
      });
  });
}


  module.exports = {eliminarRecomendacionPorId,obtenerProfesorPorId ,obtenerProfesores,agregarProfesor,editarProfesor,eliminarProfesor,agregarRecomendacion,obtenerRecomendaciones,actualizarRecomendacion,obtenerRecomendacionPorId};