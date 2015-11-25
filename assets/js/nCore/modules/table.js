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

      if ( el.nodeName != 'TBODY' ) {
        currentRow  = el.parentNode.rowIndex;
        currentCell = el.cellIndex;
        if (e.ctrlKey) {
            el.classList.toggle('info');

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
            activeCell.classList.toggle('primary');
            console.log(currentCell, currentRow, mergeCells);
        } else {
          mergeCells = {};
          clearSelection();
          el.classList.toggle('success');
        }
      };

      el.parentNode.className = 'active';
      activeCell.classList.toggle('primary');
      nCore.modules.table.activeCell.publish('setCell', el);
      console.log( activeCell );
    //   if ( el.nodeName != 'TBODY' ) {
      //     el.parentNode.className = 'active';
      //     el.classList.toggle('info');
      //     currentRow  = el.parentNode.rowIndex;
      //     currentCell = el.cellIndex;

      //     var mergeCellName = currentRow + '_' + currentCell;

      //     if ( mergeCells.hasOwnProperty( mergeCellName ) ) {
      //       delete mergeCells[ mergeCellName ];
      //     } else {
      //       mergeCells[ mergeCellName ]  = {
      //         row:  currentRow,
      //         cell: currentCell
      //       };
      //     };
      //     // nCore.modules.cellEditor.setFontSize(el);
      //     // activeCell.className = 'primary';
      //     activeCell.classList.toggle('primary');
      //     console.log(currentCell, currentRow, mergeCells);
      //     nCore.modules.table.activeCell.publish('setCell', el);
      //   };
    });
   },
  generateQueryFromTable = function (table, headClass, sideClass, total){
    var table     = table,
        headClass = headClass,
        sideClass = sideClass,
        maxCells  = 0,
        headRows  = [],
        head_elements,
        sideRows  = [],
        side_elements,
        headRowsCenter = [],
        sideRowsCenter = [];

    // считаем макс. кол-во ячеек в таблице
    for(var i=0;i<table.rows.length;i++) {
      var cells = table.rows[i].cells, max = 0;
      for (var c = 0; c < cells.length; c++) {
        max += cells[c].colSpan;
      };
      if (max > maxCells) {
        maxCells = max;
      };
    }
    console.log('max:', maxCells);

    // выбираем все элементы, которые отметил пользователь
    head_elements = table.getElementsByClassName( headClass );
    // получаем уникальные строки из шапки таблицы
    for (var z = 0; z < head_elements.length; z++) {
      headRows.push(head_elements[z].parentNode)
    };
    headRows = uniq(headRows);

    // выбираем все элементы, которые отметил пользователь
    side_elements = table.getElementsByClassName( sideClass );
    // получаем уникальные строки из боковины таблицы
    for (var z = 0; z < side_elements.length; z++) {
      sideRows.push(side_elements[z].parentNode)
    };
    sideRows = uniq(sideRows);

    // добавляем специальную строку с данными
    var dataRow = document.createElement('tr');
    dataRow.className = 'data';
    dataRow.dataset.cellType = 'data';
    table.appendChild(dataRow);

    // считаем середины строк шапки
    for (var v = 0; v < headRows.length; v++) {
      var coordinates = headRows[v].getBoundingClientRect();
      headRowsCenter.push( (coordinates.top+coordinates.bottom)/2 );
    };

    // считаем середины строк боковины
    for (var v = 0; v < sideRows.length; v++) {
      var coordinates = sideRows[v].getBoundingClientRect();
      sideRowsCenter.push( {center: (coordinates.top+coordinates.bottom)/2, el: sideRows[v] } );
    };
    console.log(sideRowsCenter);

    // создаем строку с данными
    for (var i = 0; i < maxCells; i++) {
      var queryArray = [],
      dataCell = document.createElement('td');
      dataCell.dataset.cellType = 'data-cell';
      dataRow.appendChild(dataCell);

      var coordinates = dataCell.getBoundingClientRect();

      // проходимся по центрам строкам и центрам ячеек чтобы получить элемент
      for (var b = 0; b < headRowsCenter.length; b++) {
        var el = document.elementFromPoint( (coordinates.left+coordinates.right)/2, headRowsCenter[b]);
        if ( el ) {
          dataCell.innerHTML += '<br>'+ el.innerHTML;
          queryArray.push( el.innerHTML );
        };
      };

      dataCell.innerHTML = uniq(queryArray).join('+');
    };

    var rowRoot   = '';
    for (var b = 0; b < sideRowsCenter.length; b++) {
      
      var row       = sideRowsCenter[b].el,
          rowCenter = sideRowsCenter[b].center,
          rowQuery  = '',
          index     = 1;

      for (var n = 0; n < row.cells.length; n++) {
        var cell = row.cells[n];

        if ( cell.classList.contains( sideClass ) && cell.rowSpan > 1 ) {
          console.log('root: ',cell);
          rowRoot = cell.innerHTML;
          index = 0;
        }

        if (cell.classList.contains( sideClass )){
          rowQuery = rowRoot +'*'+ cell.innerHTML;
        } else {
          cell.innerHTML += rowQuery + ' || ' +dataRow.getElementsByTagName('td')[cell.cellIndex + index].innerHTML;
        }
      };
    };
    dataRow.style.display = 'none';
  };



  return {
    init       : init,
    merge      : merge,
    config     : config,
    row        : row,
    column     : column,
    activeCell : activeCell,
    tableQuery : generateQueryFromTable
  }
})();
nCore.modules.table.init({ table: 'nCoreTable' });