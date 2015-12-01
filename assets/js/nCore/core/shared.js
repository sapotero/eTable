"use strict";

// resourse shared

var nCore = nCore || {};
nCore.shared = (function(){
  var shared = new SharedWorker('assets/js/nCore/core/sharedBack.js');
  
  shared.port.onmessage = function(e) {
    console.log('Message received from worker', e);
  };

  var init = function(){
    // job(shared);
    return shared
  },
  post = function(data){
    shared.port.postMessage({
      command: 'foobard',
      data: ''
    });
  };

  return {
    init : init,
    // job  : job,
    post : post,
    obj : shared
  }
})();
nCore.shared.init();
