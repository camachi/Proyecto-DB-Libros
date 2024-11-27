const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const { eliminarRecomendacionPorId,obtenerProfesorPorId,obtenerProfesores,agregarProfesor,editarProfesor,eliminarProfesor,agregarRecomendacion,obtenerRecomendaciones,actualizarRecomendacion,obtenerRecomendacionPorId } = require('./query'); 

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
ipcMain.handle('obtener-profesores', async () => {
    return new Promise((resolve, reject) => {
        obtenerProfesores((error, results) => {
            if (error) {
                console.error('Error al obtener profesores:', error);
                reject(error);
            } else {
              console.log('Profesores cargaron correctamente:');
                resolve(results);
            }
        });
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


ipcMain.handle('obtener-recomendaciones', async () => {
    return new Promise((resolve) => {
        obtenerRecomendaciones((error, results) => {
            if (error) {
                resolve({ success: false, error });
            } else {
                resolve({ success: true, data: results });
            }
        });
    });
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
