// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const {electron} = require('electron')
const defaultMenu = require('electron-default-menu');
const { Menu,shell } = require('electron');
const dialog = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 700, height: 450, show: false})

  // and load the index.html of the app.
  mainWindow.loadFile('main-menu.html')
  // Open the DevTools.
  // mainWindow.webContents.openDevTools({detach: true})

  // Maximize window
  // mainWindow.maximize();
  
  // Removes Main Menu from windows
  mainWindow.setMenu(null)

  // Window's heigh and width are fixed
  mainWindow.setResizable(false);
  mainWindow.setMaximizable(false);

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () =>{
  // Get template for default menu
  const menu = defaultMenu(app, shell);

  // Add custom menu
  menu.splice(4, 0, {
    label: 'Custom',
    submenu: [
      {
        label: 'Do something',
        click: (item, focusedWindow) => {
          dialog.showMessageBox({message: 'Do something', buttons: ['OK'] })
        }
      }
    ]
  })
  // Set top-level application menu, using modified template
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }


})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.