
var handstonable_flows = [];

const flow_tabs = document.getElementsByClassName('tab-pane');
var pro_tabs = document.getElementsByClassName('PRO');
var con_tabs = document.getElementsByClassName('CON');

var selectCell_rc = [
  [0,0],[0,0]
]

var data = {
  'flow_type':'PF Flow',
  'flow-data':[]
}

var flow_type = 'PF Flow'
var dataLoaded = false;



/* Hides the flow and speech-doc until the screen is wholly rendered */

document.getElementById('flow-navbar').style.visibility = 'hidden'
document.getElementById('flows').style.visibility = 'hidden'
document.getElementById('speech-doc').style.visibility = 'hidden'

/* Sets red color font to 1ac and blue color font to 1nc */


function pro_flowLabels(instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  td.style.fontWeight = 'bold';
  if (col % 2 == 1) { 
    td.style.color = '#076BFF'; 
  }
  else { 
    td.style.color = 'red'; 
  }
}

function pro_flowRenderer(instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);

  if (col % 2 == 1) { 
    td.style.fontWeight = 'bold';
    td.style.color = '#076BFF'; 
  }
  else { 
    td.style.fontWeight = 'bold';
    td.style.color = 'red'; 
  }
  
}
function con_flowLabels(instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  td.style.fontWeight = 'bold';
  if (col % 2 == 1) { 
    td.style.color = 'red'; 
  }
  else { 
    td.style.color = '#076BFF'; 
  }
}
function con_flowRenderer(instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);

  if (col % 2 == 1) { 
    td.style.fontWeight = 'bold';
    td.style.color = 'red'; 
  }
  else { 
    td.style.fontWeight = 'bold';
    td.style.color = '#076BFF'; 
  }
  
}
Handsontable.renderers.registerRenderer('pro_flowRenderer', pro_flowRenderer);

// -- Adds AC Flows

for(i = 0;i<pro_tabs.length;i++){
    container = document.getElementById(pro_tabs[i].id);

    handstonable_flows.push(new Handsontable(container,{
      colHeaders: ['Pro Constructive', 'Con Rebuttal', 'Pro Summary', 'Pro Final Focus'],
      minCols: 4,
      maxCols:4,
      minRows: 40,
      maxRows: 200,
      width: 500,
      height: 500, 
      viewportRowRenderingOffsetequal: 30,
      viewportColumnRenderingOffset:5,
      colWidths: 190,
      fillHandle:{
        autoInsertRow: true
      },
      minSpareRows:true,
      cells: function (row, col) {
        var cellProperties = {};
        var data = this.instance.getData();
        if (row === 0) {
          cellProperties.renderer = pro_flowLabels; 
        }
    
        else{
          cellProperties.renderer = 'pro_flowRenderer';
        }
    
        return cellProperties;
      }
    }))
}

Handsontable.renderers.registerRenderer('con_flowRenderer', con_flowRenderer);


// -- Adds NC Flows

for(i = 0;i<con_tabs.length;i++){
  container = document.getElementById(con_tabs[i].id);

  handstonable_flows.push(new Handsontable(container,{
    colHeaders: ['Con Constructive', 'Pro Rebuttal', 'Con Summary', 'Con Final Focus'],
    minCols: 4,
    maxCols: 4,
    minRows: 40,
    maxRows: 200,
    width: 500,
    height: 500, 
    viewportRowRenderingOffsetequal: 30,
    viewportColumnRenderingOffset:4,
    colWidths: 190,
    fillHandle:{
      autoInsertRow: true
    },
    minSpareRows:true,
    cells: function (row, col) {
      var cellProperties = {};
      var data = this.instance.getData();
  
      if (row === 0) {
        cellProperties.renderer = con_flowLabels; 
      }
  
      else{
        cellProperties.renderer = 'con_flowRenderer'; 
  
      }
  
      return cellProperties;
    }
  }))
}

/* Initializes data to be saved */

for(i = 0;i<handstonable_flows.length;i++){
  // data[1].push(handstonable_flows[i].getData())
  data['flow-data'].push(handstonable_flows[i].getData())
}


/* Removes all of Handsontable's licenses */

var allLiceneses = document.querySelectorAll("#hot-display-license-info");
$(allLiceneses).remove();




