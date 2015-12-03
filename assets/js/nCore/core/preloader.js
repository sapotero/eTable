"use strict";

// resourse preloader

var nCore = nCore || {};
nCore.preloader = (function(){
  // предзагрузка всех справочников и шаблонов перед стартом приложульки
  // получаем права доступа юзера
  var queryConditions         = [],
      queryOriginName         = [],
      queryRelationConditions = [],
      preloaderEvent          = {},
      user = {
        id      : 123,
        groupId : 12
      };
  
  var template = {
    table : {
      sideBar : null,
      cellEditor : {
        main   : null,
        editor : null,
        group  : null
      }
    },
    index : {
      sideBar   : null,
      list      : null,
      thumbnail : null
    }
  };
  
  var init = function(){
    nCore.attachTo( nCore.preloader.event );

    nCore.user.event.publish( 'getUserPermissions',    user );
    nCore.user.event.publish( 'getAvailableDocuments', user );
    
    nCore.preloader.event.publish( 'loadTemplates', template );
    nCore.preloader.event.publish( 'loadQuery' );
  },
  templates = function(){
    return templates;
  },
  setTemplates = function(data){
    console.log('setTemplates', data);
    template = data;
  },
  event = function event(){
    return preloaderEvent;
  };

  return {
    init         : init,
    templates    : templates,
    setTemplates : setTemplates,
    event        : event
  }
})();
nCore.preloader.init();