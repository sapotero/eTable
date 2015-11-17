"use strict";

// var nCore.modules.table = nCore.modules.table || {};
// clone interact.jss
// http://jsfiddle.net/dw3xdhch/

var nCore = nCore || {};
nCore.modules.elements = (function(config){
  var nCoreElement,
      elements = [],
      config,
      nCoreElements;

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

  var init = function(config){
    nCoreElements = document.getElementById( config.nCoreElements );

    var e = [ 'label', 'input' ];
    var fragment = new DocumentFragment();

    for (var i = 0; i < e.length; i++) {
      var a = document.createElement('a');
      a.href = "#";
      a.className = 'list-group-item';
      a.text = e[i];
      fragment.appendChild(a);
    };
    nCoreElements.appendChild(fragment);

    // <a href="#" class="list-group-item nCore-draggable"> Morbi leo risus </a>
    return new nCoreElement();
  },
  create = function(options){
    var root     = init(),
        element  = root.create(options);

    elements.push(element);
    return element;
  },
  index = function(){

  }

  return {
    init       : init,
    create     : create,
    elements   : elements
  }
})();
nCore.modules.elements.init({
  nCoreElements: 'nCoreElements'
});