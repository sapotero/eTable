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
        query   : 'c13_query_obl_2',
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
    })

var headerCell = new CellHeader({
    caption : 'main',
    query   : 'query_register',
    root    : true
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
    })



var table = document.getElementById('points'),
    tableHead = table.getElementsByTagName('thead')[0],
    tableBody = table.getElementsByTagName('tbody')[0],
    data_length = 5;

sideCell.each( function(cell){
  if (!cell.root) {
    var a = side(cell, undefined, true);
    tableBody.appendChild( a );
  };
});


headerCell.each( function(cell){
  if (!cell.root) {
    var a = side(cell, undefined, true);
    tableBody.appendChild( a );
  };
});

function side(cell, el, main){
  // var main = true;
  // console.log(cell, el, main);

  var el = new DocumentFragment();

  if ( cell.hasChilds() ) {
      cell.each( function(item){
      var row = document.createElement('tr');

      // если есть родительская клетка и у ней есть потомки
      // делаем такую штуку
      if ( main ) {
        var td = document.createElement('td');
        td.rowSpan = cell.childrens().length;
        td.textContent = cell.query;
        td.className = 'query'
        row.appendChild(td);
        main = false
      };

      // // все остальные
      var td = document.createElement('td');
      td.textContent = item.query;
      td.className = 'query'
      row.appendChild(td);

      for (var _data_counter = 0; _data_counter < data_length; _data_counter++) {
        var td_data = document.createElement('td');
        td_data.textContent = 'data';
        
        row.appendChild(td_data);
      };

      el.appendChild(row);
    });
  } else {
    console.log(cell);
    var row = document.createElement('tr');
    var td = document.createElement('td');
    td.colSpan = 2;
    td.textContent = cell.query;
    td.className = 'query'
    row.appendChild(td);

    for (var _data_counter = 0; _data_counter < data_length; _data_counter++) {
      var td_data = document.createElement('td');
      td_data.textContent = 'data';
      
      row.appendChild(td_data);
    };
    el.appendChild(row);
  }
  return el;
};

function head(cell, el, main){
  // var main = true;
  // console.log(cell, el, main);

  var el = new DocumentFragment();

  if ( cell.hasChilds() ) {
      cell.each( function(item){
      var row = document.createElement('tr');

      // если есть родительская клетка и у ней есть потомки
      // делаем такую штуку
      if ( main ) {
        var td = document.createElement('td');
        td.rowSpan = cell.childrens().length;
        td.textContent = cell.query;
        td.className = 'query'
        row.appendChild(td);
        main = false
      };

      // // все остальные
      var td = document.createElement('td');
      td.textContent = item.query;
      td.className = 'query'
      row.appendChild(td);

      for (var _data_counter = 0; _data_counter < data_length; _data_counter++) {
        var td_data = document.createElement('td');
        td_data.textContent = 'data';
        
        row.appendChild(td_data);
      };

      el.appendChild(row);
    });
  } else {
    console.log(cell);
    var row = document.createElement('tr');
    var td = document.createElement('td');
    td.colSpan = 2;
    td.textContent = cell.query;
    td.className = 'query'
    row.appendChild(td);

    for (var _data_counter = 0; _data_counter < data_length; _data_counter++) {
      var td_data = document.createElement('td');
      td_data.textContent = 'data';
      
      row.appendChild(td_data);
    };
    el.appendChild(row);
  }
  return el;
};

function createIndex(){

};


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