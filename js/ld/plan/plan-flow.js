
//-- Mousetrap Script: Keybindings for Tab customziation

var Mousetrap = require('mousetrap');
const tabs = document.getElementById('flow-navbar').getElementsByClassName('nav-link');
const flows = document.getElementsByClassName('flow-tab');

var index = 0;

Mousetrap.bind('command+o', function () {

    console.log(getClassNames());
    if (index > 0) {
        
        var id = tabs[index-1].id;
        var reference = '#' + id;
        $(document).ready(function () {
            $(reference).click();
        },'keyup');

        index = index - 1;

    }
    else {

        var id = tabs[tabs.length - 1].id;
        var reference = '#' + id;
        $(document).ready(function () {
            $(reference).click();
        },'keyup');
        index = tabs.length - 1;

    }

    switchFlow();


});

Mousetrap.bind('command+p', function () {

    console.log(getClassNames());

    if (index < tabs.length - 1) {

        var id = tabs[index+1].id;
        var reference = '#' + id;
        $(document).ready(function () {
            $(reference).click();
        },'keyup');

        index = index + 1;
    }

    else {

        var id = tabs[0].id;
        var reference = '#' + id;
        $(document).ready(function () {
            $(reference).click();
        },'keyup');

        index = 0;
    }

    switchFlow();

});

function getClassNames(){

    var classnames;
    
    for(i = 0;i<flows.length;i++){

        var name_list = flows[i].classList

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
            flows[i].classList.add('show');
            flows[i].classList.add('active');
        }
        else{
            flows[i].classList.remove('show');
            flows[i].classList.remove('active');
            
        }
    }

}





