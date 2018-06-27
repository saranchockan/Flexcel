const { remote } = require('electron');
const url = require('url');
const path = require('path');


const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
var LD_Flow_Button = document.getElementById('Plan-Flow-1AC');



LD_Flow_Button.addEventListener("click", () => {

    //-- Creates New Window for LD-Flow-Plan
    let win = new BrowserWindow({ width: 400, height: 200, show: false})
    win.on('close', function () { win = null })
    win.loadFile('plan-flow.html')
    win.maximize()
    win.setResizable(false)
    win.webContents.openDevTools({})
    win.show()
    


    //-- Closes Main Menu

    remote.getCurrentWindow().close();

});
