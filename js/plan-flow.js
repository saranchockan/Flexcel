
//-- Mousetrap Script: Keybindings for Tab customziation

var Mousetrap = require('mousetrap');
const tabs = document.getElementById('flow-navbar').getElementsByClassName('nav-link');

var index = 0;

Mousetrap.bind('command+left', function () {

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

});

Mousetrap.bind('command+right', function () {

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

});



