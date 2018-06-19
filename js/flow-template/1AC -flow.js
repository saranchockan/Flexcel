
var test_tab = document.getElementById('1AC-Framing-tab');
var flow = new Handsontable(test_tab, {
    height: 456,
    colWidths: 105,
    minCols: 5,
    minRows: 500,
    rowHeaders: true,
    colHeaders: [
        '1AC',
        '1NR',
        '1AR',
        '2NR',
        '2AR',
    ],
    columnSorting: true,
    filters: true,
    dropdownMenu: true,
    contextMenu: true,
    autoRowSize: true,
    manualColumnMove: true,
    manualRowMove: true,
    fillHandle: {
        autoInsertRow: false,
    }
});




