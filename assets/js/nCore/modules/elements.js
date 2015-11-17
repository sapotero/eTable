"use strict";

// var nCore.modules.table = nCore.modules.table || {};
// clone interact.jss
// http://jsfiddle.net/dw3xdhch/

var nCore = nCore || {};
nCore.modules.elements = (function(config){
  var nCoreElement,
      elements = [];

  function nCoreLabel( options ) {
    this.color           = options.color || 'red';
    this.textalign       = options.align || 'right';
  }

  function nCoreInput( options ) {
    this.color        = options.color || 'gray';
  }

  function nCoreElement() {}
  nCoreElement.prototype.create = function create ( options ) {
    var parentClass = null;
    
    if( options.type        === 'label' ) {
      parentClass = nCoreLabel;
    } else if( options.type === 'input' ) {
      parentClass = nCoreInput;
    }
    
    if( parentClass === null ) {
      return false;
    }
    
    return new parentClass( options );
  }

  var init = function(){
   return new nCoreElement();
  },
  create = function(options){
    var root     = init(),
        element  = root.create(options);

    elements.push(element);
    return element;
  };

  return {
    init       : init,
    create     : create,
    elements   : elements
  }
})();
// nCore.modules.elements.init();