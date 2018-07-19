const { remote } = require('electron');
const url = require('url');
const path = require('path');


const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
let flow;


var LD_Plan_Flow_Button = document.getElementById('Plan-Flow-1AC');
LD_Plan_Flow_Button.addEventListener("click", () => {

    remote.getCurrentWindow().setResizable(true);
    remote.getCurrentWindow().isMaximizable(true);
    remote.getCurrentWindow().maximize()
    remote.getCurrentWindow().setResizable(false);
    remote.getCurrentWindow().loadFile('plan-flow.html')


});

var LD_Traditional_Flow_Button = document.getElementById('Traditional-Flow-1AC');

LD_Traditional_Flow_Button.addEventListener("click", () => {

    remote.getCurrentWindow().setResizable(true);
    remote.getCurrentWindow().isMaximizable(true);
    remote.getCurrentWindow().maximize()
    remote.getCurrentWindow().setResizable(false);
    remote.getCurrentWindow().loadFile('traditional-flow.html')

});

var PF_Flow_Button = document.getElementById('pf');

PF_Flow_Button.addEventListener("click", () => {

    remote.getCurrentWindow().setResizable(true);
    remote.getCurrentWindow().isMaximizable(true);
    remote.getCurrentWindow().maximize()
    remote.getCurrentWindow().setResizable(false);
    remote.getCurrentWindow().loadFile('pf-flow.html')


});

var Policy_Flow_Button = document.getElementById('policy');

Policy_Flow_Button.addEventListener("click", () => {

    remote.getCurrentWindow().setResizable(true);
    remote.getCurrentWindow().isMaximizable(true);
    remote.getCurrentWindow().maximize()
    remote.getCurrentWindow().setResizable(false);
    remote.getCurrentWindow().loadFile('policy-flow-dynamic.html')

});

