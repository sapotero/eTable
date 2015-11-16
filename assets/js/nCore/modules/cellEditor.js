"use strict";

// var nCore.modules.table = nCore.modules.table || {};
var nCore = nCore || {};
nCore.modules.cellEditor = (function(){
  
  var root, fontSize, cellText;
  
  function attachEvent(){
    cellText.addEventListener('keypress', function (e) {
      var cell = nCore.modules.table.activeCell();

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
      root     = document.getElementById( config.tab ),
      cellText = document.getElementById( config.cellText ),
      fontSize = document.getElementById( config.fontSize );
      
      attachEvent();
     },
    setFontSize: function(element){
      // fontSize.value = element.textContent;
     },
    setText: function(element){
      cellText.focus();
      cellText.value = element.textContent;
     }
  }
})();

nCore.modules.cellEditor.init( {
  tab:      'nCoreTabConfigText',
  fontSize: 'nCoreTabConfigTextFontSize',
  cellText: 'nCoreTabConfigCellText'
});