"use strict";

// var nCore.modules.table = nCore.modules.table || {};
var nCore = nCore || {};
nCore.modules.cellEditor = (function(){
  
  var root, fontSize, cellText;
  
  function attachEvent(){
    cellText.addEventListener('keypress', function (e) {
      var cell = nCore.modules.table.activeCell();
      console.log( typeof(cell) );
      if ( typeof(cell) != 'function' ) {
        cell.textContent = cellText.value;
      };
    });

    fontSize.addEventListener('click', function (e) {
      var cell = nCore.modules.table.activeCell();
      if ( typeof(cell) != 'function' ) {
        console.log('fontSize: ', cell);
        cell.style.fontSize = fontSize.value + 'px';
      };
    });
  };

  return {
    init: function(config){
      root     = document.getElementById( config.tab );
      cellText = document.getElementById( config.cellText );
      fontSize = document.getElementById( config.fontSize );
      attachEvent();


      // подписываемся на изменения параметров текста и размера
      nCore.core.attachTo( nCore.modules.cellEditor.cellText );
      nCore.core.attachTo( nCore.modules.cellEditor.fontSize );

      nCore.modules.cellEditor.cellText.subscribe('nameChange', function(args){
        if ( typeof(args) === 'function' ) {
          args();
        };
        console.log( args, 'in nCore.modules.cellEditor' );
      });
     },

    root     : function(){
      return root;
     },
    cellText : function(){
      return cellText;
     },
    fontSize : function(){
      return fontSize;
     },

    setFontSize: function(element){
      // fontSize.value = element.textContent;
     },
    setText: function(element){
      cellText.value = element.textContent;
      cellText.focus();
     }
  }
})();

nCore.modules.cellEditor.init( {
  tab:      'nCoreTabConfigText',
  fontSize: 'nCoreTabConfigTextFontSize',
  cellText: 'nCoreTabConfigCellText'
});

