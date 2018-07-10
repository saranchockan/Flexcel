
var Mousetrap = require('mousetrap');
const {dialog} = require('electron')

var tabs_li = document.getElementById('flow-navbar').getElementsByClassName('nav-item');
var tabs = document.getElementById('flow-navbar').getElementsByClassName('nav-link');
var flows = document.getElementsByClassName('tab-pane');

var index = 0;
var mouseClicked = true;
var tabDeleted = false;

var ac_delete_limit = 6
var nc_delete_limit = 13
var nc_limit = 9



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
            deleteTab()
        }

        else if (nc_delete_limit >= nc_limit && index == nc_delete_limit) {
            nc_delete_limit = nc_delete_limit - 1
            nc_limit = nc_limit - 1
            deleteTab()
        }

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
    
    setTimeout(() => {
        for (i = 0; i < handstonable_flows.length; i++) {
            handstonable_flows[i].updateSettings({
                height: document.getElementById('df').offsetHeight - 131,
                width: document.getElementById('df').offsetWidth - 16
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
