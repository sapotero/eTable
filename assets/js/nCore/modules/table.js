"use strict";

// var nCore.modules.table = nCore.modules.table || {};
var nCore = nCore || {};
nCore.modules.table = (function(){

  var table,
      maxCells = 0,
      currentCell,
      currentRow,
      activeCell = {},
      mergeCells = [],
  init = function(config){
    var initialTable = document.getElementById(config.table);
    
    if ( typeof(initialTable) === 'undefined' ) {
      console.log('error init: table undefined');
      return false;
    };

    table = ( initialTable ? initialTable : undefined);
    countMaxCells();
    addEventListener();

    nCore.core.attachTo( nCore.modules.table.activeCell );

   },
  config = function(){
    console.log(table, max_cells)
   },
  row    = function(mode, index){
    var index = parseInt( parseInt(index) == NaN ? 0 : index );
    
    console.log(currentRow, index);

    switch (mode) {
      case 'insert':
        row = table.insertRow( currentRow + index );
        for (var i = 0; i < maxCells; i++) {
          row.insertCell(0);
        };

        currentRow = (index == 0 ? currentRow + 1 : currentRow);

        break;
      case 'delete':
        row = table.deleteRow( currentRow );
        break;
      default:
        console.log('default')
        break;
    };
   },
  column = function(mode, index){

    switch (mode) {
      case 'insert':
        for (var i = table.rows.length - 1; i >= 0; i--) {
          table.rows[i].insertCell( currentCell + index );
        };
        currentCell = (index == 0 ? currentCell + 1 : currentCell);
        break;
      case 'delete':
        for (var i = table.rows.length - 1; i >= 0; i--) {
          table.rows[i].deleteCell( currentCell + index );
        };
        currentCell = (index == 0 ? currentCell + 1 : currentCell);
        break;
      default:
        console.log('default column')
        break;
    };
    mergeCells = {};
    countMaxCells();
    // clearSelection();
   },
  merge = function(mode){
    // merge horizontal
    // var rowIndexArray  = [],
    //     cellIndexArray = [];
    
    // for (var key in mergeCells) {
    //   var i = key.split('_');

    //   rowIndexArray.push(i[0]);
    //   cellIndexArray.push(i[1]);
    //   console.log(i[0], i[1]);
    // };
    switch (mode) {
      case 'h':
        for (var r = table.rows.length - 1; r >= 0; r--) {
          var row   = table.rows[r],
              cells = [];

          for (var i = row.cells.length - 1; i >= 0; i--) {

            var cell = row.cells[i];
            if ( cell.classList.contains('info') ) {
              cells.push(cell);
            };
          };

          if (cells.length) {
            var firstCell = cells.shift();
            firstCell.colSpan = cells.length + 1;

            for (var i = cells.length - 1; i >= 0; i--) {
              cells[i].parentNode.removeChild(cells[i]);
            };
          };
        };
        break;
      case 'v':
        var cells = [];

        for (var r = table.rows.length - 1; r >= 0; r--) {
          var row   = table.rows[r],
              cells = [];

          for (var i = row.cells.length - 1; i >= 0; i--) {
            var cell = row.cells[i];
            if ( cell.classList.contains('info') ) {
              cells.push(cell);
            };
          };
        };

        // if (cells.length) {
        var ids       = table.getElementsByClassName("info"),
            idsLength = ids.length,
            top       = ids[0];

        for (var i = 1; i < idsLength; i++) {
          ids[i].parentNode.removeChild(ids[i])
        };
        top.rowSpan = idsLength;


          // var firstCell = cells.shift();
          // firstCell.colSpan = cells.length + 1;

          // for (var i = cells.length - 1; i >= 0; i--) {
          //   cells[i].parentNode.removeChild(cells[i]);
          // };
        // };

        break;
      default:
        break;
    }
    // вначале мержим по горизонтали
      // if (cellIndexArray.length > 1) {
      //   for (var i = rowIndexArray.length - 1; i >= 0; i--) {
      //      var row = table.rows[ rowIndexArray[i] ];

      //      // for (var i = Things.length - 1; i >= 0; i--) {
      //      //   Things[i]
      //      // };
        
      //     for (var c = row.cells.length - 1; c >= 0; c--) {
      //       if ( cellIndexArray.length == 1) {
      //         c = row.cells[ cellIndexArray.pop() ]
      //         c.colSpan = Object.keys(mergeCells).length;
      //         if ( !c.classList.contains('info') ) {
      //           c.classList.toggle('info');
      //         };
      //         console.log( c );
      //       } else {
      //         var cell = cellIndexArray.pop();
      //         row.deleteCell(cell);
      //       };
      //     };
      //   };
      // };

      // потом мержим по вертикали


    clearSelection();
   },
  clearSelection = function(){
    console.log('clearSelection');
    mergeCells = {};

    var ids = table.getElementsByTagName('td');
    for(var i = 0; i<ids.length; i++){
      var td = ids[i];
      td.className = '';
    };
    // for(var i = 0; i<table.rows.length; i++){
    //   var row = table.rows[i];
    //   row.className = '';
    // };
  },
  countMaxCells = function(){
    for(var i = 0; i<table.rows.length; i++){
      var row = table.rows[i];
      if ( row.cells.length ) {
        maxCells = row.cells.length;
      };
    }
   },
  activeCell = function(){
    return activeCell;
   },
  addEventListener = function(){


    table.addEventListener('click', function(e){
      var el = e.path[0];
      activeCell = el;
      nCore.modules.table.activeCell.publish('setCell', el);

      for(var i = 0; i<table.rows.length; i++){
        var row = table.rows[i];
        row.className = '';
      };

      if ( el.nodeName != 'TBODY' ) {
        el.parentNode.className = 'active';
        el.classList.toggle('info');
        currentRow  = el.parentNode.rowIndex;
        currentCell = el.cellIndex;

        var mergeCellName = currentRow + '_' + currentCell;

        if ( mergeCells.hasOwnProperty( mergeCellName ) ) {
          delete mergeCells[ mergeCellName ];
        } else {
          mergeCells[ mergeCellName ]  = {
            row:  currentRow,
            cell: currentCell
          };
        };
        // nCore.modules.cellEditor.setFontSize(el);
        // activeCell.className = 'primary';


        console.log(currentCell, currentRow, mergeCells)
      };
    });

   };


  return {
    init       : init,
    merge      : merge,
    config     : config,
    row        : row,
    column     : column,
    activeCell : activeCell
  }
})();
nCore.modules.table.init({ table: 'nCoreTable' });