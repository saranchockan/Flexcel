
var handstonable_flows = [];

const flow_tabs = document.getElementsByClassName('tab-pane');
var AC_tabs = document.getElementsByClassName('AC');
var NC_tabs = document.getElementsByClassName('NC');

var selectCell_rc = [
  [0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]
]
var window_width = window.innerWidth;

//-- sets red color font to 1ac and blue color font to 1nc
function ac_flowLabels(instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  td.style.fontWeight = 'bold';
  if (col % 2 == 1) { 
    td.style.color = '#076BFF'; 
  }
  else { 
    td.style.color = 'red'; 
  }
}


function ac_flowRenderer(instance, td, row, col, prop, value, cellProperties) {
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
function nc_flowLabels(instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  td.style.fontWeight = 'bold';
  if (col % 2 == 1) { 
    td.style.color = 'red'; 
  }
  else { 
    td.style.color = '#076BFF'; 
  }
}
function nc_flowRenderer(instance, td, row, col, prop, value, cellProperties) {
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

Handsontable.renderers.registerRenderer('ac_flowRenderer', ac_flowRenderer);

// -- Adds AC Flows

for(i = 0;i<AC_tabs.length;i++){
    container = document.getElementById(AC_tabs[i].id);

    console.log(AC_tabs[i].id);
    handstonable_flows.push(new Handsontable(container,{
      colHeaders: ['AC', '1NR', '1AR', '2NR', '2AR'],
      minCols: 5,
      minRows: 35,
      width: 975,
      height: screen.height-100,
      viewportRowRenderingOffsetequal: 35,
      viewportColumnRenderingOffset:5,
      //colWidths: window_width*0.43378995433,
      colWidths: 190,
      fillHandle:{
        autoInsertRow: true
      },
      minSpareRows:true,
      cells: function (row, col) {
        var cellProperties = {};
        var data = this.instance.getData();
    
        if (row === 0) {
          cellProperties.renderer = ac_flowLabels; // uses function directly
        }
    
        else{
          cellProperties.renderer = 'ac_flowRenderer'; // uses lookup map
    
        }
    
        return cellProperties;
      }
    }))
}


Handsontable.renderers.registerRenderer('nc_flowRenderer', nc_flowRenderer);

// -- Adds NC Flows

for(i = 0;i<NC_tabs.length;i++){
  container = document.getElementById(NC_tabs[i].id);

  handstonable_flows.push(new Handsontable(container,{

    colHeaders: ['1NC', '1AR', '2NR','2AR'],
    minCols: 4,
    maxCols:4,
    minRows: 35,
    maxRows: 200,
    width: 800,
    height: screen.height-100, 
    viewportRowRenderingOffsetequal: 35,
    viewportColumnRenderingOffset:4,
    //colWidths: window_width*0.43378995433,
    colWidths: 190,
    fillHandle:{
      autoInsertRow: true
    },
    minSpareRows:true,
    cells: function (row, col) {
      var cellProperties = {};
      var data = this.instance.getData();
  
      if (row === 0) {
        cellProperties.renderer = nc_flowLabels; // uses function directly
      }
  
      else{
        cellProperties.renderer = 'nc_flowRenderer'; // uses lookup map
  
      }
      return cellProperties;
    }
  }))
}

// Renders the flow
for(i = 0;i<handstonable_flows.length;i++){
  handstonable_flows[i].updateSettings({viewportRowRenderingOffset: 'auto'});
  handstonable_flows[i].updateSettings({viewportColumnRenderingOffset: 'auto'});
}

// Removes All of Handsontable's licenses

var allLiceneses = document.querySelectorAll("#hot-display-license-info");
$(allLiceneses).remove();




