// "use strict";

// наш микро фреймворк nCore

var nCore = nCore || {};

nCore = (function(){
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }
  // проверка, на доступность локалстораджа
  function storageAvailable(type) {
    try {
      var storage = window[type],
        x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);

      nCore.storage = window[type];
      // nCore.storage.clear();
      return true;
    }
    catch(e) {
      return false;
    }
  }

  function load(type, scriptArray, callback) {
    console.log('load', type, scriptArray);

    var head        = document.getElementsByTagName('body')[0],
        scriptArray = scriptArray,
        toLoad      = scriptArray.length,
        hasCallback = callback.call;

    function onScriptLoaded(e) {
      var readyState = this.readyState;
      if (!readyState || /ded|te/.test(readyState)) {
        toLoad--;
        if (!toLoad && hasCallback) {
          callback();
        }
      }
    }

    function addToStorage(url, script){
      // console.log('addToStorage', url, script);

      $.get( url )
      .done(function( data, textStatus ) {
        nCore.storage.setItem( script, data );
      })
      .fail(function( jqxhr, settings, exception ) {
        nCore.storage.setItem('[!]'+scriptName, jqxhr.responseText);
        console.log( jqxhr, settings, exception );
      });
    };


    var script, _storageAvailable = storageAvailable('localStorage');

    for (var i = 0; i < toLoad; i++) {
      script = document.createElement('script');
      var scriptName = scriptArray[i];
      

      if ( _storageAvailable && type !== 'shared' ) {

        if( nCore.storage.hasOwnProperty( scriptName ) ){
          console.log('storageAvailable [script] -> ', scriptName);
          script.src = 'data:text/javascript,' + encodeURI( nCore.storage[ scriptName ] );
          // script.textContent = nCore.storage[ scriptName ];
          // script.onload = script.onerror = script.onreadystatechange = '';
          // script.src = 'assets/js/nCore/'+type+'/'+scriptName+'.js';
        }
        else {
          console.log('storageAvailable [noscript] -> ', scriptName);
          var url = 'assets/js/nCore/'+type+'/'+scriptName+'.js';

          script.src = url;
          script.async = true;
          script.onload = script.onerror = script.onreadystatechange = onScriptLoaded;
          addToStorage(url, scriptName);
        }
      }
      else {
        script.src = 'assets/js/nCore/'+type+'/'+scriptName+'.js';
        script.async = true;
        script.onload = script.onerror = script.onreadystatechange = onScriptLoaded;
      }

      head.appendChild(script);
    }
  };

  function loadModules(){
    var dependencies = {
      shared  : [ "jquery", "mui.min", "transparency.min", "fr", "script" ],
      core    : [ "user", "query", "core", "roles", "templates", "update", "worker", "router", "preloader" ],
      modules : [ "document", "table", "cellEditor", "cell", "events" ]
    };
    
    for (var type in dependencies){
      dependencies.hasOwnProperty(type) ? load( type, dependencies[type], function(){}) : false;
    };
  };

  function init(){
    nCore.modules   = {};
    nCore.core      = {};
    nCore.query     = {};
    nCore.router    = {};
    nCore.templates = {};
    nCore.user      = {};
    nCore.roles     = {};
    nCore.update    = {};
    nCore.preloader = {};
    nCore.storage   = {};
    loadModules();
  }

  return {
    init: init
  };
})();

nCore.init();