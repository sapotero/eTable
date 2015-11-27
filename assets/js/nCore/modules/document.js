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
      nCoreName = '',
      nCoreDescription = '',
      nCoreDocumentCellQuery;

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
  setName = function setName(name){
    nCoreName = name;
  },
  name = function name(){
    return nCoreName;
  },
  type = function type(){
    return nCoreType;
  },
  setDescription = function setDescription(description){
    nCoreDescription = description;
  },
  description = function description(){
    return nCoreDescription;
  },
  setCellQuery = function setCellQuery(data){
    nCoreDocumentCellQuery = data;
  },
  cellQuery = function cellQuery(){
    return nCoreDocumentCellQuery;
  },
  event = function event(){
    return nCoreDocumentEvent;
  },
  newDocument = function newDocument() {
    return nCoreIsNew;
  },
  setAttributes = function setAttributes(data){
    nCoreIsNew = false;
    nCore.document.root.publish('setDocumentAttributes', data);
  };
  
  return {
    init           : init,
    id             : id,
    name           : name,
    description    : description,
    type           : type,
    root           : root,
    event          : event,
    newDocument    : newDocument,
    cellQuery      : cellQuery,
    setName        : setName,
    setDescription : setDescription,
    setAttributes  : setAttributes,
    setCellQuery   : setCellQuery
  };
})();

nCore.document.init({
  nCoreDocumentId   : 'nCoreDocumentId',
  nCoreDocumentSave : 'nCoreDocumentSave'
});