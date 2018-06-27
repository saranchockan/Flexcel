
var handstonable_flows = [];

const flow_tabs = document.getElementsByClassName('tab-pane');
var AC_tabs = document.getElementsByClassName('AC');
var data = [
  ['AC', '1NR', '1AR', '2NR', '2AR']
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
// maps function to lookup string
Handsontable.renderers.registerRenderer('flowRenderer', flowRenderer);

for(i = 0;i<AC_tabs.length;i++){
    container = document.getElementById(AC_tabs[i].id);

    handstonable_flows.push(new Handsontable(container,{
      data: data,
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


// Removed All of Handsontable's licenses

var allLiceneses = document.querySelectorAll("#hot-display-license-info");
$(allLiceneses).remove();