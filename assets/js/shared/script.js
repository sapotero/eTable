if (typeof jQuery.fn.live == 'undefined' || !(jQuery.isFunction(jQuery.fn.live))) {
  jQuery.fn.extend({
      live: function (event, callback) {
         if (this.selector) {
              jQuery(document).on(event, this.selector, callback);
          }
      }
  });
}

jQuery(function($) {
  var $bodyEl              = $('body'),
  $sidedrawerEl            = $('#sidedrawer'),
  $cellSettings            = $('#cellSettings'),
  $rotatePage              = $('#rotatePage'),
  $paper                   = $('#paper');
  
  
  // ==========================================================================
  // Toggle Sidedrawer
  // ==========================================================================
  function showSidedrawer() {
    // show overlay
    var options = {
      onclose: function() {
        $sidedrawerEl
          .addClass('active')
          .appendTo(document.body);
      }
    };
    $('#sidedrawer-brand').toggleClass('mui--z5');
    
    var $overlayEl = $(mui.overlay('on', options));
    
    // show element
    $sidedrawerEl.appendTo($overlayEl);

    setTimeout(function() {
      $sidedrawerEl.addClass('active');
    }, 20);


  }
  
  
  function hideSidedrawer() {
    $bodyEl.toggleClass('hide-sidedrawer');
    $('#sidedrawer-brand').removeClass('mui--z5');
  }
  
  
  $('.js-show-sidedrawer').on('click', showSidedrawer);
  $('.js-hide-sidedrawer').on('click', hideSidedrawer);
  
  
  // ==========================================================================
  // Animate menu
  // ==========================================================================
  var $titleEls = $('strong', $sidedrawerEl);
  
  $titleEls
    .next()
    .hide();
  
  $titleEls.on('click', function() {
    $(this).next().slideToggle(200);
  });

  $rotatePage.click(function(){
    $paper.toggleClass('book');
  });

  $('td.fr-selected-cell').live('click', function(e){
    console.log( 'selected', this,'|', e );
    nCore.modules.table.event.publish('cellSelect', this );
  })


  /**
   * FROALA EDITOR
   */
  // $('div#froala-editor').froalaEditor({
  $.FroalaEditor.DefineIcon('alignLeft', {NAME: 'align-left'});
  $.FroalaEditor.RegisterCommand('alignLeft', {
    title: 'left align',
    focus: false,
    undo: false,
    refreshAfterCallback: false,
    callback: function () {
      console.log( this.align.apply('left') );
    }
  });

  $.FroalaEditor.DefineIcon('alignRight', {NAME: 'align-right'});
  $.FroalaEditor.RegisterCommand('alignRight', {
    title: 'right align',
    focus: false,
    undo: false,
    refreshAfterCallback: false,
    callback: function () {
      console.log( this.align.apply('right') );
    }
  });

  $.FroalaEditor.DefineIcon('alignCenter', {NAME: 'align-center'});
  $.FroalaEditor.RegisterCommand('alignCenter', {
    title: 'center align',
    focus: false,
    undo: false,
    refreshAfterCallback: false,
    callback: function () {
      console.log( this.align.apply('center') );
    }
  });

  $.FroalaEditor.DefineIcon('cog', {NAME: 'cog'});
  $.FroalaEditor.RegisterCommand('cog', {
    title: 'cog',
    focus: false,
    undo: false,
    refreshAfterCallback: false,
    callback: function () {
      $('#cellSettings').toggleClass('active');
    }
  });

  $.FroalaEditor.DefineIcon('floppy-o', {NAME: 'floppy-o'});
  $.FroalaEditor.RegisterCommand('floppy-o', {
    title: 'floppy-o',
    focus: false,
    undo: false,
    refreshAfterCallback: false,
    callback: function () {
        var id = nCore.document.id(),
        body = $('.fr-element.fr-view')[0].innerHTML,
        data = {
          id          : id,
          title       : "",
          description : "",
          body        : body
        };
      nCore.document.root.publish('saveDocument', data );
    }
  });


  $.FroalaEditor.DefineIcon('file-o', {NAME: 'file-o'});
  $.FroalaEditor.RegisterCommand('file-o', {
    title: 'file-o',
    focus: false,
    undo: false,
    refreshAfterCallback: false,
    callback: function () {
      var id = nCore.document.id(),
        body = $('.fr-element.fr-view')[0].innerHTML,
        data = {
          id          : id,
          title       : "",
          description : "",
          body        : body
        };
      nCore.document.root.publish('newDocument', data );
    }
  });

  $.FroalaEditor.DefineIcon('calculator', {NAME: 'calculator'});
  $.FroalaEditor.RegisterCommand('calculator', {
    title: 'calculator',
    focus: false,
    undo: false,
    refreshAfterCallback: false,
    callback: function () {
      var data = {
        table: document.querySelector('.fr-element.fr-view > table'),
        headClass: 'fr-highlighted',
        sideClass: 'fr-thick'
      };
      nCore.modules.table.event.publish('generateQuery', data );
    }
  });

  $('div#paper').froalaEditor({
    // раскоментировать когда будет выкладывать в прод
    // toolbarButtons: ['file-o', 'floppy-o', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'fontSize', '|', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', '|','alignLeft', 'alignCenter', 'alignRight', '|','formatOL', 'formatUL', '|','outdent', 'indent', '|','insertImage', 'insertTable', '|', 'html', '|','undo', 'redo', '|', 'cog'],
    toolbarButtons: ['file-o', 'floppy-o', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'fontSize', '|', 'color', 'calculator', 'paragraphStyle', '|', 'paragraphFormat', '|','alignLeft', 'alignCenter', 'alignRight', '|','formatOL', 'formatUL', '|','outdent', 'indent', '|','insertImage', 'insertTable', '|', 'html', '|','undo', 'redo', '|', 'cog'],
    language: 'ru',
    // toolbarInline: true,
    charCounterCount: false,
    // theme: 'gray',
    // tableEditButtons: ['tableRows', 'tableColumns', 'tableCells', 'tableCellVerticalAlign', 'tableRemove']
    // toolbarStickyOffset: 100,
    toolbarSticky: false
    // toolbarBottom: true
  });
});