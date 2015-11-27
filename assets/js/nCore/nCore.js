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

    function load(type, scriptArray, callback) {
      var head        = document.getElementsByTagName('head')[0],
          scriptArray = scriptArray,
          toLoad      = scriptArray.length,
          hasCallback = callback.call;

      function onScriptLoaded() {
        var readyState = this.readyState;
        if (!readyState || /ded|te/.test(readyState)) {
          toLoad--;
          if (!toLoad && hasCallback) {
            callback();
          }
        }
      }

      var script;
      for (var i = 0; i < toLoad; i++) {
        script = document.createElement('script');
        script.src = 'assets/js/nCore/'+type+'/'+scriptArray[i]+'.js';
        script.async = true;
        script.onload = script.onerror = script.onreadystatechange = onScriptLoaded;
        head.appendChild(script);
      }
    };

    function loadModules(){
      var dependencies = {
        core    : [ "core", "router" ],
        modules : [ "document", "table", "cellEditor", "cell", "query", "events" ],
        shared  : [ "jquery", "script", "fr", "mui.min" ]
      };      
      
      for (var type in dependencies){
        dependencies.hasOwnProperty(type) ? load( type, dependencies[type], function(){}) : false;
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