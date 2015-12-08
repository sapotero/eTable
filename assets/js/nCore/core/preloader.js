"use strict";

// resourse preloader

var nCore = nCore || {};
nCore.preloader = (function(){
  // предзагрузка всех справочников и шаблонов перед стартом приложульки
  // получаем права доступа юзера
  var preloaderEvent = {},
      preloadProgress       = document.getElementById('loaderProgress'),
      preloadItems = [ 'documents', 'templates' ];

  var init = function(){
    nCore.attachTo( nCore.preloader.event );

    // когда будет пользак, тогда будем получать пермишены и информацию о нем
    // nCore.user.event.publish( 'getUserPermissions',    user );
    // nCore.user.event.publish( 'getAvailableDocuments', user );
    
    nCore.preloader.event.publish( 'loadItem', preloadItems );

    dropProgress();

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
  },
  progress = function(){
    return preloadProgress.style.width
  },
  setProgress =  function(data){
    preloadProgress.style.width = data+'%';
  },
  dropProgress = function(){
    preloadProgress.style.width = '0px'
  };

  return {
    init         : init,
    templates    : templates,
    setTemplates : setTemplates,
    event        : event,
    progress     : progress,
    setProgress  : setProgress,
    dropProgress : dropProgress

  }
})();