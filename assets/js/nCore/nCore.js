"use strict";

var nCore = nCore || {};

nCore = (function(){
  
  function loadModules(){
    nCore.modules = {};
    nCore.core    = {};
    nCore.query   = {};

    var modules = ['elements', 'query', 'cell', 'cellEditor','table', 'document', 'core'];
    var body = document.getElementsByTagName('body')[0];

    for (var i = modules.length - 1; i >= 0; i--) {
      var js_script = document.createElement('script');
      js_script.type = "text/javascript";
      js_script.src =  'assets/js/nCore/modules/'+modules[i]+'.js';
      body.appendChild(js_script);
    };
  };

  function init(){
    loadModules();
  }

  return {
    init: init
  };
})();

nCore.init();