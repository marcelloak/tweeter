$(document).ready(function() {
  // $("#tweet-text").on("keydown", function(event) {
  //   if (event.keyCode === 13) document.getElementById("submit").click();
  // });
  $("#tweet-text").on("keyup", function(event) {
    //if (event.keyCode === 13) $("#new-tweet-form")[0].reset();
    left = 140 - $(this).val().length;
    counter = $(this).parent().find('.counter');
    counter.val(left);
    if (left < 0) $(counter).css('color', 'red');
    else $(counter).css('color', '#545149');
  });
});