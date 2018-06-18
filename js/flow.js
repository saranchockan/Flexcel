var Mousetrap = require('mousetrap');


//-- Mousetrap Script: Keybindings for Tab customziation
Mousetrap.bind('command+left', function() { console.log('switch to previous tab'); });

Mousetrap.bind('command+right', function() { console.log('switch to next tab'); });
