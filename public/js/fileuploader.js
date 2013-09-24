(function(window, $){
  $(function(){
    console.log('Hello world');
  });

  $('#file-input').on('change', function(e) {
    console.log('change');
  });

  $('#file-select').on('click', function(e) {
    $('#file-input').click();
  });


})(window, window.jQuery);