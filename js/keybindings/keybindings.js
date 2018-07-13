
var Mousetrap = require('mousetrap');
const { dialog } = require('electron')

var tabs_li = document.getElementById('flow-navbar').getElementsByClassName('nav-item');
var tabs = document.getElementById('flow-navbar').getElementsByClassName('nav-link');
var flows = document.getElementsByClassName('tab-pane');

var index = 0;
var mouseClicked = true;
var tabDeleted = false;

var ac_delete_limit = 6
var nc_delete_limit = 13
var nc_limit = 9

var vex = require('vex-js')
vex.registerPlugin(require('vex-dialog'))
vex.defaultOptions.className = 'vex-theme-os'

var fileName = ""
var fileNamed = false

const Store = require('electron-store');
const store = new Store();

var autocomplete = {
    'c1': 'contention 1', 
    'c2': 'contention 2', 
    'c3': 'contention 3', 
    'c4': 'contention 4', 
    'c5': 'contention 5',
    'c6': 'contention 6', 
    'c7': 'contention 7', 
    'c8': 'contention 8', 
    'c9': 'contention 9', 
    'c10': 'contention 10',
    'o1': 'Off 1', 
    'o2': 'Off 2', 
    'o3': 'Off 3', 
    'o4': 'Off 4', 
    'o5': 'Off 5',
    'o6': 'Off 6', 
    'o7': 'Off 7', 
    'o8': 'Off 8', 
    'o9': 'Off 9', 
    'obs':'Observations',
    'Adv1': 'Advantage 1', 
    'Adv2': 'Advantage 2', 
    'Adv3': 'Advantage 3', 
    'Adv4': 'Advantage 4', 
    'Adv5': 'Advantage 5',
    'Adv6': 'Advantage 6', 
    'o10': 'Off 10',
    'fw':'framework',
    'def':'definitions',
    'im':'Impact',
    'v m': 'value: morality',
    'st sv': 'standard is mitigating structural violence',
    'st msw':'standard is maximizing societal welfare',
    'st mxw':'standard is maximizing expected wellbeing',
    'st ut':'maximizing utility',
    'st comm':'standard is consistency with communal obligations',
    'st rl':'standard is respecting liberty',
    'goo':'Goodin 95',
    'k83':'Korsgaard 83',
    'k93':'Korsgaard 93',
    'b02':'Bostrom 02:',
    'b11':'Bostrom 11:',
    'win':'Winter and Leighton 99',
    'int':'Interp -',
    'vio':'Violation -',
    'sta':'Standards',
    'vot':'Voters',
    'ecd':'Econ Da',
    'cpk':'Cap K',
    'ak':'Afropess K'
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
            var dD =  data[2]['AC'] + 1
            data[2]['AC'] = dD
            deleteTab()
        }

        else if (nc_delete_limit >= nc_limit && index == nc_delete_limit) {
            nc_delete_limit = nc_delete_limit - 1
            nc_limit = nc_limit - 1
            var dD =  data[2]['NC'] + 1
            data[2]['NC'] = dD
            deleteTab()
        }

    }

})

Mousetrap.bind(['commands + s', 'ctrl+s'], function () {

    if (!fileNamed || fileName == '') {
        handstonable_flows[index].deselectCell()
        vex.dialog.prompt({
            message: 'Save As',
            placeholder: 'e.g. 1AC vs SJ Round 5',
            width: 100,
            callback: function (value) {
                fileName = value
                fileNamed = true
                console.log(value)
                selectAllCells()
                if (fileName != '') {
                    document.title = fileName
                }
            }
        })
        document.getElementsByClassName('vex-dialog-prompt-input')[0].style.width = '95%'
    }
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
    data[1].splice(deleteTab_index,1)

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
        for (i = 0; i < handstonable_flows.length; i++) {
            if(handstonable_flows[i].countCols() == 4){
                widthoffSet = 0.24615384615384617
            }
            else{
                widthoffSet = 0.19487179487179487
            }
            handstonable_flows[i].updateSettings({
                height: document.getElementById('df').offsetHeight - 131,
                width: document.getElementById('df').offsetWidth - 16,
                colWidths: (document.getElementById('df').offsetWidth - 16) * widthoffSet,
                afterChange(changes) {
                    data[1][index] = handstonable_flows[index].getData()

                    /* Autocomplete Feature */
                    changes.forEach(([row, prop, oldValue, newValue]) => {

                        if (typeof autocomplete[newValue] != 'undefined') {
                            var nV = autocomplete[newValue]
                            handstonable_flows[index].setDataAtCell(row, prop, nV)
                        }
                    });
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
