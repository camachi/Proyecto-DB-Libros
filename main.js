const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const { obtenerProfesores } = require('./query'); 

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 1000,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, 
            autoHideMenuBar: true,
            icon: path.join(__dirname, 'books.ico') 
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

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit(); 
    }
});

