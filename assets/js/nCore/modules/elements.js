"use strict";

// var nCore.modules.table = nCore.modules.table || {};
var nCore = nCore || {};
nCore.modules.elements = (function(config){

  var element = document.getElementById('nCore-draggable'), x = 0, y = 0;

  interact(element)
    .draggable({
      snap: {
        targets: [
          interact.createSnapGrid({ x: 10, y: 10 })
        ],
        range: Infinity,
        relativePoints: [ { x: 0, y: 0 } ]
      },
      inertia: true,
      restrict: {
        restriction: element.parentNode,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
        endOnly: true
      }
    })
    .on('dragmove', function (event) {
      x += event.dx;
      y += event.dy;

      event.target.style.webkitTransform =
      event.target.style.transform =
          'translate(' + x + 'px, ' + y + 'px)';
    });

})();
// nCore.modules.elements.init();