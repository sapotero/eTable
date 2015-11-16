"use strict";

// var nCore.modules.table = nCore.modules.table || {};
var nCore = nCore || {};
nCore.modules.cellEditor = (function(){
  
  var root, fontSize;
  
  function attachEvent(config){    
    fontSize.addEventListener('keypress', function (e) {
      var cell = nCore.modules.table.activeCell();

      if ( cell ) {
        cell.textContent = fontSize.value;
      };
    });

  };

  return {
    init: function(config){
      root     = document.getElementById( config.tab ),
      fontSize = document.getElementById( config.fontSize );
      
      attachEvent();
    },
    setFontSize: function(element){
      fontSize.value = element.textContent;
    }
  }
})();

nCore.modules.cellEditor.init( {
  tab:  'nCoreTabConfigText',
  fontSize: 'nCoreTabConfigTextFontSize'
});