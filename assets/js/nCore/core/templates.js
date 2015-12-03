"use strict";

var nCore = nCore || {};
nCore.templates = (function(){
  
  var init = function (){
  },
  render = function (template, callback){
    return nCore.query.getTemplate( 'assets/js/nCore/templates/' + template + '.html', {})
    .success(function(data){
      // console.log('getTemplate', data);
      if (callback && typeof(callback) === 'function') {
        callback.call(this, data);
      };
    }).error(function(data){
      console.error('[!] getTemplate', data)
    });
  },
  notPermit = function(permission){
    render('shared/notPermit', function(data){ 
      if ( data ) {
        var wrapper = document.getElementById('content-wrapper');
        wrapper.innerHTML = data;
      };
      // рендерим превьюхи документа
      nCore.document.root.publish('renderNotPermit');
    });
  };

  return {
    init      : init,
    render    : render,
    notPermit : notPermit
  }
})();
nCore.templates.init();