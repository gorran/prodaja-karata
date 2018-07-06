const os = require('os')
const fs = require('fs')
const path = require('path')
const url = require('url')
const electron = require('electron')
const installer = require('electron-devtools-installer')

const {app, BrowserWindow, ipcMain, shell} = electron

let mainWindow

/* FUNCTIONS */

function installDevTools() {
  installer.default(installer['REACT_DEVELOPER_TOOLS'])
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err))
}

function createWindow () { 
  mainWindow = new BrowserWindow({width: 800, height: 600})
  const indexPath = url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  })
  mainWindow.loadURL(indexPath)
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

function printFile(e) { 
  const pathname = path.join(os.tmpdir(), 'karte.pdf')
  const filePath = url.format({
    pathname,
    protocol: 'file:',
  })

  mainWindow.webContents.printToPDF({}, (error, data) => {
    if (error) throw error
    fs.writeFile(pathname, data, (error) => {
      if (error) throw error
      shell.openExternal(filePath)
      e.sender.send('odstampano', pathname)
    })
  })
}

function init() {
  installDevTools()
  createWindow()
}

/* EVENTS */

app.on('ready', init)

app.on('window-all-closed', () => {
  // On OS X stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On OS X re-create a window in the app when the dock icon is clicked and no window open
  if (mainWindow === null) createWindow()
})

ipcMain.on('stampaj', printFile)