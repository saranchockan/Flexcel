
var data = [
  ['AC', '1NR', '1AR', '2NR', '2AR']
],
  container,
  hot1;

function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  td.style.fontWeight = 'bold';
  if (col % 2 == 1) { 
    td.style.color = '#076BFF'; 
  }
  else { 
    td.style.color = 'red'; 
  }
}


container = document.getElementById('1AC-Framing-tab');

hot1 = new Handsontable(container, {
  data: data,
  minCols: 5,
  minRows: 20,
  colWidths: 150,
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
      cellProperties.renderer = firstRowRenderer; // uses function directly
    }

    return cellProperties;
  }
});

document.getElementById('hot-display-license-info').style.visibility = "hidden";



