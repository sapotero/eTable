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

  // клик по ячейке в таблице
  $('td.fr-selected-cell').live('click', function(e){
    nCore.modules.table.event.publish('cellSelect', this );
  });
  
  // $('#cellSettingsForm').change(function(e){
  //   nCore.modules.table.event.publish('cellSettingsChange', e );
  // })

  // добвление нового документа
  $('.AddDocument').live('click', function(){
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
    m.style.height = '100px';
    m.style.margin = '10% auto';
    m.style.padding = '10% auto';
    m.style.backgroundColor = '#fff';
    m.classList.toggle('mui-panel');
    m.classList.toggle('mui--z5');
    m.innerHTML = '<h4>Создание нового документа</h4><div class="loader"></div>';

    mui.overlay('on', options, m);
    setTimeout( function(){ mui.overlay('off'); $bodyEl.addClass('hide-sidedrawer'); location.hash = "#tables/new" },1000);
  })

  // добавление группы критериев
  $('.addCriteriaGroupButton').live('click', function(){
    var list  = $(".criteriaSelector"),
        groupTemplate  = $('.criteriaSelectorGroupTemplate').first();

    var group = groupTemplate.clone();
    group.removeClass('criteriaSelectorGroupTemplate');
    group.removeClass('mui--hide');

    if (  $('.firstTimeCriteria').hasClass('mui--hide') ) {
      $('.criteriaSelector > div> .connectionGroup').last().toggleClass('mui--hide');
    };
    $('.firstTimeCriteria').addClass('mui--hide');

    list.append( group );

    // черновой вариант как мы обходим ноды для 
    // того чтобы собрать критерии в один запрос
    nCore.modules.table.event.publish('newCellSettingsChange' );
  });

  // изменения типа связи у критерия в группе
  $('.criteriaSelectorItemCondition').live('click', function(){
    nCore.modules.table.event.publish('newCellSettingsChange' );
    return false;
  });

  // добавление критерия в группу
  $('.addCriteriaItemToGroup').live('click', function(){
    var root  = $(this).parents('.criteriaSelectorGroup'),
        list  = root.children('.criteriaSelectorGroupList'),
        cardTemplate  = $('.criteriaSelectorItemTemplate').first();
    var card = cardTemplate.clone();
    card.removeClass('criteriaSelectorItemTemplate');
    card.removeClass('mui--hide');

    list.append( card );
    nCore.modules.table.event.publish('newCellSettingsChange' );
  });

  // изменение значения полей -> обновляем значения в ячейке
  $('select, input[name="value"]').live('change', function(){
    nCore.modules.table.event.publish('newCellSettingsChange' );
    return false;
  })

  // выбор справочника -> меняем значения в origin_name
  $('select[name="table_name"]').live('change', function(e){
    
    // console.log('select[name="table_name"]', this);

    if ( !this.dataset.old) {
      var select = this.nextElementSibling.nextElementSibling;
      select.innerHTML = '';
      
      var _df = new DocumentFragment();
      var originTable = JSON.parse( nCore.storage.getItem( this.value) );
      for (var q = 0; q < originTable.origin.length; q++) {
        var option = document.createElement('option');
        option.value = originTable.origin[q].value;
        option.text  = originTable.origin[q].name;
        _df.appendChild(option);
      };
      select.appendChild(_df);
      return false;
    };

    
  })

  // удаление критерия
  $('.criteriaMenuItem.remove').live('click', function(){
    $(this).parents('.criteriaSelectorItem').detach();
  })

  // клик по критерию
  $('.criteriaMenuItem.settings, .criteriaSelectorItemHeader').live('click', function(e){

    var el = ( $(this).hasClass('criteriaSelectorItem') ? $(this) : $(this).parents('.criteriaSelectorItem') );
    var child    = el.children('.criteriaForm');

    // console.log('.criteriaMenuItem.settings');

    $.each( child.children('select'), function(i, el){
      if ( !$(el).hasClass('s2')) {
        if ( el.name === 'table_name' ) {
          var _df = new DocumentFragment();
          var criteriaKeys = JSON.parse(nCore.storage.criteriaKeys);
          for (var q = 0; q < criteriaKeys.length; q++) {
            var option = document.createElement('option');
            option.value = criteriaKeys[q].value;
            option.text  = criteriaKeys[q].name;
            _df.appendChild(option);
          };
          el.appendChild(_df);
        };
        // console.log('.criteriaMenuItem.settings > populate');

        $(el).addClass('s2');

        $(el).select2().on('change', function(){
          console.log('select change', this, this.name);
          // console.log('select[name="table_name"]', this);
          if ( this.name === 'table_name' ) {
            var select = this.nextElementSibling.nextElementSibling;
            select.innerHTML = '';
            
            var _df = new DocumentFragment();
            var originTable = JSON.parse( nCore.storage.getItem( this.value ) );
            for (var q = 0; q < originTable.origin.length; q++) {
              var option = document.createElement('option');
              option.value = originTable.origin[q].value;
              option.text  = originTable.origin[q].name;
              _df.appendChild(option);
            };
            select.appendChild(_df);
          };
          
          nCore.modules.table.event.publish('newCellSettingsChange',  $(".criteriaSelector") )
        });

      };
    });
    child[0].classList.toggle('hide');
    
    // e.preventDefault();
    nCore.modules.table.event.publish('newCellSettingsChange' );
    return false;
  })

  // изменение отображение элементов на странице
  $('.indexViewChange').live('click', function(){
    var type = this.dataset.viewType;

    nCore.document.root.publish('changeRenderType', type)
  })

  $('.layoutSideMenuItem').live('click', function(){
    $bodyEl.toggleClass('hide-sidedrawer');
  });



});