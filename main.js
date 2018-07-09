const os = require('os')
const fs = require('fs')
const path = require('path')
const url = require('url')
const electron = require('electron')
const installer = require('electron-devtools-installer')
const {app, BrowserWindow, ipcMain, shell} = electron

let glavniProzor, stampacProzor

/* FUNCTIONS */

function instalirajAlate() {
  installer.default(installer['REACT_DEVELOPER_TOOLS'])
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err))
}

function postaviProzore () { 
  glavniProzor = new BrowserWindow({width: 800, height: 650, icon: 'src/assets/icon.png'})
  const indexPath = url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  })
  glavniProzor.loadURL(indexPath)
  glavniProzor.webContents.openDevTools()
  glavniProzor.on('closed', () => glavniProzor = null)

  stampacProzor = new BrowserWindow()
  stampacProzor.loadURL('file://' + __dirname + '/stampac.html')
  stampacProzor.hide()
  stampacProzor.on('closed', () => stampacProzor = null)
}

function stampaj(e) { 
  stampacProzor.webContents.print({}, success => 
    glavniProzor.webContents.send('odstampano', success)
  )
}

function sacuvajFajl(e) { 
  const pathname = path.join(os.tmpdir(), 'karte.pdf')
  const filePath = url.format({
    protocol: 'file:',
    pathname,
  })
  stampacProzor.webContents.printToPDF({}, (error, data) => {
    if (error) throw error
    fs.writeFile(pathname, data, (error) => {
      if (error) throw error
      glavniProzor.webContents.send('sacuvano', pathname)
      shell.openExternal(filePath)
    })
  })
}

function init() {
  instalirajAlate()
  postaviProzore()
}

/* EVENTS */

app.on('ready', init)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (glavniProzor === null) postaviProzore()
})

ipcMain.on('proslediZaStampu', (event, sadrzaj) => 
  stampacProzor.webContents.send('proslediZaStampu', sadrzaj)
)

ipcMain.on('proslediZaFajl', (event, sadrzaj) => 
  stampacProzor.webContents.send('proslediZaFajl', sadrzaj)
)

ipcMain.on('spremanZaStampu', stampaj)

ipcMain.on('spremanZaFajl', sacuvajFajl)
