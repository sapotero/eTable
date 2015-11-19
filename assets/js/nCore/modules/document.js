"use strict";

// var nCore.modules.table = nCore.modules.table || {};
var nCore = nCore || {};
nCore.document = (function(){
  var nCoreDocumentId = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER)),
      nCoreRoot = {},
      nCoreDocumentSave,
      nCoreDocumentEvent = {},
      nCoreIsNew = true;

  var init = function (config){
    nCoreRoot         = document.getElementById( config.nCoreDocumentId );
    nCoreDocumentSave = document.getElementById( config.nCoreDocumentSave );

    nCoreRoot.textContent += "_" + nCoreDocumentId;
    nCore.core.attachTo( nCore.document.root );
    attachEvent();
  },
  id = function () {
    return nCoreDocumentId;
  },
  root = function root(){
    return nCoreRoot;
  },
  event = function event(){
    return nCoreDocumentEvent;
  },
  attachEvent = function(){
    nCoreDocumentSave.addEventListener('click', function (e) {
      nCore.document.root.publish('saveDocument', nCoreDocumentId );
    });
  },
  newDocument = function newDocument() {
    return nCoreIsNew;
  };
  
  return {
    init  : init,
    id    : id,
    root  : root,
    event : event,
    newDocument : newDocument
  };
})();

nCore.document.init({
  nCoreDocumentId   : 'nCoreDocumentId',
  nCoreDocumentSave : 'nCoreDocumentSave'
});