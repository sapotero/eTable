"use strict";

var nCore = nCore || {};
nCore.events = (function(){
  function setAttributes(data){
    console.log('form attr: ', data);
  };

  var init = function init (){
    nCore.document.root.subscribe('newDocument', function(data){
      
      // если документ новый - показываем модальное окошко с вводом имени
      if ( nCore.document.newDocument() ) {
        console.log('new doc');
        // turn on (returns overlay element)
        var overlayEl = mui.overlay('on');

        // set overlay options
        var options = {
          'keyboard': true,  // teardown when <esc> key is pressed (default: true)
          'static'  : false, // maintain overlay when clicked (default: false)
          'onclose' : function() {
          }
        };
        // initialize with child element
        var m = document.createElement('div');
        m.style.width = '400px';
        m.style.height = '300px';
        m.style.margin = '10% auto';
        m.style.backgroundColor = '#fff';
        m.classList.toggle('mui-panel');
        m.classList.toggle('mui--z5');
        m.innerHTML = '<form onsubmit="setAttributes(this)"><legend>Документ</legend><br><br><div class="mui-textfield mui-textfield--float-label"><input required><label>Название</label></div><div class="mui-textfield mui-textfield--float-label"><input type=text required><label>Описание</label></div><div class="mui--text-right"><button type=button onclick="mui.overlay(\'off\');" class="mui-btn mui-btn--raised mui-btn--danger">отмена</button><button type=submit class="mui-btn mui-btn--raised mui-btn--primary">сохранить</button></div></form>';

        mui.overlay('on', options, m);
      }
      // если не новый  - сохраняем
      else {
        console.log('old doc');
        nCore.document.root.publish('saveDocument', nCore.document.id() )
      }
    });
    
    // nCore.document.root.publish('saveDocument', data );
    nCore.document.root.subscribe('saveDocument', function(data){
      
      // если документ новый - показываем модальное окошко с вводом имени
      if ( nCore.document.newDocument() ) {
        console.log('saveDocument', data);
      }
    });

    nCore.document.root.subscribe('setDocumentAttribute', function(saved){
      // всё ок, пришло подтвереие что можно скрывать оверлай и документ сохряненн (+делаем крутилку что идёт процесс сохранения), или выводим ошибку
      if ( saved === true ) {
        console.log('setDocumentAttribute true:', data);
      } else {
        console.log('setDocumentAttribute false:', data);
      }
    });
  };

  return {
    init  : init,
  };
})();

nCore.events.init();