"use strict";

// resourse preloader

var nCore = nCore || {};
nCore.preloader = (function(){
  // предзагрузка всех справочников и шаблонов перед стартом приложульки
  // получаем права доступа юзера
  
  var init = function(){
    var user = {userId: 123};
    nCore.user.event.publish('getUserPermissions',    user );
    nCore.user.event.publish('getAvailableDocuments', user );
  };

  return {
    init: init
  }
})();
nCore.preloader.init();