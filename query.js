const connection = require('./connection');


// Función para obtener todos los profesores
function obtenerProfesores(callback, query = 'SELECT * FROM profesores ORDER BY nombre ASC', params = []) {
    connection.query(query, params, (error, results) => {
        if (error) {
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

function obtenerRecomendaciones(query, callback) {
    let querySQL = `
        SELECT 
            r.id, 
            r.autor, 
            r.titulo, 
            r.fecha, 
            IFNULL(p.nombre, 'Profesor eliminado') AS profesor
        FROM 
            recomendaciones r
        LEFT JOIN 
            profesores p ON r.id_profesor = p.idprofesores
        WHERE 1=1
    `;
    const params = [];
  
    if (query) {
        if (isValidDate(query)) {
            // Si el valor tiene formato de fecha, buscamos por fecha
            querySQL += ' AND DATE(r.fecha) = ?';
            params.push(query);
        } else if (isYear(query)) {
            // Si el valor es un año, buscamos por año
            querySQL += ' AND YEAR(r.fecha) = ?';
            params.push(query);
        } else {
            // Si el valor no es fecha ni año, buscamos por autor o título
            querySQL += ' AND (r.autor LIKE ? OR r.titulo LIKE ?)';
            params.push(`%${query}%`, `%${query}%`);
        }
    }
  
    // Ordenar alfabéticamente por autor
    querySQL += ' ORDER BY r.autor ASC';  // Cambia 'autor' por 'titulo' si deseas ordenar por título
  
    connection.query(querySQL, params, (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error);
            callback(error, null);
        } else {
            console.log('Resultados de la consulta:', results);
            callback(null, results);
        }
    });
  }
  

// Función para verificar si el valor ingresado es una fecha válida (YYYY-MM-DD)
function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/; // Formato: YYYY-MM-DD
  return dateString.match(regex) !== null;
}

// Función para verificar si el valor es solo un año (YYYY)
function isYear(dateString) {
  const regex = /^\d{4}$/; // Formato: YYYY
  return dateString.match(regex) !== null;
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
function obtenerReporteProfesores(callback) {
    const sql = `
        SELECT 
            r.id AS id_recomendacion,
            r.autor,
            r.titulo,
            r.fecha,
            IFNULL(p.nombre, 'Profesor eliminado') AS nombre_profesor,
            IFNULL(p.departamento_academico, 'N/A') AS departamento_profesor
        FROM 
            recomendaciones r
        LEFT JOIN 
            profesores p
        ON 
            r.id_profesor = p.idprofesores
        ORDER BY 
            nombre_profesor ASC
    `;

    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error al obtener el reporte de profesores:', error);
            callback(error, null);
        } else {
            console.log('Reporte de profesores obtenido:', results);
            callback(null, results);
        }
    });
}

async function obtenerReporteRecomendacionesFecha(year) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                r.id AS id_recomendacion, 
                r.autor, 
                r.titulo, 
                r.fecha, 
                p.nombre AS nombre_profesor, 
                p.departamento_academico AS departamento_profesor
            FROM 
                recomendaciones r
            LEFT JOIN 
                profesores p ON r.id_profesor = p.idprofesores
            WHERE 
                YEAR(r.fecha) = ?;  -- Filtro por el año
        `;
        
        connection.query(query, [year], (err, results) => {
            if (err) {
                return reject(err); // En caso de error en la consulta
            }
            resolve(results); // Devuelve los resultados de la consulta
        });
    });
}

function obtenerReportesPorProfesor(professorId) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM recomendaciones WHERE id_profesor = ?';
        db.query(query, [professorId], (err, results) => {
            if (err) {
                console.error('Error al obtener los reportes:', err);
                return reject({ success: false, error: 'Error al obtener los reportes' });
            }
            resolve(results);
        });
    });
}

async function obtenerReportesProfesor(idProfesor) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                r.id, 
                r.autor, 
                r.titulo, 
                r.fecha, 
                p.nombre, 
                p.departamento_academico
            FROM recomendaciones r
            INNER JOIN profesores p ON r.id_profesor = p.idprofesores
            WHERE p.idprofesores = ?
            ORDER BY r.autor ASC  -- Ordena alfabéticamente por autor
        `;
        connection.execute(query, [idProfesor], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function obtenerRecomendacionesPorProfesor(idProfesor, callback) {
    const query = `
        SELECT 
            r.id AS id_recomendacion, 
            r.autor, 
            r.titulo, 
            r.fecha, 
            IFNULL(p.nombre, 'Profesor eliminado') AS nombre_profesor, 
            IFNULL(p.departamento_academico, 'N/A') AS departamento_profesor
        FROM 
            recomendaciones r
        LEFT JOIN 
            profesores p ON r.id_profesor = p.idprofesores
        WHERE 
            p.idprofesores = ?
    `;

    connection.query(query, [idProfesor], (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}



async function obtenerReportePorFecha(idProfesor, ano) {
    return new Promise((resolve, reject) => {
       
        const query = `
            SELECT 
                r.id AS id_recomendacion, 
                r.autor, 
                r.titulo, 
                r.fecha, 
                IFNULL(p.nombre, 'Profesor eliminado') AS nombre_profesor, 
                IFNULL(p.departamento_academico, 'N/A') AS departamento_profesor
            FROM 
                recomendaciones r
            LEFT JOIN 
                profesores p ON r.id_profesor = p.idprofesores
            WHERE 
                p.idprofesores = ? AND YEAR(r.fecha) = ?
        `;
        
        connection.query(query, [idProfesor, ano], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results); 
            }
        });
    });
}
  module.exports = {obtenerRecomendacionPorId,obtenerReportePorFecha,obtenerRecomendacionesPorProfesor,obtenerReportesProfesor,obtenerReportesPorProfesor,obtenerReporteRecomendacionesFecha,obtenerReporteProfesores,eliminarRecomendacionPorId,obtenerProfesorPorId ,obtenerProfesores,agregarProfesor,editarProfesor,eliminarProfesor,agregarRecomendacion,obtenerRecomendaciones,actualizarRecomendacion,obtenerRecomendacionPorId};