const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const { obtenerReportePorFecha,obtenerRecomendacionesPorProfesor,obtenerReportesProfesor,obtenerReportesPorProfesor,obtenerReporteRecomendacionesFecha,obtenerReporteProfesores,eliminarRecomendacionPorId,obtenerProfesorPorId,obtenerProfesores,agregarProfesor,editarProfesor,eliminarProfesor,agregarRecomendacion,obtenerRecomendaciones,actualizarRecomendacion,obtenerRecomendacionPorId } = require('./query'); 

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 1000,
        webPreferences: {
            preload: path.join(__dirname, 'agregar-profesores.js'),
            nodeIntegration: true,
            contextIsolation: false, 
            autoHideMenuBar: true,
            enableRemoteModule: false,
            icon: path.resolve(__dirname, 'book.ico')
        }
    });

    mainWindow.setMenu(null);
    mainWindow.loadFile('index.html');
});

// Manejar la solicitud para obtener profesores
ipcMain.handle('obtener-profesores', async (event, filtro = '') => {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM profesores';
        const params = [];

        
        if (filtro) {
            query += ' WHERE nombre LIKE ? OR departamento_academico LIKE ?';
            params.push(`%${filtro}%`, `%${filtro}%`);
        }

        
        query += ' ORDER BY nombre ASC';  

        obtenerProfesores((error, results) => {
            if (error) {
                console.error('Error al obtener profesores:', error);
                reject(error);
            } else {
                resolve(results);
            }
        }, query, params);
    });
});



ipcMain.handle('obtener-profesor-por-id', async (event, id) => {
    try {
        const profesor = await obtenerProfesorPorId(id); 
        return profesor;
    } catch (error) {
        console.error('Error al obtener el profesor:', error);
        return null;
    }
});

ipcMain.handle('agregar-profesor', async (event, data) => {
    return new Promise((resolve, reject) => {
      agregarProfesor(data.nombre, data.departamento, (error, result) => {
        if (error) {
          console.error('Error al agregar el profesor:', error);
          reject({ success: false, error: error });
        } else {
          console.log('Profesor agregado correctamente');
          resolve({ success: true });
        }
      });
    });
  });

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit(); 
    }
});



ipcMain.handle('actualizar-profesor', async (event, data) => {
    const { id, nombre, departamento} = data;
    return new Promise((resolve) => {
        editarProfesor(id, nombre, departamento, (error, result) => {
            if (error) {
                resolve({ success: false, error });
            } else {
                resolve({ success: true });
            }
        });
    });
});

ipcMain.handle('eliminar-profesor', async (event, profesorId) => {
    return new Promise((resolve) => {
        eliminarProfesor(profesorId, (error, result) => {
            if (error) {
                console.error('Error al eliminar el profesor:', error);
                resolve({ success: false, error });
            } else {
                console.log('Profesor eliminado correctamente:', result);
                resolve({ success: true });
            }
        });
    });
});

ipcMain.handle('agregar-recomendacion', async (event, data) => {
    return new Promise((resolve) => {
      
        const { autor, titulo, idProfesor, fecha } = data;

      
        agregarRecomendacion(autor, titulo, idProfesor, fecha, (error, result) => {
            if (error) {
                console.error('Error al agregar recomendación:', error);
                resolve({ success: false, error });
            } else {
                console.log('Recomendación agregada correctamente:', result);
                resolve({ success: true }); 
            }
        });
    });
});




// Manejo de la petición de búsqueda desde el frontend
ipcMain.handle('obtener-recomendaciones', async (event, query) => {
    try {
        return new Promise((resolve, reject) => {
            obtenerRecomendaciones(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    } catch (error) {
        console.error('Error al obtener recomendaciones:', error);
        return null;
    }
});


ipcMain.handle('obtener-recomendacion', async (event, id) => {
    try {
        const recomendacion = await obtenerRecomendacionPorId(id); 
        console.log('Recomendación obtenida:', recomendacion); 
        return recomendacion;
    } catch (error) {
        console.error('Error al obtener recomendación por ID:', error);
        return null;
    }
});
ipcMain.handle('actualizar-recomendacion', async (event, id, titulo, autor, idProfesor, fecha) => {
    try {
      
        const result = await actualizarRecomendacion(id, titulo, autor, idProfesor, fecha);
        return { success: true, message: 'Recomendación actualizada correctamente' }; 
    } catch (error) {
        console.error('Error al actualizar la recomendación:', error);
        return { success: false, message: 'Error al actualizar la recomendación' }; 
    }
});

ipcMain.handle('eliminar-recomendacion', async (event, recomendacionId) => {
    try {
        const response = await eliminarRecomendacionPorId(recomendacionId);
        return response;
    } catch (error) {
        return { success: false, error: error.message };
    }
})

ipcMain.handle('obtener-reporte-profesores', async () => {
    try {
        return new Promise((resolve, reject) => {
            obtenerReporteProfesores((error, resultados) => {
                if (error) {
                    console.error('Error desde query.js:', error);
                    resolve({ success: false, error: 'Error al obtener el reporte de profesores' });
                } else {
                    resolve({ success: true, data: resultados });
                }
            });
        });
    } catch (error) {
        console.error('Error inesperado en ipcMain:', error);
        return { success: false, error: 'Error inesperado en el servidor' };
    }
});

ipcMain.handle('obtener-reporte-recomendaciones-fecha', async (event, year) => {
    try {
        const reporte = await obtenerReporteRecomendacionesFecha(year);
        return { success: true, data: reporte };
    } catch (error) {
        console.error('Error al obtener el reporte de recomendaciones:', error);
        return { success: false, error: 'No se pudo obtener el reporte.' };
    }
});

ipcMain.handle('obtener-todos-los-reportes-profesor', async (event, professorId) => {
    try {
        const reportes = await obtenerReportesPorProfesor(professorId);
        return { success: true, data: reportes };
    } catch (error) {
        console.error('Error al obtener los reportes del profesor:', error);
        return { success: false, error: error.message || 'Error inesperado' };
    }
});

ipcMain.handle('obtener-reporte-profesor', async (event, idProfesor) => {
    try {
        const reportes = await obtenerReportesProfesor(idProfesor);
        console.log('Reportes obtenidos:', reportes);  // Agregar un log aquí
        return { success: true, data: reportes };
    } catch (error) {
        console.error('Error al obtener los reportes:', error);
        return { success: false, error: 'Error al obtener los reportes' };
    }
});


ipcMain.handle('obtener-recomendaciones-por-profesor', async (event, idProfesor) => {
    return new Promise((resolve, reject) => {
        obtenerRecomendacionesPorProfesor(idProfesor, (error, results) => {
            if (error) {
                console.error('Error al obtener recomendaciones del profesor:', error);
                reject({ success: false, error });
            } else {
                resolve({ success: true, data: results });
            }
        });
    });
});


ipcMain.handle('obtener-informacion-profesor', async (event, idProfesor) => {
    try {
      
        const profesor = await obtenerProfesorPorId(idProfesor);
        return profesor; 
    } catch (error) {
        console.error('Error al obtener la información del profesor:', error);
        return null; 
    }
});


ipcMain.handle('obtener-reporte-por-fecha', async (event, { idProfesor, ano }) => {
    try {
       
        const reportes = await obtenerReportePorFecha(idProfesor, ano);
        return { success: true, data: reportes }; 
    } catch (error) {
        console.error('Error al obtener el reporte por fecha:', error);
        return { success: false, error: 'Error al obtener los reportes' }; 
    }
});

ipcMain.on('cerrar-app', () => {
    app.quit(); 
});