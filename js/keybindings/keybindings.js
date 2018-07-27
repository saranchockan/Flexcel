var Mousetrap = require('mousetrap');
const fs = require('fs')
const dialog = require('electron').remote.dialog

// Variables used to access HTML elements for DOM manipulation

var tabs_li = document.getElementById('flow-navbar').getElementsByClassName('nav-item');
var tabs = document.getElementById('flow-navbar').getElementsByClassName('nav-link');
var flows = document.getElementsByClassName('tab-pane');

// Variables used for tab switching through hotkeys

var index = 0;
var mouseClicked = true;
var tabDeleted = false;

// Variables used to implement constraints on tab deletion

var ac_delete_limit = 6
var nc_delete_limit = 13
var nc_limit = 9


var vex = require('vex-js')
vex.registerPlugin(require('vex-dialog'))
vex.defaultOptions.className = 'vex-theme-os'


// Variables for saving the flow

var fileName = ""
var fileNamed = false
var loadedData;
var dataSuccess = false;
var tD = false;



// Variables for storing auto-complete data

const Store = require('electron-store');
const store = new Store();

var autocomplete = {
    'c1': 'Contention 1',
    'c2': 'Contention 2',
    'c3': 'Contention 3',
    'c4': 'Contention 4',
    'c5': 'Contention 5',
    'c6': 'Contention 6',
    'c7': 'Contention 7',
    'c8': 'Contention 8',
    'c9': 'Contention 9',
    'c10': 'Contention 10',
    'o1': 'Off 1',
    'o2': 'Off 2',
    'o3': 'Off 3',
    'o4': 'Off 4',
    'o5': 'Off 5',
    'o6': 'Off 6',
    'o7': 'Off 7',
    'o8': 'Off 8',
    'o9': 'Off 9',
    'obs': 'Observations',
    'Adv1': 'Advantage 1',
    'Adv2': 'Advantage 2',
    'Adv3': 'Advantage 3',
    'Adv4': 'Advantage 4',
    'Adv5': 'Advantage 5',
    'Adv6': 'Advantage 6',
    'o10': 'Off 10',
    'fw': 'Framework',
    'def': 'Definitions',
    'im': 'Impact',
    'v m': 'value: morality',
    'st sv': 'standard is mitigating structural violence',
    'st msw': 'standard is maximizing societal welfare',
    'st mew': 'standard is maximizing expected wellbeing',
    'st ut': 'maximizing utility',
    'st comm': 'standard is consistency with communal obligations',
    'st rl': 'standard is respecting liberty',
    'goo': 'Goodin 95',
    'k83': 'Korsgaard 83',
    'k93': 'Korsgaard 93',
    'b02': 'Bostrom 02',
    'b11': 'Bostrom 11',
    'win': 'Winter and Leighton 99',
    'int': 'Interp -',
    'vio': 'Violation -',
    'sta': 'Standards',
    'vot': 'Voters',
    'ecd': 'Econ Da',
    'cpk': 'Cap K',
    'ak': 'Afropess K'
}


if (store.has('autocomplete') == false) {
    store.set('autocomplete', autocomplete)
}
else {
    autocomplete = store.get('autocomplete')
}




/* 
    Selects all the first cells of the flow: This is to make sure that handstonable 
    doesn't return undefined when getSelected() is called.
*/
selectAllCells()


/* Mousetrap js: adds keybindings for keyboard shortcuts to navigate the flow */


/* Adds keybindg to switch to the previous tab */

Mousetrap.bind(['command+o', 'ctrl+o'], function () {
    previousTab()
}, 'keyup');

/* Adds keybindg to switch to the next tab */

Mousetrap.bind(['command+p', 'ctrl+p'], function () {
    nextTab()
}, 'keyup');

/* Puts focus on the cell when the tab is selected/clicked */

$('#flow-navbar a').on('click', function (e) {

    var i = getSelectedCellIndex();
    if (i != -1) {
        var rc = selectCell_rc[i];
        var r = rc[0]
        var c = rc[1]
        handstonable_flows[i].selectCell(r, c);
    }

})


/* 
    The flow is switched and the index is updated AFTER the user has selected/clicked the tab.
    This prevents the overlapping of flows when the user quickly switches tab and forces the 
    code to be executed synchronously.
*/

$('#flow-navbar li').on('shown.bs.tab', function (e) {

    /* 
        The manual switching of flows will only be called if the user switches tabs through
        the keyboard shortcut. B/c if clicked by mouse, bootstrap will automatically take 
        care of that.
    */
    if (!mouseClicked) {
        switchFlow();
    }
    mouseClicked = true;
    index = $(this).index();

    var i = getSelectedCellIndex();
    if (i != -1) {
        var rc = selectCell_rc[i];
        var r = rc[0]
        var c = rc[1]
        handstonable_flows[i].selectCell(r, c);
    }
})


/* 
    Deletes the current tab. A tab can only be deleted in order of the flow tabs i.e you can only
    deleted the ADV's in order starting from 5; this also applies to the Off's.
*/

Mousetrap.bind(['command+i', 'ctrl+i'], function () {

    //-- Can't delete Framing tab

    if (index != 0) {

        if ((ac_delete_limit >= 2 && index == ac_delete_limit)) {
            ac_delete_limit = ac_delete_limit - 1
            nc_delete_limit = nc_delete_limit - 1
            nc_limit = nc_limit - 1
            data['delete-tabs'].push(flows[index].id)
            deleteTab()
            tD = true
        }

        else if (nc_delete_limit >= nc_limit && index == nc_delete_limit) {
            nc_delete_limit = nc_delete_limit - 1
            nc_limit = nc_limit - 1
            data['delete-tabs'].push(flows[index].id)
            deleteTab()
            tD = true
        }

    }

})

/* 
   User selects the file and it loaded into the flow if the 
   flow-type and file type is correct.
*/

Mousetrap.bind(['commands + d', 'ctrl+d'], function () {

    if(tD==false){
        dialog.showOpenDialog((fileNames) => {
            // fileNames is an array that contains all the selected
            if (fileNames === undefined) {
                console.log("No file selected");
                return;
            }
            var fileName = fileNames[0];
    
            fs.readFile(fileName, 'utf-8', (err, data) => {
                if (err) {
                    alert("An error ocurred reading the file :" + err.message);
                    return;
                }
    
                try{
                    loadedData = JSON.parse(data);
                    dataSuccess = true
                }
                catch(err){
                    vex.dialog.alert('Error: Only .json files can be loaded')
                }
                dataLoaded = true
    
                if (dataSuccess && loadedData['flow_type'] == flow_type) {
    
                    if (flow_type == 'LD Plan Flow' || flow_type == 'Policy Flow') {
                        var x = 0;
                        for (i = 0; i < handstonable_flows.length; i++) {
                            if (loadedData['delete-tabs'].includes(flows[i].id)) {
                            }
                            else {
                                dataLoaded = true
                                handstonable_flows[i].updateSettings({
                                    data: loadedData['flow-data'][x]
                                })
                                x++;
                            }
                        }
                    }
                    else {
                        for (i = 0; i < handstonable_flows.length; i++) {
                            dataLoaded = true
                            handstonable_flows[i].updateSettings({
                                data: loadedData['flow-data'][i]
                            })
                        }
                    }
                }
                else{
                    if(dataSuccess == true){
                        vex.dialog.alert('Error: Only ' + flow_type + ' can be loaded')
                    }
                }
                console.log("The file content is : " + loadedData);
                dataSuccess = false
            });
        });
    }

    else{
        vex.dialog.alert('Error: Open a blank flow and load the file ')
    }
    

})

/* 
    Saves the flow (data json obj) to a json format.    
*/

Mousetrap.bind(['commands + s', 'ctrl+s'], function () {

    let content = "Some text to save into the file";
    var jsonObj = JSON.parse(JSON.stringify(data));
    var jsonContent = JSON.stringify(jsonObj);

    // You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
    dialog.showSaveDialog((fileName) => {
        if (fileName === undefined) {
            console.log("You didn't save the file");
            return;
        }

        // fileName is a string that contains the path and filename created in the save file dialog.  
        fs.writeFile(fileName + '.json', jsonContent, 'utf8', (err) => {
            if (err) {
                alert("An error ocurred creating the file " + err.message)
            }

            alert("The file has been succesfully saved");
        });
    });

})


/* 
    Allows the user to add a custom key, value for autocomplete
*/
Mousetrap.bind(['commands + t', 'ctrl+t'], function () {

    handstonable_flows[index].deselectCell()
    vex.dialog.prompt({
        message: 'Add autocomplete key and value in the format: key,value',
        placeholder: 'v m, value:morality',
        width: 100,
        callback: function (value) {

            if(value!=false){
                console.log(value)
                var v = value.split(',')
                console.log('Key ' + v[0])
                console.log('Value ' + v[1])
    
                if (typeof v[0] != 'undefined') {
                    if (typeof v[1] != 'undefined') {
                        autocomplete[v[0]] = v[1]
                        store.set('autocomplete', autocomplete)
                    }
                }
                else {
                    vex.dialog.alert('Wrong Format! The format is -> key,value: v m, value:morality')
                }

                selectAllCells()
            }

        }
    })
    document.getElementsByClassName('vex-dialog-prompt-input')[0].style.width = '95%'
})



/* 
    Switches to the next tab. This is done in accordance an index variable 
    which is increased everytime you go right and decreased when you go left.
    The index is then used to access the tab element's ID, which is then clicked
    through jQuery. Before switching, the row and column of the previous cell 
    is updated
*/

function nextTab() {


    if (!tabDeleted) {
        reset_rc()
    }

    mouseClicked = false;

    if (index < tabs.length - 1) {

        index = index + 1;
        var id = tabs[index].id;
        var reference = '#' + id;
        $(document).ready(function () {
            $(reference).click();
        });
    }

    else {
        index = 0;
        var id = tabs[index].id;
        var reference = '#' + id;
        $(document).ready(function () {
            $(reference).click();
        });

    }
}

/* 
    Switches to the previous tab. This is done in accordance an index variable 
    which is increased everytime you go right and decreased when you go left.
    The index is then used to access the tab element's ID, which is then clicked
    through jQuery. Before switching, the row and column of the previous cell 
    is updated
*/
function previousTab() {

    if (!tabDeleted) {
        reset_rc()
    }
    tabDeleted = false
    mouseClicked = false;

    if (index > 0) {

        index = index - 1;
        var id = tabs[index].id;
        var reference = '#' + id;
        $(document).ready(function () {
            $(reference).click();
        });
    }
    else {
        index = tabs.length - 1;
        var id = tabs[index].id;
        var reference = '#' + id;
        $(document).ready(function () {
            $(reference).click();
        });


    }
}


/* 
    Deletes the current tab in accordance to the current index. More specifically, it deletes the current
    nav-item, nav-link, flow-div and resets the selectedCell, handstonable flows, and tabs array.
*/

function deleteTab() {

    tabDeleted = true
    var deleteTab_index = index
    nextTab()

    //-- Removes the nav-pill
    var id = '#' + tabs[deleteTab_index].id
    $(id).remove()

    //-- Removes the nav-item
    id = '#' + tabs_li[deleteTab_index].id
    $(id).remove()

    //-- Removes the div
    id = '#' + flows[deleteTab_index].id
    $(id).remove()

    //-- Removes handstonable flow
    handstonable_flows.splice(deleteTab_index, 1)

    // Removes data index
    data['flow-data'].splice(deleteTab_index, 1)

    //-- removes cell row and column element
    selectCell_rc.splice(deleteTab_index, 1)

    tabs = document.getElementById('flow-navbar').getElementsByClassName('nav-link');
    flows = document.getElementsByClassName('tab-pane');

    previousTab()

}

/* When the user switches tab through keybindings, it manually adds visibility to the selected flow */

function switchFlow() {

    for (i = 0; i < flows.length; i++) {
        if (index == i) {
            flows[i].classList.add('active');
            flows[i].classList.add('show');
        }
        else {
            flows[i].classList.remove('show');
            flows[i].classList.remove('active');
        }
    }

}

function resizeFlowHeight() {
    if (document.getElementById('flow-tabs').offsetHeight > 40) {
        for (i = 0; i < handstonable_flows.length; i++) {
            handstonable_flows[i].updateSettings({
                height: document.getElementById('df').offsetHeight - 131,
            })
        }
    }
    else {
        for (i = 0; i < handstonable_flows.length; i++) {
            handstonable_flows[i].updateSettings({
                height: document.getElementById('df').offsetHeight - 94,
            })
        }
    }
}


function selectAllCells() {
    for (i = handstonable_flows.length - 1; i >= 0; i--) {
        var rc = selectCell_rc[i];
        var r = rc[0]
        var c = rc[1]
        handstonable_flows[i].selectCell(r, c);
    }
}

function getSelectedCellIndex() {
    for (i = 0; i < flows.length; i++) {

        var name_list = flows[i].classList
        if (name_list.contains('active')) {
            return i;
        }
    }

    return -1;
}


/* updates the selectedCells array everytime the user switches tabs */

function reset_rc() {
    var newRC = handstonable_flows[index].getSelected()
    selectCell_rc[index] = [newRC[0], newRC[1]];
}

/* Debuggin utilities: prints out the class list of every flow and tab div */

function getClassNames() {

    var classnames;

    for (i = 0; i < flows.length; i++) {

        var name_list = flows[i].classList

        classnames = classnames + flows[i].id + " ";
        for (k = 0; k < name_list.length; k++) {
            classnames = classnames + name_list[k] + " ";
        }

        classnames = classnames + "\n";
    }

    return classnames;
}


function nav_classNames() {

    var classnames;

    for (i = 0; i < tabs.length; i++) {

        var name_list = tabs[i].classList

        classnames = classnames + tabs[i].id + " ";
        for (k = 0; k < name_list.length; k++) {
            classnames = classnames + name_list[k] + " ";
        }

        classnames = classnames + "\n";
    }

    return classnames;
}


/* 
    Function executed after the page is loaded to make sure all cells are displayed. It also makes sure
    that the height and width of the flow is in accordance to the user's screen resolution.
    After loading, the pre-loader is removed.
*/

$(function () {
    nextTab()
    previousTab()

    /* Sets a timeout for 1 second to make sure the whole page is loaded */

    var widthoffSet;

    setTimeout(() => {
        resizeFlowHeight()
        for (i = 0; i < handstonable_flows.length; i++) {
            if (handstonable_flows[i].countCols() == 4) {
                widthoffSet = 0.24615384615384617
            }
            else {
                widthoffSet = 0.19487179487179487
            }
            handstonable_flows[i].updateSettings({
                width: document.getElementById('df').offsetWidth - 16,
                colWidths: (document.getElementById('df').offsetWidth - 16) * widthoffSet,
                afterChange(changes) {

                    if (!dataLoaded) {
                        data['flow-data'][index] = handstonable_flows[index].getData()

                        /* Autocomplete Feature */
                        changes.forEach(([row, prop, oldValue, newValue]) => {
                            if (typeof autocomplete[newValue] != 'undefined') {
                                var nV = autocomplete[newValue]
                                handstonable_flows[index].setDataAtCell(row, prop, nV)
                            }
                        });
                    }
                    else {
                        dataLoaded = false
                    }

                }
            });
        }
        $('.loader').remove()
        document.getElementById('df').classList.add('elementToFadeInAndOutLeft')
        document.getElementById('speech-doc').classList.add('elementToFadeInAndOutRight')
        document.getElementById('flow-navbar').style.visibility = 'visible'
        document.getElementById('flows').style.visibility = 'visible'
        document.getElementById('speech-doc').style.visibility = 'visible'
    }, 1000);
});

// function executed everytime window is reszied

$(window).resize(function() {
    resizeFlowHeight()
    for (i = 0; i < handstonable_flows.length; i++) {
        if (handstonable_flows[i].countCols() == 4) {
            widthoffSet = 0.24615384615384617
        }
        else {
            widthoffSet = 0.19487179487179487
        }
        handstonable_flows[i].updateSettings({
            width: document.getElementById('df').offsetWidth - 16,
            colWidths: (document.getElementById('df').offsetWidth - 16) * widthoffSet,
            afterChange(changes) {

                if (!dataLoaded) {
                    data['flow-data'][index] = handstonable_flows[index].getData()

                    /* Autocomplete Feature */
                    changes.forEach(([row, prop, oldValue, newValue]) => {
                        if (typeof autocomplete[newValue] != 'undefined') {
                            var nV = autocomplete[newValue]
                            handstonable_flows[index].setDataAtCell(row, prop, nV)
                        }
                    });
                }
                else {
                    dataLoaded = false
                }

            }
        });
    }
});
