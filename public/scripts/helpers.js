import { loadTweets } from "./loadTweets.js";

// Opens/closes compose tweet viewer
const useComposeTweetButton = function() {
  if ($(".new-tweet").is(':visible')) $(".new-tweet").slideUp(500);
  else {
    $(".new-tweet").slideDown(500);
    $("#tweet-text").focus();
  }
}

// Alters character counter in new tweet form based on tweet text contents
const composerCharCounter = function() {
  const left = 140 - $(this).val().length;
  const counter = $(this).parent().find('.counter');
  counter.val(left);
  if (left < 0) $(counter).css('color', 'red');
  else $(counter).css('color', '#545149');
}

// Manages error within new tweet form
const manageErrors = function(contents) {
  let error = "";
  if (contents === "") error = '⚠️ Tweet is too short ⚠️';
  else if (contents.length > 140) error = '⚠️ Tweet is too long ⚠️';
  $('#error').slideUp(500, function() {
    $('#error').empty();
    if (error) {
      $('#error').append(`<p>${error}</p>`);
      $('#error').slideDown(500);
    }
  });
  return error;
}

// Deals with submitted text in new tweet box
const newTweetSubmit = function (event) {
  event.preventDefault();
  const tweet = $('#new-tweet-form').serialize();
  const contents = decodeURI(tweet.slice(5));
  if(!manageErrors(contents)) {
    $("#new-tweet-form")[0].reset();
    $.post('/tweets/', tweet)
      .then(() => loadTweets());
  }
}

// Brings viewport to top and opens compose tweet viewer if closed
const useTopButton = function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  if (!$(".new-tweet").is(':visible')) $(".new-tweet").slideDown(500);
  $("#tweet-text").focus();
}

// Deals with compose tweet and top buttons based on scroll of window
const alterButtons = function() {
  const pageOffset = document.documentElement.scrollTop || document.body.scrollTop;
  if (pageOffset > 100) {
    $("#top").show();
    $("#write-tweet").hide();
  } else {
    $("#top").hide();
    $("#write-tweet").show();
  }
};

export { loadTweets, useComposeTweetButton, composerCharCounter, newTweetSubmit, useTopButton, alterButtons };