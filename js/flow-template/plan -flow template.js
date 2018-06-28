
var handstonable_flows = [];

const flow_tabs = document.getElementsByClassName('tab-pane');
var AC_tabs = document.getElementsByClassName('AC');
var NC_tabs = document.getElementsByClassName('NC');


var AC_data = [
  ['AC', '1NR', '1AR', '2NR', '2AR']
],NC_data = [
  ['1NC', '1AR', '2NR','2AR']
],
  container,
  hot;

function flowLabels(instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  td.style.fontWeight = 'bold';
  if (col % 2 == 1) { 
    td.style.color = '#076BFF'; 
  }
  else { 
    td.style.color = 'red'; 
  }
}

function flowRenderer(instance, td, row, col, prop, value, cellProperties) {
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

Handsontable.renderers.registerRenderer('flowRenderer', flowRenderer);

// -- Adds AC Flows

for(i = 0;i<AC_tabs.length;i++){
    container = document.getElementById(AC_tabs[i].id);

    handstonable_flows.push(new Handsontable(container,{
      data: AC_data,
      minCols: 5,
      minRows: 20,
      colWidths: 190,
      afterSelection: function (row, col, row2, col2) {
        var meta = this.getCellMeta(row2, col2);
    
        if (meta.readOnly) {
          this.updateSettings({ fillHandle: false });
        }
        else {
          this.updateSettings({ fillHandle: true });
        }
      },
      cells: function (row, col) {
        var cellProperties = {};
        var data = this.instance.getData();
    
        if (row === 0) {
          cellProperties.readOnly = true;
        }
        if (row === 0) {
          cellProperties.renderer = flowLabels; // uses function directly
        }
    
        else{
          cellProperties.renderer = 'flowRenderer'; // uses lookup map
    
        }
    
        return cellProperties;
      }
    }))
}

// -- Adds NC Flows

for(i = 0;i<NC_tabs.length;i++){
  container = document.getElementById(NC_tabs[i].id);

  handstonable_flows.push(new Handsontable(container,{
    data: NC_data,
    minCols: 4,
    minRows: 20,
    colWidths: 190,
    afterSelection: function (row, col, row2, col2) {
      var meta = this.getCellMeta(row2, col2);
  
      if (meta.readOnly) {
        this.updateSettings({ fillHandle: false });
      }
      else {
        this.updateSettings({ fillHandle: true });
      }
    },
    cells: function (row, col) {
      var cellProperties = {};
      var data = this.instance.getData();
  
      if (row === 0) {
        cellProperties.readOnly = true;
      }
      if (row === 0) {
        cellProperties.renderer = flowLabels; // uses function directly
      }
  
      else{
        cellProperties.renderer = 'flowRenderer'; // uses lookup map
  
      }
  
      return cellProperties;
    }
  }))
}

// Removes All of Handsontable's licenses

var allLiceneses = document.querySelectorAll("#hot-display-license-info");
$(allLiceneses).remove();


//-- Renders the first flow: to make sure all cells are displayed


handstonable_flows[0].selectCell(1,0);
handstonable_flows[0].deselectCell();

