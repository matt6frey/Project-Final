// User Experience

$(document).ready(function () {

  $('input[type="file"]').on('change', function() {
    $('img.preview').css('display', 'inline-block');
    $(this).hide();
  });

});


