
//-- Mousetrap Script: Keybindings for Tab customziation

var Mousetrap = require('mousetrap');
const tabs = document.getElementById('flow-navbar').getElementsByClassName('nav-link');
const flows = document.getElementsByClassName('tab-pane');


var index = 0;

//-- Switches to the previous tab

Mousetrap.bind(['command+o','ctrl+o'], function () {

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

Mousetrap.bind(['command+p','ctrl+p'], function () {

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

// Event fired after user selects tab: the flow is switched, index is updated

$('#flow-navbar a').on('shown.bs.tab', function (e) {
    console.log('click');   
    console.log(getClassNames());
    console.log(this.classList[0]); 
    switchFlow();
    index = parseInt(this.classList[0]);
    
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






