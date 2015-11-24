var Cell = function(data) {
  this.index     = 0;
  this.cellIndex = data.cellIndex   || 0;
  this.items     = data.items       || [];
  this.query     = data.query       || undefined;
  this.caption   = data.caption     || undefined;
  this.parent    = data.parent      || this;
  this.childs    = data.childrens   || [];
  this.root      = data.root        || false;

  if ( data.parent ) {
    this.parent.addChild(this);
    // this.cellIndex++;
    data.parent.add( this );
  };

  if (this.parent !== this ) {
    this.cellIndex++;
  };
};
 
Cell.prototype = {
  // переопределить для того чтобы была возможность сериализовать в JSON
  toJSON : function(){
    return {
      index: this.index,
      query: this.query,
      caption: this.caption,
      child: this.childs,
      // parent: this.parent
    }
  },
  // get/set parent/childrens
  parent        : function(data){
    return this.parent;
   },
  childrens     : function(){
    return this.childs;
   },
  setParent     : function(data){
    this.parent = data;
   },
  setChilds     : function(data){
    this.childrens = data;
   },
  addChild      : function(data){
    this.childs.push(data);
   },
  hasChilds     : function() {
    return this.childs.length > 0;
   },
  hasParent     : function() {
    return this.parent == this;
   },
  query     : function() {
    return this.query;
   },
  // generate query
  generateQuery : function(){
    var query = "";
    var childrens = this.childrens() || [];

    console.log('childrens: ', childrens);

    if (childrens.length) {
      for (var i = childrens.length - 1; i >= 0; i--) {
        query += childrens[i].query + "|";
      };
    };

    console.log(query);

    return query;
   },

  // iterator template
  add           : function(data) {
    this.items.push(data);
    return this.next();
   },
  first         : function() {
    this.reset();
    return this.next();
   },
  next          : function() {
    return this.items[this.index++];
   },
  hasNext       : function() {
    return this.index <= this.items.length;
   },
  reset         : function() {
    this.index = 0;
   },
  each          : function(callback) {
    for (var item = this.first(); this.hasNext(); item = this.next()) {
      callback(item);
    }
   },
  nextCellIndex : function (){
    this.cellIndex++;
    return this.cellIndex;
   }
};


var CellHeader =function(data) {
  this.index     = 0;
  this.cellIndex = data.cellIndex   || 0;
  this.items     = data.items       || [];
  this.query     = data.query       || undefined;
  this.caption   = data.caption     || undefined;
  this.parent    = data.parent      || this;
  this.childs    = data.childrens   || [];
  this.root      = data.root        || false;

  if ( data.parent ) {
    this.parent.addChild(this);
    // this.cellIndex++;
    data.parent.add( this );
  };

  if (this.parent !== this ) {
    this.cellIndex++;
  };
};
CellHeader.prototype.constructor = CellHeader;
CellHeader.prototype = Object.create(Cell.prototype, {
  run: {
    writable: true,
    configurable:true,
    value: function(){
      console.log(this);
    }
  }
});

// side menu
var sideCell = new Cell({
    caption : 'main',
    query   : 'query_register',
    root    : true
  }),
    c1 = new Cell({
      caption : 'msk',
      query   : 'c1_query_msk',
      parent  : sideCell
    }),
      c11 = new Cell({
        caption : 'obl_1',
        query   : 'c11_query_obl_1',
        parent  : c1
      }),
      c12 = new Cell({
        caption : 'obl_2',
        query   : 'c12_query_obl_2',
        parent  : c1
      }),
      c13 = new Cell({
        caption : 'obl_3',
        query   : 'c13_query_obl_3',
        parent  : c1
      }),
    c2 = new Cell({
      caption : 'obl',
      query   : 'c2_query_obl',
      parent  : sideCell
    }),
      c21 = new Cell({
        caption : 'obl_1',
        query   : 'c2_query_obl_1',
        parent  : c2
      }),
      c22 = new Cell({
        caption : 'obl_2',
        query   : 'c2_query_obl_2',
        parent  : c2
      }),
    c3 = new Cell({
      caption : 'obl',
      query   : 'c3_query_obl',
      parent  : sideCell
    }),
      c31 = new Cell({
        caption : 'obl_1',
        query   : 'c3_query_obl_1',
        parent  : c3
      }),
      c32 = new Cell({
        caption : 'obl_3',
        query   : 'c3_query_obl_3',
        parent  : c3
      }),
    c4 = new Cell({
      caption : 'obl',
      query   : 'c4_query_obl',
      parent  : sideCell
    }),
      c41 = new Cell({
        caption : 'obl_1',
        query   : 'c4_query_obl_1',
        parent  : c4
      }),
      c42 = new Cell({
        caption : 'obl_3',
        query   : 'c4_query_obl_3',
        parent  : c4
      }),
    c5 = new Cell({
      caption : 'obl',
      query   : 'c5_query_obl',
      parent  : sideCell
    }),
    c6 = new Cell({
      caption : 'obl',
      query   : 'c6_query_obl',
      parent  : sideCell
    }),
    c7 = new Cell({
      caption : 'obl',
      query   : 'c7_query_obl',
      parent  : sideCell
    }),
    c8 = new Cell({
      caption : 'obl',
      query   : 'c8_query_obl',
      parent  : sideCell
    }),
      c81 = new Cell({
        caption : 'obl_1',
        query   : 'c8_query_obl_1',
        parent  : c8
      }),
      c82 = new Cell({
        caption : 'obl_3',
        query   : 'c8_query_obl_3',
        parent  : c8
      });

var headerCell = new CellHeader({
    caption : 'main',
    query   : 'query_register',
    root    : true
  }),
    c55 = new CellHeader({
      caption : 'header_obl',
      query   : 'header_c55_query_obl',
      parent  : headerCell
    }),
    c1 = new CellHeader({
      caption : 'header_msk',
      query   : 'header_c1_query_msk',
      parent  : headerCell
    }),
      c11 = new CellHeader({
        caption : 'header_obl_1',
        query   : 'header_c11_query_obl_1',
        parent  : c1
      }),
      c12 = new CellHeader({
        caption : 'header_obl_2',
        query   : 'header_c12_query_obl_2',
        parent  : c1
      }),
      c13 = new CellHeader({
        caption : 'header_obl_3',
        query   : 'header_c13_query_obl_2',
        parent  : c1
      }),
    c2 = new CellHeader({
      caption : 'header_obl',
      query   : 'header_c2_query_obl',
      parent  : headerCell
    }),
      c21 = new CellHeader({
        caption : 'header_obl_1',
        query   : 'header_c2_query_obl_1',
        parent  : c2
      }),
      c22 = new CellHeader({
        caption : 'header_obl_2',
        query   : 'header_c2_query_obl_2',
        parent  : c2
      }),
    c3 = new CellHeader({
      caption : 'header_obl',
      query   : 'header_c3_query_obl',
      parent  : headerCell
    }),
      c31 = new CellHeader({
        caption : 'header_obl_1',
        query   : 'header_c3_query_obl_1',
        parent  : c3
      }),
      c32 = new CellHeader({
        caption : 'header_obl_3',
        query   : 'header_c3_query_obl_3',
        parent  : c3
      }),
    c4 = new CellHeader({
      caption : 'header_obl',
      query   : 'header_c4_query_obl',
      parent  : headerCell
    }),
      c41 = new CellHeader({
        caption : 'header_obl_1',
        query   : 'header_c4_query_obl_1',
        parent  : c4
      }),
      c42 = new CellHeader({
        caption : 'header_obl_3',
        query   : 'header_c4_query_obl_3',
        parent  : c4
      }),
    c5 = new CellHeader({
      caption : 'header_obl',
      query   : 'header_c5_query_obl',
      parent  : headerCell
    }),
    c6 = new CellHeader({
      caption : 'header_obl',
      query   : 'header_c6_query_obl',
      parent  : headerCell
    });



var table       = document.getElementById('points'),
    tableHead   = table.getElementsByTagName('thead')[0],
    tableBody   = table.getElementsByTagName('tbody')[0],
    data_length = 0,
    data_head   = 0,
    data_side   = 0,
    head_tr     = document.createElement('tr'),
    data_tr     = document.createElement('tr'),
    total_tr    = document.createElement('tr');

tableHead.appendChild(head_tr);
tableHead.appendChild(data_tr);
tableHead.appendChild(total_tr);

// вначале строим шапку, чтобы понять сколько полей с данными будет в таблице
headerCell.each( function(cell){
  // console.log('+', cell)
  if (!cell.root) {
    var a = head(cell, head_tr, data_tr, true);
    tableHead.appendChild( a );
  };
});


// считаем кол-во полей для боковины
swapElements(head_tr, data_tr);
for (var i = 0; i < head_tr.childNodes.length; i++) {
  // console.log ( head_tr.childNodes[i].hasOwnProperty('colSpan') );
  if ( head_tr.childNodes[i].rowSpan > 1 ) {
    data_head++;
  };
};
data_length += data_tr.childNodes.length + data_head;


// потом строим боковину
sideCell.each( function(cell){
  if (!cell.root) {
    var a = side(cell, undefined, true);
    tableBody.appendChild( a );
  };
});

// и считаем индекс у ячеек + критерии поиска по ним + делаем в шапке ещё одну ячейку №
// так же обходим ячейки и считаем все критерии поиска, которые не посчитаны
var indexCell = document.createElement('td');
indexCell.rowSpan = data_head;
indexCell.colSpan = data_side;
head_tr.insertBefore(indexCell, head_tr.childNodes[0]);

var _a = head_tr.getElementsByTagName('td'),
    _a_index = [];

for (var z = 0; z < _a.length; z++) {
  if ( _a[z].rowSpan > 1 && _a[z].dataset.hasOwnProperty('query') ) {
    // console.log(_a[z]);
    for (var i = 0, row; row = tableBody.rows[i]; i++) {
      for (var j = 0, col; col = row.cells[j]; j++) {
        if ( col.textContent.match(/\`/g) ) {
          col.innerHTML = col.innerHTML.replace("`", '<i class="red">'+_a[z].dataset.query+"</i>" );
          // console.log(col);
          break;
        };
      }
    }
  };
};



function side(cell, el, main){
  // var main = true;
  // console.log(cell, el, main);
  var el = new DocumentFragment();

  if ( cell.hasChilds() ) {
             data_side = 2;
      var _row_counter = 0,
          _row_query   = '',
          _ch_counter  = 0;

      cell.each( function(item){
        var query = '';
        var row = document.createElement('tr');
        _ch_counter++;

        // если есть родительская клетка и у ней есть потомки
        // делаем такую штуку
        if ( main ) {
          var td = document.createElement('td');
          td.rowSpan = cell.childrens().length;
          td.textContent = cell.query;
          td.className = 'query'
          row.appendChild(td);
          _row_query = cell.query;
          _row_counter = cell.childrens().length;
          main = false
        };

        // // все остальные
        var td = document.createElement('td');
        td.textContent = item.query;
        td.className = 'query'
        row.appendChild(td);

        if ( _row_counter > 0 ) {
          _row_counter--;
          query += _row_query + ' * ' + item.query;
        };

        for (var _data_counter = 0; _data_counter < data_length; _data_counter++) {
          var td_data = document.createElement('td');
          td_data.textContent = query;
          td_data.dataset.cellType = 'data';
          row.appendChild(td_data);

          // console.log(td_data, td_data.cellIndex);

          var _mod = 2;

          switch (_ch_counter){
            case 1:
              _mod = 2;
              break;
            case 2:
              _mod = 1;
              break;
            default:
              _mod = 1;
              break;
          };

          var _head_cell_data = data_tr.childNodes[td_data.cellIndex-_mod];
          var _head_cell_data_query = '`';
          
          if ( typeof(_head_cell_data) !== 'undefined' ) {
             _head_cell_data_query = _head_cell_data.dataset.query
          };
          td_data.innerHTML += ' | <i class="red">'+ _head_cell_data_query +'</i> |'
        };

      el.appendChild(row);
    });
  } else {
    // console.log(cell);
    var row = document.createElement('tr');
    var td = document.createElement('td');
    td.colSpan = 2;
    td.textContent = cell.query;
    td.className = 'query'
    row.appendChild(td);

    for (var _data_counter = 0; _data_counter < data_length; _data_counter++) {
      var td_data = document.createElement('td');
      td_data.textContent = cell.query;
      td_data.dataset.cellType = 'data';
      row.appendChild(td_data);

      var _mod = 2;
      
      switch (_ch_counter){
        case 1:
          _mod = 2;
          break;
        case 2:
          _mod = 1;
          break;
        default:
          _mod = 1;
          break;
      };

      var _head_cell_data = data_tr.childNodes[td_data.cellIndex-_mod];
      var _head_cell_data_query = '`'
      if ( typeof(_head_cell_data) !== 'undefined' ) {
         _head_cell_data_query = _head_cell_data.dataset.query
      };

      td_data.innerHTML += ' | <i class="red">'+ _head_cell_data_query +'</i> |';

    };
    el.appendChild(row);
  }
  return el;
};

function head(cell, head_tr, data_tr, main){
  // var main = true;
  // console.log(cell, el, main);

  var el = new DocumentFragment();

  if ( cell.hasChilds() ) {
      var _head_data = '';
      cell.each( function(item){

      // если есть родительская клетка и у ней есть потомки
      // делаем такую штуку
      if ( main ) {
        var td = document.createElement('td');
        td.colSpan = cell.childrens().length;
        td.textContent = cell.query;
        td.className = 'query'
        head_tr.appendChild(td);
        td.dataset.query = cell.query;
        _head_data = cell.query;

        main = false
      }

      // // все остальные
      var td = document.createElement('td');
      td.textContent = item.query;
      td.className = 'query'
      td.dataset.query = _head_data + " | " + item.query;
      data_tr.appendChild(td);

      el.appendChild(data_tr);
    });
  } else {

    var td = document.createElement('td');
    td.rowSpan = 2;
    td.textContent = cell.query;
    td.className = 'query'
    td.dataset.query = cell.query;

    head_tr.appendChild(td);
    el.appendChild(head_tr);
  }
  return el;
};

function swapElements(el1, el2) {
    el2.nextSibling === el1
    ? el1.parentNode.insertBefore(el2, el1.nextSibling)
    : el1.parentNode.insertBefore(el2, el1); 
}

// $('#cellFabrick').click(function(){
  //   var table = document.getElementById('table'),
  //     tHead = table.tHead,
  //     tBody = table.tBody;
      
  //   console.log ( drawChild( cell, $('#test4'), '*') )
  //   console.log ( drawChild( cell, $('#test5'), '*') )
  // });


  // // рабочий вариант для боковины, собирает 
  // // function tableCreator(e, t) {
  // //     function i(e, t) {
  // //         var n = "";
  // //         var r = "";
  // //         var s = "";
  // //         $.each(t[0], function(e, t) {
  // //             s += "<th>" + e + "</th>"
  // //         });
  // //         $.each(t, function(e, t) {
  // //             r += "<tr>";
  // //             $.each(t, function(e, t) {
  // //                 var n = 1 + Math.floor(Math.random() * 90 + 10);
  // //                 var s = $.isPlainObject(t);
  // //                 var o = [];
  // //                 if (s) {
  // //                     o = $.makeArray(t)
  // //                 }
  // //                 if ($.isArray(t) && t.length > 0) {
  // //                     r += "<td><div><a href='#" + n + "' data-toggle='collapse' data-parent='#msgReport'><span class='glyphicon glyphicon-plus'></span></a><div id='" + n + "' class='panel-collapse collapse'>" + i(e, t) + "</div></div></td>"
  // //                 } else {
  // //                     if (o.length > 0) {
  // //                         r += "<td><div><a href='#" + n + "' data-toggle='collapse' data-parent='#msgReport'><span class='glyphicon glyphicon-plus'></span></a><div id='" + n + "' class='panel-collapse collapse'>" + i(e, o) + "</div></div></td>"
  // //                     } else {
  // //                         r += "<td>" + t + "</td>"
  // //                     }
  // //                 }
  // //             });
  // //             r += "</tr>"
  // //         });
  // //         n += "<table class='table table-bordered table-hover table-condensed'><thead>" + s + "</thead><tbody>" + r + "</tbody></table>";
  // //         return n
  // //     }
  // //     $(t).empty();
  // //     $(t).append("<table id='parentTable' class='table table-bordered table-hover table-condensed'><thead></thead><tbody></tbody></table>");
  // //     var n = "";
  // //     var r = "";

  // //     $.each(e, function(e, t) {
  // //         n += "<th>" + e + "</th>";
  // //         var s = 1 + Math.floor(Math.random() * 90 + 10);
  // //         var o = $.isPlainObject(t);
  // //         var u = [];
  // //         if (o) {
  // //             u = $.makeArray(t)
  // //         }
  // //         if ($.isArray(t) && t.length > 0) {
  // //             r += "<td><div id='accordion'><a href='#" + s + "' data-toggle='collapse' data-parent='#msgReport'><span class='glyphicon glyphicon-plus'></span></a><div id='" + s + "' class='panel-collapse collapse'>" + i(e, t) + "</div></div></td>"
  // //         } else {
  // //             if (u.length > 0) {
  // //                 r += "<td><div id='accordion'><a href='#" + s + "' data-toggle='collapse' data-parent='#msgReport'><span class='glyphicon glyphicon-plus'></span></a><div id='" + s + "' class='panel-collapse collapse'>" + i(e, u) + "</div></div></td>"
  // //             } else {
  // //                 r += "<td>" + t + "</td>"
  // //             }
  // //         }
  // //     });

  // //     $("#parentTable thead").append("<tr>" + n + "</tr>");
  // //     $("#parentTable tbody").append("<tr>" + r + "</tr>");
      
  // //     $(".glyphicon ").on("click", function() {
  // //         var e = $(this).attr("class");
  // //         switch (e) {
  // //             case "glyphicon glyphicon-plus":
  // //                 $(this).removeClass("glyphicon-plus").addClass("glyphicon-minus");
  // //                 break;
  // //             case "glyphicon glyphicon-minus":
  // //                 $(this).removeClass("glyphicon-minus").addClass("glyphicon-plus");
  // //                 break;
  // //             default:
  // //         }
  // //     })
  // // }

  // // tableCreator(  cell, '#dyn' )

function generateQueryFromTable(table, headClass){
  var table     = table,
      headClass = headClass,
      maxCells  = 0,
      headRows  = [];

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
  
  // получаем уникальные строки таблицы
  for (var z = 0; z < head_elements.length; z++) {
    headRows.push(head_elements[z].parentNode)
  };
  headRows = uniq(headRows);

  // добавляем специальную строку с данными
  var dataRow = document.createElement('tr');
  dataRow.className = 'data';
  dataRow.dataset.cellType = 'data';
  table.appendChild(dataRow);

  // считаем середины строк шапки
  var headRowsCenter = [];
  for (var v = 0; v < headRows.length; v++) {
    var coordinates = headRows[v].getBoundingClientRect();
    console.log('row', headRows[v], coordinates)
    headRowsCenter.push( (coordinates.top+coordinates.bottom)/2 );
  };
  // создаем строку с данными
  for (var i = 0; i < maxCells; i++) {
    var dataCell = document.createElement('td');
    dataCell.dataset.cellType = 'data-cell';
    dataRow.appendChild(dataCell);

    var coordinates = dataCell.getBoundingClientRect();

    for (var b = 0; b < headRowsCenter.length; b++) {
      console.log(coordinates, el, (coordinates.left+coordinates.right)/2, headRowsCenter[b]);
      var el = document.elementFromPoint( (coordinates.left+coordinates.right)/2, headRowsCenter[b]);
      if ( el ) {
        dataCell.innerHTML += '<br>'+ el.innerHTML;
      };
    };


  };

  // // обходим все ноды и добавляем текст в строку с данными
  // for (var h = 0; h < headRows.length; h++) {

  //   var node = headRows[h].getElementsByTagName('td');
  //   console.log('node', node);

  //   var currentCellIndex = 0;
  //   var lastCellIndex = 0;
  //   for (var z = 0; z < node.length; z++) {
  //     console.log(node[z], node[z].getBoundingClientRect() );
  //     // var cell = node[z];
  //     // console.log()

  //     // // если colSpan больше единыцы, то клонируем значение из заголовка на все соседние ячейки
  //     // if ( cell.colSpan > 1 ) {
  //     //   lastCellIndex = currentCellIndex;
  //     //   for (var x = 0; x < cell.colSpan; x++) {
  //     //     currentCellIndex += x;
  //     //     console.log('***', cell, currentCellIndex);
  //     //     var dc = dataRow.getElementsByTagName('td')[lastCellIndex + cell.cellIndex];
  //     //     dc.textContent += '[' + cell.parentNode.rowIndex + ':' + cell.cellIndex +']';
  //     //   };
  //     //   // break;
  //     // } else {
  //     //   // если меньше, то пишем сразу
  //     //   console.log('*', cell);
  //     //   currentCellIndex++;
  //     //   var dc = dataRow.getElementsByTagName('td')[currentCellIndex];
  //     //   dc.textContent += ' > ' + cell.cellIndex;
  //     //   // console.log('index', cell, cell.cellIndex);
  //     //   // console.log( currentCellIndex, dc );
  //     // };
      
  //     };
  //   };
};

function uniq(a) {
  var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

  return a.filter(function(item) {
    var type = typeof item;
    if(type in prims)
      return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
    else
      return objs.indexOf(item) >= 0 ? false : objs.push(item);
  });
}