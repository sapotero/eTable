"use strict";

// модуль предоставляющий интерфейс для управления таблицами

var nCore = nCore || {};
nCore.modules.table = (function(){
  var nCoreTableEvent = {},
      table,
      maxCells = 0,
      currentCell,
      currentRow,
      activeCell = {},
      mergeCells = [],
  init = function(config){
    var config = { table: 'nCoreTable' };
    
    nCore.attachTo( nCore.modules.table.event );
    var initialTable = document.getElementById(config.table);
    
    if ( typeof(initialTable) !== 'undefined' && initialTable !== null ) {
      console.log( 'error init: table undefined', typeof(initialTable), initialTable );
      table = ( initialTable ? initialTable : undefined);
      countMaxCells();
      addEventListener();

      nCore.attachTo( nCore.modules.table.activeCell );
    } else {
      return false;
    }


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
    var table          = table,
        headClass      = headClass,
        sideClass      = sideClass,
        maxCells       = 0,
        headRows       = [],
        sideRows       = [],
        headRowsCenter = [],
        sideRowsCenter = [],
        dataRowsCenter = [],
        cellData       = [],
        head_elements,
        side_elements;

    function cleanArray(actual) {
      var newArray = new Array();
      for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
          newArray.push(actual[i]);
        }
      }
      return newArray;
    };
    function findUpTag(el, tag) {
      while (el.parentNode) {
        el = el.parentNode;
        if (el.tagName === tag)
          return el;
      }
      return null;
    }

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
    // console.log('max:', maxCells);

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

    var _tmp = document.getElementById('dataRowForDelete');
    // console.log('tmp', _tmp);

    if ( _tmp !== null ) {
      _tmp.parentNode.removeChild( _tmp );
    };

    // добавляем специальную строку с данными
    var dataRow = document.createElement('tr');
    dataRow.className        = 'data';
    dataRow.id               = 'dataRowForDelete';
    dataRow.dataset.cellType = 'data';
    table.appendChild(dataRow);

    // считаем середины строк шапки
    for (var v = 0; v < headRows.length; v++) {
      var coordinates = headRows[v].getBoundingClientRect();

      console.log('*coordinates', coordinates);

      // // проверяем строки
      // var point = document.createElement('div');
      // point.className  = "point-head";
      // point.style.top  = (coordinates.top+coordinates.bottom)/2 + 'px';
      // point.style.left = (coordinates.left+coordinates.right)/2 + 'px';
      // document.body.appendChild(point);


      headRowsCenter.push( (coordinates.top+coordinates.bottom)/2 );
    };

    // считаем середины строк боковины
    for (var v = 0; v < sideRows.length; v++) {
      var coordinates = sideRows[v].getBoundingClientRect();

      // // проверяем строки
      // var point = document.createElement('div');
      // point.className  = "point-side";
      // point.style.top  = (coordinates.top+coordinates.bottom)/2 + 'px';
      // point.style.left = (coordinates.left+coordinates.right)/2 + 'px';
      // document.body.appendChild(point);


      sideRowsCenter.push( {center: (coordinates.top+coordinates.bottom)/2, el: sideRows[v] } );
    };

    // создаем строку с данными
    for (var i = 0; i < maxCells; i++) {
      var queryArray = [],
      dataCell                    = document.createElement('td');
      dataCell.style.whiteSpace   = 'nowrap';
      dataCell.style.textOverflow = 'ellipsis';
      dataCell.style.overflow     = 'hidden';
      dataCell.style.maxWidth     = 0;

      dataRow.appendChild(dataCell);
      coordinates = dataCell.getBoundingClientRect();

      dataRowsCenter.push( (coordinates.top+coordinates.bottom)/2 );

      // проходимся по центрам строкам и центрам ячеек чтобы получить элемент
      // for (var b = 0; b < headRowsCenter.length; b++) {
      //   var el = document.elementFromPoint( (coordinates.left+coordinates.right)/2, headRowsCenter[b] );
      //   console.log(el);

      //   // console.log('cell', cell);
      //   var coordinates = el.getBoundingClientRect();

      //   var point = document.createElement('div');
      //   point.className  = "point-head";
      //   point.style.top  = (coordinates.top  + coordinates.bottom)/2 + 'px';
      //   point.style.left = (coordinates.left + coordinates.right)/2  + 'px';
      //   document.body.appendChild(point);
      //   // console.log( (coordinates.left+coordinates.right)/2, headRowsCenter[b], dataCell.getBoundingClientRect() )
        
      //   if ( el.nodeName !== 'TD' ) {
      //     el = findUpTag(el, 'TD');
      //   };

      //   if ( el ) {

      //     dataCell.textContent += el.dataset.query ? el.dataset.query : [] ;
      //     queryArray.push( el );

      //   };
      // };
      // dataCell.dataset._query  = uniq(queryArray).map(function(e){ return e.dataset.query } ).join(',');
      // dataCell.dataset.percent = el.dataset.percent ? el.dataset.percent : false;
      // dataCell.dataset.appg    = el.dataset.appg    ? el.dataset.appg    : false;
    };
    console.log('dataRowsCenter', dataRowsCenter);

    for (var i = dataRow.cells.length - 1; i >= 0; i--) {
      var _cell = dataRow.cells[i],
          coordinates = _cell.getBoundingClientRect(),
          query = [],
          previousElement;

      for (var z = headRowsCenter.length - 1; z >= 0; z--) {
        var center = headRowsCenter[z];
        
        // var point = document.createElement('div');
        // point.className  = "point-head";
        // point.style.top  = center + 'px';
        // point.style.left = (coordinates.left + coordinates.right)/2  + 'px';
        // document.body.appendChild(point);

        var headCell = document.elementFromPoint( (coordinates.left + coordinates.right)/2 , center );

        if ( !previousElement || previousElement == headCell ) {
          previousElement = headCell;
          console.log( previousElement, headCell );
        }

        // var _q = [];

        // console.log( 'headCell', headCell, headCell.dataset );

        if ( headCell.dataset.hasOwnProperty('query') ) {
          query.push( headCell.dataset.query );
        };
        if ( headCell.dataset.hasOwnProperty('appg') ) {
          query.push( JSON.stringify({cell: {value: 'appg', year: '2012'}}) );
        };
        // query.push(_q);

        // if ( _q.hasOwnProperty('query') ) {
        //   query.push( JSON.stringify(_q) );
        // };
        // if ( _q.hasOwnProperty('type') ) {
        //   var h = { cell: _q };
        //   query.push( JSON.stringify( h ) );
        // }
      };

      query = uniq(query);
      if ( query.length ) {
        _cell.dataset.query = query;
      };
    };

    var rowSpan  = 0,
        rowQuery = [];
    // for (var d = sideRows.length - 1; d >= 0; d--) {
    for (var d = 0; d < sideRows.length; d++) {
      
      var row   = sideRows[d],
          query = [];
      console.log('row', row);

      for (var a = 0; a < row.cells.length; a++) {
        var cell = row.cells[a];

        if ( cell.rowSpan > 1 ) {
          rowQuery = [];

          rowSpan = cell.rowSpan;
          if ( cell.dataset.hasOwnProperty('query') ) {
            rowQuery.push( cell.dataset.query );
            rowQuery = uniq(rowQuery);
          };
        };

        if ( cell.classList.contains(sideClass) ) {

          if ( cell.dataset.hasOwnProperty('query') ) {
            query.push( cell.dataset.query );
          };

          if ( rowQuery.length ) {
            query.concat( rowQuery );
          };

        }
        else {

          var coordinates = cell.getBoundingClientRect(),
              ___dataCell = document.elementFromPoint( (coordinates.left + coordinates.right)/2 , dataRowsCenter[a] ),
              ___query = [];

          // var point = document.createElement('div');
          // point.className  = "point-head";
          // point.style.top  = dataRowsCenter[a] + 'px';
          // point.style.left = (coordinates.left + coordinates.right)/2  + 'px';
          // document.body.appendChild(point);

          if (rowQuery.length) {
            ___query = ___query.concat(rowQuery);
          };

          ___query = uniq(query);
          var result = [];
          result = result.concat(___query);
          result = result.concat(rowQuery);

          if ( ___dataCell.dataset.hasOwnProperty('query') ) {
            result = result.concat( JSON.stringify(___dataCell.dataset) );
            console.log( '++', ___dataCell.dataset.query);
            // var _h = JSON.parse('['+___dataCell.dataset.query+']');
            // console.log('_h', _h);
            // if ( h.hasOwnProperty('type') ) {
            //   console.log( '+++++++', h.type );
            //   // result = result.concat( ___dataCell.dataset.query.type )
            // };
            // if ( ___dataCell.dataset.query.hasOwnProperty('query') ) {
            //   result = result.concat( ___dataCell.dataset.query.query )
            // };
          };

          result = uniq(result);
          result = '{"data":['+result.join(',')+']}';
          
          // console.log(cell, result );
          console.log(cell, JSON.parse(result) );
          // console.log(' --> cell', cell, '__q:', ___query, 'q:',query, 'rq:', rowQuery, '___dataCell:', ___dataCell.dataset );
        };
      };

      // console.log('row query -> ', query);
      rowSpan  = 0;
      // rowQuery = [];
    };

    // 
      // for (var b = 0; b < sideRowsCenter.length; b++) {
        
      //   var row       = sideRowsCenter[b].el,
      //       rowCenter = sideRowsCenter[b].center,
      //       rowQuery  = [],
      //       index     = 1;

      //   for (var n = 0; n < row.cells.length; n++) {
      //     var cell = row.cells[n];

      //     if ( cell.classList.contains( sideClass ) && cell.rowSpan > 1 ) {
      //       rowRoot = cell.dataset;
      //       index = cell.rowSpan;
      //       index++;
      //     }

      //     // 1) считаем критерии шапки в отдельную cтроку
      //     // 2) собираем результирующие query для крайнего элемента таблицы
      //     // 3) при обходе таблицы прюсуюем к dataCell.query результирующую query
      //     // ...
      //     // profit!
          
      //     if (cell.classList.contains( sideClass )){
      //       rowQuery = [];
      //       index++;

      //       if ( rowRoot.query ) {
      //         rowQuery.push( rowRoot.query );
      //       };

      //       if ( cell.dataset.query ) {
      //         rowQuery.push( cell.dataset.query );
      //       };
            
      //     } else {
      //       // console.log( 'rowRoot', rowRoot, rowQuery, cell );
      //       // проверяем строки

      //       var _f = dataRow.getElementsByTagName('td')[cell.cellIndex],
      //           _s = dataRow.getElementsByTagName('td')[cell.cellIndex+index],
      //           _q = (_f && _f.dataset._query) ? _f : (_s && _s.dataset._query ? _s : undefined)
            
      //       if (_q) {
      //         rowQuery.push( _q.dataset._query );
      //       };
            
      //       var _tmp = [];

      //       for (var i = 0; i < rowQuery.length; i++) {
      //         if( rowQuery[i] !== ',' ) {
      //           var _str = rowQuery[i];
      //           _str = _str.replace(/^,+/gi, '');
      //           _str = _str.replace(/,+]$/gi, ']');
      //           _tmp.push( _str );
      //         }
      //       };
      //       // console.log('***tmp', _tmp);

      //       cell.dataset.query = '['+_tmp.join(',')+']';
            
      //       rowQuery = [];
            
      //       // обновим текст когда прилетят данные
      //       cell.dataset.cellIndex = cell.cellIndex;
      //       cell.dataset.rowIndex  = row.rowIndex;

      //       cellData.push({
      //         rowIndex  : row.rowIndex,
      //         cellIndex : cell.cellIndex,
      //         query     : cell.dataset.query,
      //         appg      : _q.dataset.appg,
      //         percent   : _q.dataset.percent
      //         // black     : cell.dataset.black,
      //       });
      //     }
      //   };
      // };
      // dataRow.style.display = 'none';
      // console.log( 'cellData:', cellData );
      // console.log( 'str', JSON.stringify(cellData) );
      // nCore.modules.table.event.publish('calculateQuery', cellData);
   },
  event = function event(){
    return nCoreTableEvent;
   },
  uniq = function (a) {
    var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

    return a.filter(function(item) {
      var type = typeof item;
      if(type in prims)
        return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
      else
        return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
   };

  return {
    init       : init,
    merge      : merge,
    config     : config,
    row        : row,
    column     : column,
    event      : event,
    activeCell : activeCell,
    tableQuery : generateQueryFromTable
  }
})();