const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const { obtenerProfesores,agregarProfesor,editarProfesor,eliminarProfesor } = require('./query'); 

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
              console.log('Resultados de la consulta:', results);
                resolve(results);
            }
        });
    });
});

ipcMain.handle('agregar-profesor', async (event, data) => {
    return new Promise((resolve) => {
      agregarProfesor(data.nombre, data.departamento, data.programa, (error, result) => {
        if (error) {
          resolve({ success: false, error });
        } else {
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
    const { id, nombre, departamento, programa } = data;
    return new Promise((resolve) => {
        editarProfesor(id, nombre, departamento, programa, (error, result) => {
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