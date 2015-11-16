"use strict";

// var nCore.modules.table = nCore.modules.table || {};
var nCore = nCore || {};
nCore.query = (function(){

  var init = function(){
   },
  post = function( config ){
    console.log('query -> post -> ', config);
   },
  get  = function( config ){
    console.log('query -> get -> ', config);
   },
  getQuery  = function( url ){
    console.log('query -> getQuery -> ', url);
    
   },
  getQueryParam  = function( config ){
    console.log('query -> getQueryParam -> ', config);
   };

  return {
    init          : init,
    post          : post,
    get           : get,
    getQuery      : getQuery,
    getQueryParam : getQueryParam
  }
})();
nCore.query.init();
var data = nCore.query.getQuery('http://localhost:3000/query/index.json');