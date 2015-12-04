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
    // console.log( 'selected', this,'|', e );
    nCore.modules.table.event.publish('cellSelect', this );
  });
  
  $('#cellSettingsForm').change(function(e){
    nCore.modules.table.event.publish('cellSettingsChange', e );
  })

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

    // черновой вариант как мы обходимноды для 
    // того чтобы собрать критерии в один запрос
    nCore.modules.table.event.publish('newCellSettingsChange',  $(".criteriaSelector") );

  });

  $('.criteriaSelectorItemCondition').live('click', function(){
    nCore.modules.table.event.publish('newCellSettingsChange',  $(".criteriaSelector") );
    return false;
  });

  $('.addCriteriaItemToGroup').live('click', function(){
    var root  = $(this).parents('.criteriaSelectorGroup'),
        list  = root.children('.criteriaSelectorGroupList'),
        cardTemplate  = $('.criteriaSelectorItemTemplate').first();
    var card = cardTemplate.clone();
    card.removeClass('criteriaSelectorItemTemplate');
    card.removeClass('mui--hide');

    list.append( card );
    nCore.modules.table.event.publish('newCellSettingsChange',  $(".criteriaSelector") );
  });

  
  $('select').live('change', function(){
    nCore.modules.table.event.publish('newCellSettingsChange',  $(".criteriaSelector") );
    return false;
  })

  $('.criteriaMenuItem.remove').live('click', function(){
    $(this).parents('.criteriaSelectorItem').detach();
  })

  $('.criteriaMenuItem.settings, .criteriaSelectorItemHeader').live('click', function(e){

    var el = ( $(this).hasClass('criteriaSelectorItem') ? $(this) : $(this).parents('.criteriaSelectorItem') );
    var child    = el.children('.criteriaForm');
    
    $.each( child.children('select'), function(i, el){
      if ( !$(el).hasClass('s2')) {
        $(el).addClass('s2');
        $(el).select2().on('change', function(){nCore.modules.table.event.publish('newCellSettingsChange',  $(".criteriaSelector") )});
      };
    });
    child[0].classList.toggle('hide');
    
    // e.preventDefault();
    nCore.modules.table.event.publish('newCellSettingsChange',  $(".criteriaSelector") );
    return false;
  })



});