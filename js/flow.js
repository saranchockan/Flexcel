var Mousetrap = require('mousetrap');

//-- Switching Tabs
const tabs = document.getElementById('flow-navbar').getElementsByClassName('nav-link');


var index = 0;

//-- Mousetrap Script: Keybindings for Tab customziation
Mousetrap.bind('command+left', function() { 

    if(index>0){
        
        tabs[index].className = "nav-link";
        tabs[index-1].className = "nav-link active";
        index = index - 1;
        
    }
    else{
        tabs[index].className = "nav-link";
        tabs[tabs.length-1].className = "nav-link active";
        index = tabs.length-1;
    }
    
});
Mousetrap.bind('command+right', function() { 

    if(index<tabs.length-1){
        tabs[index].className = "nav-link";
        tabs[index+1].className = "nav-link active";
        index = index + 1;
    }
    
    else{
        tabs[index].className = "nav-link";
        tabs[0].className = "nav-link active";
        index = 0;
    }
    
});

// Mouse Click Test Case

/*
document.getElementById('test').addEventListener("click",()=>{
    console.log('test');

    for(i = 0;i<tabs.length;i++){
        console.log(i + " " + tabs[i].className);
    }
});
*/


