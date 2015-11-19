"use strict";

// var nCore.modules.table = nCore.modules.table || {};
var nCore = nCore || {};
nCore.events = (function(){
  // nCore.document.root.publish('saveDocument', nCoreDocumentId );
  
  var init = function init (){
    nCore.document.root.publish('saveDocument', nCoreDocumentId );
  };

  return {
    init  : init,
  };
})();

nCore.events.init();