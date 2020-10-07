//Alters character counter in new tweet box based on tweet text contents
$(document).ready(function() {
  $("#tweet-text").on("keyup", function() {
    const left = 140 - $(this).val().length;
    const counter = $(this).parent().find('.counter');
    counter.val(left);
    if (left < 0) $(counter).css('color', 'red');
    else $(counter).css('color', '#545149');
  });
});