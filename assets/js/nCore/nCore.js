"use strict";

(function (root, factory) {
  var define = root.define;

  if (define && define.amd) {
    define([], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.nCore = factory();
    root.nCore.modules = {};
    root.nCore.core    = {};
    root.nCore.query   = {};
    root.nCore.router  = {};
  }
}(this, function () {
    function loadModules(){
      var dependencies = {
        core    : ["core", "router"],
        modules : ["document", "table", "cellEditor", "cell", "query", "events"]
      },
      body = document.getElementsByTagName('body')[0];
      
      for (var type in dependencies){
        if ( dependencies.hasOwnProperty(type) ) {

          for (var i in dependencies[type]){
            var js_script = document.createElement('script');
            js_script.src = 'assets/js/nCore/'+type+'/'+dependencies[type][i]+'.js';
            body.appendChild(js_script);
          }
        };
      };
    };

    function init(){
      loadModules();
    }

    return {
      init: init
    };
}));

nCore.init();