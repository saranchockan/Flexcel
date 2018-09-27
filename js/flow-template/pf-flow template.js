
var handsontable_flows = [];

const flow_tabs = document.getElementsByClassName('tab-pane');
var pro_tabs = document.getElementsByClassName('PRO');
var con_tabs = document.getElementsByClassName('CON');

var selectCell_rc = [
  [1, 0], [1, 0]
]

var data = {
  'flow_type': 'PF Flow',
  'flow-data': [],
  'firstSpeaker': 'Pro',
  'boldElements': []
}

var flow_type = 'PF Flow'
var dataLoaded = false;

var firstSpeaker = 'Pro'

var affFontColor = '#ff2600'
var negFontColor = '#076BFF'

var affShadeColor = '#ffffff'
var negShadeColor = '#ffffff'

var bold_RC = [[], []]

/* Hides the flow and speech-doc until the screen is wholly rendered */

document.getElementById('flow-navbar').style.visibility = 'hidden'
document.getElementById('flows').style.visibility = 'hidden'
document.getElementById('ephox_mytextarea').style.visibility = 'hidden'
document.getElementById('mytextarea').style.visibility = 'hidden'




/* Sets red color font to 1ac and blue color font to 1nc */

function pro_flowRenderer(instance, td, row, col, prop, value, cellProperties) {
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

function con_flowRenderer(instance, td, row, col, prop, value, cellProperties) {
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
Handsontable.renderers.registerRenderer('pro_flowRenderer', pro_flowRenderer);

// -- Adds AC Flows

for (i = 0; i < pro_tabs.length; i++) {
  container = document.getElementById(pro_tabs[i].id);

  handsontable_flows.push(new Handsontable(container, {
    data: [['Pro Constructive', 'Con Rebuttal', 'Pro Summary', 'Con Summary', 'Pro Final Focus', 'Con Final Focus']],
    minCols: 6,
    maxCols: 6,
    minRows: 40,
    maxRows: 200,
    width: 500,
    height: 500,
    viewportRowRenderingOffsetequal: 30,
    viewportColumnRenderingOffset: 5,
    colWidths: 190,
    fillHandle: {
      autoInsertRow: true
    },
    minSpareRows: true,
    cells: function (row, col) {
      var cellProperties = {};
      var data = this.instance.getData();

      cellProperties.renderer = 'pro_flowRenderer';

      return cellProperties;
    }
  }))
}

Handsontable.renderers.registerRenderer('con_flowRenderer', con_flowRenderer);


// -- Adds NC Flows

for (i = 0; i < con_tabs.length; i++) {
  container = document.getElementById(con_tabs[i].id);

  handsontable_flows.push(new Handsontable(container, {
    data: [['Con Constructive', 'Pro Rebuttal', 'Con Rebuttal', 'Pro Summary', 'Con Summary', 'Pro Final Focus', 'Neg Final Focus']],
    minCols: 6,
    maxCols: 7,
    minRows: 40,
    maxRows: 200,
    width: 500,
    height: 500,
    viewportRowRenderingOffsetequal: 30,
    viewportColumnRenderingOffset: 4,
    colWidths: 190,
    fillHandle: {
      autoInsertRow: true
    },
    minSpareRows: true,
    cells: function (row, col) {
      var cellProperties = {};
      var data = this.instance.getData();

      cellProperties.renderer = 'con_flowRenderer';



      return cellProperties;
    }
  }))
}

/* Initializes data to be saved */

for (i = 0; i < handsontable_flows.length; i++) {
  data['flow-data'].push(handsontable_flows[i].getData())
}


/* Removes all of Handsontable's licenses */

var allLiceneses = document.querySelectorAll("#hot-display-license-info");
$(allLiceneses).remove();




