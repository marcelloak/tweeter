/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

import { loadTweets, useComposeTweetButton, composerCharCounter, newTweetSubmit, useTopButton, alterButtons } from "./helpers.js";

$(document).ready(function() {
  loadTweets();

  // When compose tweet button is clicked, open/close compose tweet viewer
  $("#write-tweet").click(useComposeTweetButton);

  // When text in new tweet box altered, change character counter
  $("#tweet-text").on("keyup", composerCharCounter);

  // When new tweet is submitted, deal with submitted text
  $("#new-tweet-form").submit(newTweetSubmit);

  // When top button is clicked, go to top and open compose tweet viewer if closed
  $("#top").click(useTopButton);

  // When window is scrolled, deal with compose tweet and top buttons
  window.onscroll = alterButtons;
});