const fs = require('fs')
const electron = require('electron')
const installer = require('electron-devtools-installer')

const {app, BrowserWindow} = electron

let mainWindow

/* FUNCTIONS */

function createWindow () {
  installer.default(installer['REACT_DEVELOPER_TOOLS'])
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err))
  
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    // if you store multi windows in an array, you should delete the corresponding element
    mainWindow = null
  })
}

function printFile() { 
  mainWindow.webContents.on('did-finish-load', () => {
    // {marginsType:2, pageSize:"A4", landscape:false}
    mainWindow.webContents.printToPDF({}, (error, data) => {
      if (error) throw error
      fs.writeFile('karte.pdf', data, (error) => {
        if (error) throw error
        console.log('PDF je uspesno sacuvan.')
      })
    })
  })
}

function init() {
  createWindow()
  printFile()
}

/* EVENTS */

app.on('ready', init)

app.on('window-all-closed', function () {
  // On OS X stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X re-create a window in the app when the dock icon is clicked and no window open
  if (mainWindow === null) {
    createWindow()
  }
})
