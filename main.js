const { app, BrowserWindow } = require('electron')

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 1000
  })
  
  mainWindow.loadFile('index.html')
})