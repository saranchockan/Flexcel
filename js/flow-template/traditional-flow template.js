
var handsontable_flows = [];

const flow_tabs = document.getElementsByClassName('tab-pane');
var AC_tabs = document.getElementsByClassName('AC');
var NC_tabs = document.getElementsByClassName('NC');

var selectCell_rc = [
  [0,0],[0,0]
]


var data = {
  'flow_type':'LD Traditional Flow',
  'flow-data':[],
  'boldElements':[]
}

var flow_type = 'LD Traditional Flow'
var dataLoaded = false;

var affFontColor = '#ff2600'
var negFontColor = '#076BFF'

var affShadeColor = '#ffffff'
var negShadeColor = '#ffffff'

var bold_RC = [[],[]]


/* Hides the flow and speech-doc until the screen is wholly rendered */

document.getElementById('flow-navbar').style.visibility = 'hidden'
document.getElementById('flows').style.visibility = 'hidden'
document.getElementById('ephox_mytextarea').style.visibility = 'hidden'
document.getElementById('mytextarea').style.visibility = 'hidden'

/* Sets red color font to 1ac and blue color font to 1nc */


function ac_flowRenderer(instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);

  if (col % 2 == 1) { 
    td.style.color = negFontColor; 
    td.style.background = negShadeColor

  }
  else { 
    td.style.color = affFontColor; 
    td.style.background = affShadeColor
  }


  
}

function nc_flowRenderer(instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);

  if (col % 2 == 1) { 
    td.style.color = affFontColor; 
    td.style.background = affShadeColor

    
  }
  else { 
    td.style.color = negFontColor; 
    td.style.background = negShadeColor

  }
  
}
Handsontable.renderers.registerRenderer('ac_flowRenderer', ac_flowRenderer);

// -- Adds AC Flows

for(i = 0;i<AC_tabs.length;i++){
    container = document.getElementById(AC_tabs[i].id);

    handsontable_flows.push(new Handsontable(container,{
      colHeaders: ['AC', '1NR', '1AR', '2NR', '2AR'],
      minCols: 5,
      minRows: 40,
      maxRows: 200,
      width: 500,
      height: 500, 
      viewportRowRenderingOffsetequal: 30,
      viewportColumnRenderingOffset:5,
      colWidths: 174,
      fillHandle:{
        autoInsertRow: true
      },
      minSpareRows:true,
      cells: function (row, col) {
        var cellProperties = {};
        var data = this.instance.getData();

    
          cellProperties.renderer = 'ac_flowRenderer';
    
        return cellProperties;
      }
    }))
}

Handsontable.renderers.registerRenderer('nc_flowRenderer', nc_flowRenderer);


// -- Adds NC Flows

for(i = 0;i<NC_tabs.length;i++){
  container = document.getElementById(NC_tabs[i].id);

  handsontable_flows.push(new Handsontable(container,{
    colHeaders: ['1NC', '1AR', '2NR','2AR'],
    minCols: 4,
    maxCols: 4,
    minRows: 40,
    maxRows: 200,
    width: 500,
    height: 500, 
    viewportRowRenderingOffsetequal: 30,
    viewportColumnRenderingOffset:4,
    colWidths: 174,
    fillHandle:{
      autoInsertRow: true
    },
    minSpareRows:true,
    cells: function (row, col) {
      var cellProperties = {};
      var data = this.instance.getData();
  

      cellProperties.renderer = 'nc_flowRenderer'; 
  

  
      return cellProperties;
    }
  }))
}

/* Initializes data to be saved */

for(i = 0;i<handsontable_flows.length;i++){
  data['flow-data'].push(handsontable_flows[i].getData())
}


/* Removes all of Handsontable's licenses */

var allLiceneses = document.querySelectorAll("#hot-display-license-info");
$(allLiceneses).remove();




