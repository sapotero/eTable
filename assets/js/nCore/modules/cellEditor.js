"use strict";

// var nCore.modules.table = nCore.modules.table || {};
var nCore = nCore || {};
nCore.modules.cellEditor = (function(config){
  
  var root;

  return {
    init: function(){
      root = document.getElementById( config.tab );
    },
    setFontSize: function(element){
      root
    }
  }
})();

nCore.modules.cellEditor.init( { tab: 'nCoreTabConfigText' } );