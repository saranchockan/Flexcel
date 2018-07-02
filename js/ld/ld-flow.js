
//-- Mousetrap Script: Keybindings for Tab customziation

var Mousetrap = require('mousetrap');
const tabs = document.getElementById('flow-navbar').getElementsByClassName('nav-link');
const flows = document.getElementsByClassName('tab-pane');


var index = 0;
var mouseClicked = true;


//-- Adds Keybinding to switch to the previous tab

Mousetrap.bind(['command+o', 'ctrl+o'], function () {

    reset_rc()

    mouseClicked = false;
    console.log(getClassNames());
    previousTab()

}, 'keyup');

//-- Adds Keybinding to switch to the next tab

Mousetrap.bind(['command+p', 'ctrl+p'], function () {

    reset_rc()
    mouseClicked = false;
    console.log(getClassNames());
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

$('#flow-navbar a').on('shown.bs.tab', function (e) {
    // console.log('click');
    console.log(getClassNames());
    console.log(this.classList[0]);

    //-- will only Switch flows if tab was clicked through KeyBindings
    if (!mouseClicked) {
        switchFlow();
    }
    mouseClicked = true;
    index = parseInt(this.classList[0]);

    console.log(index)

    var i = getSelectedCellIndex();
    if (i != -1) {

        var rc = selectCell_rc[i];
        var r = rc[0]
        var c = rc[1]

        handstonable_flows[i].selectCell(r, c);

    }

})

Mousetrap.bind(['command+i', 'ctrl+i'], function () {

})



//-- Switches to the next tab

function nextTab(){
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

//-- Switches to the previous tab

function previousTab(){
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

function reset_rc(tab_switch) {

    console.log(handstonable_flows[index].getSelected())

    var newRC = handstonable_flows[index].getSelected()
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


