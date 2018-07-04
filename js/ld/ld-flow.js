//-- Mousetrap Script: Keybindings for Tab customziation

var Mousetrap = require('mousetrap');

var tabs_li = document.getElementById('flow-navbar').getElementsByClassName('nav-item');
var tabs = document.getElementById('flow-navbar').getElementsByClassName('nav-link');
var flows = document.getElementsByClassName('tab-pane');

var index = 0;
var mouseClicked = true;
var tabDeleted = false;

var ac_delete_limit = 6
var nc_delete_limit = 13
var nc_limit = 9

// -- Selects all the first cells of the flow: fixes bug when handstonable returns undefined when accessed before any cell gets selected
selectAllCells()


//-- Adds Keybinding to switch to the previous tab

Mousetrap.bind(['command+o', 'ctrl+o'], function () {
    previousTab()
}, 'keyup');

//-- Adds Keybinding to switch to the next tab

Mousetrap.bind(['command+p', 'ctrl+p'], function () {
    nextTab()
}, 'keyup');

// Makes sure cell is focused even if same tab is clicked multiple times

$('#flow-navbar a').on('click', function (e) {
    console.log('click');

    var i = getSelectedCellIndex();
    if (i != -1) {

        var rc = selectCell_rc[i];
        var r = rc[0]
        var c = rc[1]

        handstonable_flows[i].selectCell(r, c);

    }
    
})

// Event fired after user selects tab: the flow is switched, index is updated

$('#flow-navbar li').on('shown.bs.tab', function (e) {

    console.log(getClassNames());
    console.log(this.classList[0]);

    //-- will only Switch flows if tab was clicked through KeyBindings
    if (!mouseClicked) {
        switchFlow();
    }

    mouseClicked = true;
    index = $(this).index();
    console.log('li index' + $(this).index())

    var i = getSelectedCellIndex();
    if (i != -1) {

        var rc = selectCell_rc[i];
        var r = rc[0]
        var c = rc[1]

        handstonable_flows[i].selectCell(r, c);

    }
    
})


//-- Deletes a tab: deletes the nav-item, nav-link, flow div, and resets selectetedCell, handstonable flows, tabs, flows array

Mousetrap.bind(['command+i', 'ctrl+i'], function () {

    //-- Can't delete Framing tab

    if (index != 0) {

        if ((ac_delete_limit>=2 && index == ac_delete_limit)){
            console.log('ac_delete should be 5')
            ac_delete_limit = ac_delete_limit - 1
            nc_delete_limit = nc_delete_limit - 1
            nc_limit = nc_limit - 1
            deleteTab()
        }

        else if(nc_delete_limit>=nc_limit && index == nc_delete_limit){
            nc_delete_limit = nc_delete_limit - 1
            nc_limit = nc_limit - 1
            deleteTab()
        }
        
    }

})

//-- Switches to the next tab

function nextTab() {

    console.log('Initial Index' + index)

    if(!tabDeleted){
        reset_rc()
    }

    mouseClicked = false;
    console.log(getClassNames());

    if (index < tabs.length - 1) {

        index = index + 1;
        console.log('Index' + index)

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

//-- Switches to the previous tab

function previousTab() {

    if(!tabDeleted){
        reset_rc()
    }
    tabDeleted = false
    mouseClicked = false;
    console.log(getClassNames());

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

function deleteTab(){

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

    console.log('Initial Length: ' + handstonable_flows.length)

    //-- Removes handstonable flow
    handstonable_flows.splice(deleteTab_index, 1)

    console.log('Remove Length: ' + handstonable_flows.length)


    //-- removes cell row and column element
    selectCell_rc.splice(deleteTab_index, 1)

    tabs = document.getElementById('flow-navbar').getElementsByClassName('nav-link');
    flows = document.getElementsByClassName('tab-pane');

    previousTab()
    console.log('test')
    console.log(nav_classNames());
}

//-- Adds visibility to the selected flow, and removes the visibilty from the previous tab

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

function selectAllCells(){
    for(i = handstonable_flows.length-1;i>=0;i--){
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

//-- Finds the previosuly selected cell and stores it into selectCell_rc

function reset_rc() {

    console.log(handstonable_flows[index].getSelected())

    var newRC = handstonable_flows[index].getSelected()

    console.log('[newRC[0]' + newRC[0])
    console.log('newRC[1]]' + newRC[1])

    selectCell_rc[index] = [newRC[0], newRC[1]];

}


//-- Debuggin Utility: Prints out the class list of every flow div

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