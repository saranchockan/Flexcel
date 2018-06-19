var Mousetrap = require('mousetrap');
const tabs = document.getElementById('flow-navbar').getElementsByClassName('nav-link');


var index = 0;

//-- Mousetrap Script: Keybindings for Tab customziation
Mousetrap.bind('command+left', function () {

    if (index > 0) {
        
        var id = tabs[index-1].id;
        var reference = '#' + id;
        $(document).ready(function () {
            $(reference).click();
        },'keyup');

        index = index - 1;

        console.log('previous tab');


    }
    else {

        var id = tabs[tabs.length - 1].id;
        var reference = '#' + id;
        $(document).ready(function () {
            $(reference).click();
        },'keyup');
        index = tabs.length - 1;

        console.log('previous tab');


    }

});

Mousetrap.bind('command+right', function () {

    if (index < tabs.length - 1) {

        var id = tabs[index+1].id;
        var reference = '#' + id;
        $(document).ready(function () {
            $(reference).click();
        },'keyup');

        index = index + 1;

        console.log('next tab');
    }

    else {

        var id = tabs[0].id;
        var reference = '#' + id;
        $(document).ready(function () {
            $(reference).click();
        },'keyup');

        index = 0;

        console.log('next tab');

    }

});



