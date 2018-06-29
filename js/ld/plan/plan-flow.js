
//-- Mousetrap Script: Keybindings for Tab customziation

var Mousetrap = require('mousetrap');
const tabs = document.getElementById('flow-navbar').getElementsByClassName('nav-link');
const flows = document.getElementsByClassName('tab-pane');


var index = 0;
var mouseClicked = true;


//-- Switches to the previous tab

Mousetrap.bind(['command+o', 'ctrl+o'], function () {

    reset_rc()

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

}, 'keyup');

//-- Switches to the next tab

Mousetrap.bind(['command+p', 'ctrl+p'], function () {

    reset_rc()
    mouseClicked = false;
    console.log(getClassNames());

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

}, 'keyup');

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

//-- Gives the user the choice to rename tabs
Mousetrap.bind(['command+r', 'ctrl+r'],function(){

})



//-- Adds visibility to the selected flow, and removes the visibilty from the previous tab

function switchFlow() {

    for (i = 0; i < flows.length; i++) {
        if (index == i) {

            flows[i].classList.add('active');
            flows[i].classList.add('show');

            var id = '#' + tabs[i].id;
            $(id).attr('aria-selected', 'true');

        }
        else {

            flows[i].classList.remove('show');
            flows[i].classList.remove('active');

            var id = '#' + tabs[i].id;
            $(id).attr('aria-selected', 'false');

        }
    }

}

$('.t').on('keydown blur dblclick','input',function(e){
    if(e.type=="keydown")
    {
        if(e.which==13)
        {
           $(this).toggle();
           $(this).siblings('a').toggle().html($(this).val());
        }
        if(e.which==38 || e.which==40 || e.which==37 || e.which==39)
        {
           e.stopPropagation();
        }
    }
    else if(e.type=="focusout")
    {
        if($(this).css('display')=="inline-block")
        {
            $(this).toggle();
            $(this).siblings('a').toggle().html($(this).val());
        }
    }
    else
    {
        e.stopPropagation();
    }
});

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

