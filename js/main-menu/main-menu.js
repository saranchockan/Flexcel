const { remote } = require('electron');
const url = require('url');
const path = require('path');


const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
var LD_Button = document.getElementById('ld');

LD_Button.addEventListener("click", () => {
    /*
    remote.getCurrentWindow().loadURL(url.format({
        pathname: path.join(__dirname, 'plan-flow.html'),
        protocol: 'file:',
        slashes: true,
      }));

    remote.getCurrentWindow().maximize();
    */
    
    let win = new BrowserWindow({ width: 400, height: 200 })
    win.on('close', function () { win = null })
    win.loadFile('plan-flow.html')
    win.maximize()
    win.show()

    remote.getCurrentWindow().close();



});
