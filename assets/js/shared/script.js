jQuery(function($) {
  var $bodyEl = $('body'),
      $sidedrawerEl = $('#sidedrawer'),
      $cellSettingToggleButton = $('#cellSettingToggleButton'),
      $cellSettings = $('#cellSettings');
  
  
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

  $cellSettingToggleButton.click(function(){
    console.log('++');
    $cellSettings.toggleClass('active')
  });

});