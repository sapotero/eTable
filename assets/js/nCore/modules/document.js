"use strict";

// модуль предоставляющий интерфейс для работы с документом (отчет, печатная форма, бизнес-процесс)

var nCore = nCore || {};
nCore.document = (function(){
  var nCoreDocumentId = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER)),
      nCoreRoot = {},
      nCoreDocumentSave,
      nCoreDocumentEvent = {},
      nCoreIsNew = true,
      nCoreTitle,
      nCoreDescription;

  var init = function (config){
    nCoreRoot         = document.getElementById( config.nCoreDocumentId );
    nCoreDocumentSave = document.getElementById( config.nCoreDocumentSave );

    nCoreRoot.textContent += "_" + nCoreDocumentId;
    nCore.core.attachTo( nCore.document.root );
  },
  id = function () {
    return nCoreDocumentId;
  },
  root = function root(){
    return nCoreRoot;
  },
  title = function title(){
    return nCoreTitle;
  },
  description = function description(){
    return nCoreDescription;
  },
  event = function event(){
    return nCoreDocumentEvent;
  },
  newDocument = function newDocument() {
    return nCoreIsNew;
  },
  setAttributes = function setAttributes(data){
    console.log('setAttributes', data);
    nCore.document.root.publish('setDocumentAttribute', true);
  };
  
  return {
    init          : init,
    id            : id,
    title         : title,
    setAttributes : setAttributes,
    description   : description,
    root          : root,
    event         : event,
    newDocument   : newDocument
  };
})();

nCore.document.init({
  nCoreDocumentId   : 'nCoreDocumentId',
  nCoreDocumentSave : 'nCoreDocumentSave'
});