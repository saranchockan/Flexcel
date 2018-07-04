const { remote } = require('electron');
const url = require('url');
const path = require('path');


const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
let flow;


var LD_Plan_Flow_Button = document.getElementById('Plan-Flow-1AC');
LD_Plan_Flow_Button.addEventListener("click", () => {

    //-- Creates New Window for LD-Flow-Plan
    flow = new BrowserWindow({ width: 400, height: 200, show: false})
    flow.on('close', function () { win = null })
    flow.loadFile('plan-flow.html')
    flow.maximize()
    // flow.webContents.openDevTools();
    flow.setResizable(false)
    flow.show()
    

    //-- Closes Main Menu
    remote.getCurrentWindow().close();



});

var LD_Traditional_Flow_Button = document.getElementById('Traditional-Flow-1AC');

LD_Traditional_Flow_Button .addEventListener("click", () => {

    //-- Creates New Window for LD-Flow-Plan
    flow = new BrowserWindow({ width: 400, height: 200, show: false})
    flow.on('close', function () { win = null })
    flow.loadFile('traditional-flow.html')
    flow.maximize()
    // flow.webContents.openDevTools();
    flow.setResizable(false)
    flow.show()
    
    //-- Closes Main Menu
    remote.getCurrentWindow().close();



});

