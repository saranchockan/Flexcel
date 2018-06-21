
 $('#flow-navbar').unbind('click');


//-- Mousetrap Script: Keybindings for Tab customziation

var Mousetrap = require('mousetrap');
const tabs = document.getElementById('flow-navbar').getElementsByClassName('nav-link');
const flows = document.getElementsByClassName('tab-pane');


var index = 0;

Mousetrap.bind('-', function () {

    console.log(getClassNames());

    if (index > 0) {
        
        var id = tabs[index-1].id;
        var reference = '#' + id;
        $(document).ready(function () {
            $(reference).click();
        });

        index = index - 1;

    }
    else {

        var id = tabs[tabs.length - 1].id;
        var reference = '#' + id;
        $(document).ready(function () {
            $(reference).click();
        });

        index = tabs.length - 1;

    }
        switchFlow();
        console.log(getClassNames());


},'keyup');

Mousetrap.bind('=', function () {

    console.log(getClassNames());

    if (index < tabs.length - 1) {

        var id = tabs[index+1].id;
        var reference = '#' + id;
        $(document).ready(function () {
            $(reference).click();
        });

        index = index + 1;
    }

    else {

        var id = tabs[0].id;
        var reference = '#' + id;
        $(document).ready(function () {
            $(reference).click();
        });

        index = 0;
    }

        switchFlow();
        console.log(getClassNames());


},'keyup');


function getClassNames(){

    var classnames;
    
    for(i = 0;i<flows.length;i++){

        var name_list = flows[i].classList

        classnames = classnames + flows[i].id + " ";
        for(k = 0;k<name_list.length;k++){
            classnames = classnames + name_list[k] + " ";
        }

        classnames = classnames + "\n";
    }

    return classnames;
}

function switchFlow(){

    for(i = 0;i<flows.length;i++){
        if(index == i){
            // console.log(index);
            flows[i].classList.add('active');
            flows[i].classList.add('show');
            
            var id = '#' + tabs[i].id;
            $(id).attr('aria-selected','true');

        }
        else{
            // console.log(i);
            flows[i].classList.remove('show');
            flows[i].classList.remove('active');

            var id = '#' + tabs[i].id;
            $(id).attr('aria-selected','false');
            
        }
    }

}






