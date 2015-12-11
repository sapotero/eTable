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
      nCoreType = 'table',
      nCoreName = '',
      nCoreDescription = '',
      nCoreDocumentCellQuery;

  var init = function (config){
    var config = {
      nCoreDocumentId   : 'nCoreDocumentId',
      nCoreDocumentSave : 'nCoreDocumentSave'
    };

    nCoreRoot         = document.getElementById( config.nCoreDocumentId );
    nCoreDocumentSave = document.getElementById( config.nCoreDocumentSave );

    nCoreRoot.textContent += "_" + nCoreDocumentId;
    nCore.attachTo( nCore.document.root );
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
  setType = function setType(type){
    nCoreType = type;
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
  },
  load = function load(config){
    // nCoreDocumentId        = config.id;
    // nCoreType              = config.type;
    // nCoreDescription       = config.description;
    // author
    // body
    // datetime
    // name
    console.log( 'load', atob(config.body) );
    document.querySelector( '.fr-wrapper' ).classList.remove('show-placeholder');
    document.querySelector( '.fr-element.fr-view' ).innerHTML = atob(config.body);
  },
  createNew = function createNew(url){
    var overlayEl = mui.overlay('on');

    // set overlay options
    var options = {
      'keyboard': true,  // teardown when <esc> key is pressed (default: true)
      'static'  : false, // maintain overlay when clicked (default: false)
      'onclose' : function() {
      }
    };
    // initialize with child element
    var m = document.createElement('div');
    m.style.width = '400px';
    m.style.height = '100px';
    m.style.margin = '10% auto';
    m.style.padding = '10% auto';
    m.style.backgroundColor = '#fff';
    m.classList.toggle('mui-panel');
    m.classList.toggle('mui--z5');
    m.innerHTML = '<h4>Создание нового документа</h4><div class="loader"></div>';

    mui.overlay('on', options, m);
    setTimeout( function(){ 
      mui.overlay('off');
      $bodyEl.addClass('hide-sidedrawer');
      location.hash = "#tables/"+ ( url ? url: "new" )
    },1000);
  };
  
  return {
    init           : init,
    id             : id,
    name           : name,
    description    : description,
    type           : type,
    root           : root,
    event          : event,
    load           : load,
    newDocument    : newDocument,
    cellQuery      : cellQuery,
    setName        : setName,
    setType        : setType,
    setDescription : setDescription,
    setAttributes  : setAttributes,
    setCellQuery   : setCellQuery
  };
})();
