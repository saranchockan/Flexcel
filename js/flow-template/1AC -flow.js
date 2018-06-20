var flow_tabs = document.getElementsByClassName('1AC');
var flow;

for(i = 0;i<tabs.length;i++){
    flow = new Handsontable(flow_tabs[i], {
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
    });
}



