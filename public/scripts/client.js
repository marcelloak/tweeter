/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

import { loadTweets, errorManager, composerCharCounter } from "./helpers.js";

$(document).ready(function() {
  loadTweets();

  //When new tweet is submitted, deal with submitted text
  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();
    const tweet = $('#new-tweet-form').serialize();
    const contents = decodeURI(tweet.slice(5));
    if(!errorManager(contents)) {
      $("#new-tweet-form")[0].reset();
      $.post('/tweets/', tweet)
        .then(() => loadTweets());
    }
  });

  //When window is scrolled, deal with top button
  window.onscroll = function() {
    const pageOffset = document.documentElement.scrollTop || document.body.scrollTop;
    if (pageOffset > 100) {
      $("#top").show();
      $("#write-tweet").hide();
    } else {
      $("#top").hide();
      $("#write-tweet").show();
    }
  };

  //When compose tweet button is clicked, open/close compose tweet viewer
  $("#write-tweet").click(function() {
    if ($(".new-tweet").is(':visible')) $(".new-tweet").slideUp(500);
    else {
      $(".new-tweet").slideDown(500);
      $("#tweet-text").focus();
    }
  });

  //When top button is clicked, go to top and open compose tweet viewer if closed
  $("#top").click(function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    if (!$(".new-tweet").is(':visible')) $(".new-tweet").slideDown(500);
    $("#tweet-text").focus();
  });

  //Alters character counter in new tweet box based on tweet text contents
  $("#tweet-text").on("keyup", composerCharCounter);
});