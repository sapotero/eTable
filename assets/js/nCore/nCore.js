// "use strict";

// наш микро фреймворк nCore

var nCore = nCore || {};

nCore = (function(){
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

    function onScriptLoaded(scriptName) {
      var readyState = this.readyState;
      if (!readyState || /ded|te/.test(readyState)) {
        toLoad--;
        if (!toLoad && hasCallback) {
          callback();
        }
      }
    }

    function addToStorage(url, script){
      jqxhr = $.ajax( url )
      .done(function(data) {
        nCore.storage.setItem( script, data );
      })
      .fail(function(data) {
        var js_source = data.responseText;
        nCore.storage.setItem( script, js_source );
      });
    };


    var script, _storageAvailable = storageAvailable('localStorage');

    for (var i = 0; i < toLoad; i++) {
      script = document.createElement('script');
      var scriptName = scriptArray[i];
      

      if ( _storageAvailable && type !== 'shared' ) {

        if( nCore.storage.hasOwnProperty( scriptName ) ){
          script.src = 'data:text/javascript,' + encodeURIComponent( nCore.storage[ scriptName ] );
        }
        else {
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
      modules : [ "document", "table", "cellEditor", "cell", "events" ],
      shared  : [ "jquery", "mui.min", "transparency.min", "fr", "script" ],
      core    : [ "user", "query", "core", "roles", "templates", "update", "worker", "shared", "router", "preloader" ]
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
    //       dev only         // 
    // nCore.storage.clear(); //
    nCore.storage.clear();
  }

  var subscribe = function(channel, fn) {
    if ( !nCore.channels[channel] ) {
      nCore.channels[channel] = [];
    }

    nCore.channels[channel].push({ context: this, callback: fn });
    return this;
   },
  publish = function(channel) {
    if ( !nCore.channels[channel] ) {
      return false;
    }

    var args = Array.prototype.slice.call(arguments, 1);

    for (var i = 0, l = nCore.channels[channel].length; i < l; i++) {
      var subscription = nCore.channels[channel][i];
      subscription.callback.apply(subscription.context, args);
    }
    return this;
   };

  return {
    channels  : {},
    init      : init,
    
    publish   : publish,
    subscribe : subscribe,

    attachTo  : function(obj){
      obj.publish   = publish;
      obj.subscribe = subscribe;
    }
  };
})();

nCore.init();