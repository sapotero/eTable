"use strict";

// var nCore.modules.table = nCore.modules.table || {};
var nCore = nCore || {};
nCore.document = (function(){
  var nCoreDocumentId = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER)), root;

  var init = function init(config){
    root = document.getElementById( config.nCoreDocumentId );
    root.textContent += "_" + nCoreDocumentId;
  }, 
  id = function id() {
    return nCoreDocumentId;
  };
  
  return {
    init : init,
    id   : id
  };
})();

nCore.document.init({ nCoreDocumentId: 'nCoreDocumentId' });