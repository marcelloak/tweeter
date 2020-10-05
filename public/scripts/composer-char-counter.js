$(document).ready(function() {
  $("#tweet-text").on("keyup", function() {
    left = 140 - $(this).val().length;
    counter = $(this).parent().find('.counter');
    counter.val(left);
    if (left < 0) $(counter).css('color', 'red');
    else $(counter).css('color', '#545149');
  });

});