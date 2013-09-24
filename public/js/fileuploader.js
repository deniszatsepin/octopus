(function(window, $){
  $(function(){
    console.log('Hello world');
  });

  $('#file-input').on('change', function(e) {
    uploadFiles(this);
  });

  $('#file-select').on('click', function(e) {
    $('#file-input').click();
  });

  var uploadFiles = function (files) {
  	var formData = new FormData();
  	var xhr = new XMLHttpRequest();		
  	var file = files.files[0];
  	formData.append('files', file);
  	xhr.open('post', '/upload', true);	
  	xhr.send(formData);
  };

})(window, window.jQuery);