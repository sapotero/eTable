"use strict";

// resourse roles

var nCore = nCore || {};
nCore.roles = (function(){
  // права доступа
  var init = function(){

  },
  check = function(permission){
    return ( nCore.user.permissions().indexOf( permission )==-1  ) ? false : true;
  }

  return {
    init  : init,
    check : check
  }
})();
nCore.roles.init();