"use strict";


// var nCore.modules.table = nCore.modules.table || {};
var nCore = nCore || {};
nCore.core = (function(){
  
  function init(){
    console.log( this );
    nCore.core.attachTo(obj);
  };
  
  /* Базовый механизм pub/sub -> веiается на изменения параметров модулей */
  var subscribe = function(channel, fn) {
    if ( !nCore.core.channels[channel] ) {
      nCore.core.channels[channel] = [];
    }

    nCore.core.channels[channel].push({ context: this, callback: fn });
    return this;
   },
  publish = function(channel) {
    if ( !nCore.core.channels[channel] ) {
      return false;
    }

    var args = Array.prototype.slice.call(arguments, 1);

    for (var i = 0, l = nCore.core.channels[channel].length; i < l; i++) {
      var subscription = nCore.core.channels[channel][i];
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
nCore.core.init();

var obj = {name: 'fuck'};
obj.publish('nameChange', 'you!');
obj.subscribe('nameChange', function(args){
  var old_name = this.name;
  this.name = args
  console.log(old_name + ' -> ', this.name)
});
