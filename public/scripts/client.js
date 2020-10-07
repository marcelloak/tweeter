/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 //Escapes the given text, removing any XSS
const escape = function(text) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
};

//Creates a tweet html element from a given tweet
const createTweetElement = function(tweet) {
  let daysAgo = Math.ceil((new Date() - new Date(tweet.created_at)) / (1000 * 60 * 60 * 24));
  daysAgo +=  ` day${daysAgo > 1 ? "s" : ""} ago`;
  return $(`
  <article class="tweet">
    <header>
      <div>
        <div><img src='${tweet.user.avatars}'/></div>
        <div>${tweet.user.name}</div>
      </div>
      <div>
        <div id="tag">${tweet.user.handle}</div>
      </div>
    </header>
    <p>${escape(tweet.content.text)}</p>
    <footer>
      <div>
        <div>${daysAgo}</div>
      </div>
      <div>
        <div>🏴󠁧󠁢󠁥󠁮󠁧</div>
        <div>🔄</div>
        <div>❤️</div>
      </div>
    </footer>
  </article>
  `);
};

//Renders all tweets given, creating html elements for all of them and appending them to the tweets section
const renderTweets = function(tweets) {
  tweets.reverse();
  $('#tweets').empty();
  for (const tweet of tweets) {
    $('#tweets').append(createTweetElement(tweet));
  }
};

//Loads all tweets stored at /tweets/
const loadTweets = function() {
  $.ajax('/tweets/')
    .then(function(tweets) {
      renderTweets(tweets);
    });
};

//Main client logic
$(document).ready(function() {
  loadTweets();

  //When new tweet is submitted, deal with submitted text
  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();
    const tweet = $('#new-tweet-form').serialize();
    const contents = decodeURI(tweet.slice(5));
    let error = "";
    if (contents === "") error = '⚠️ Tweet is too short ⚠️';
    else if (contents.length > 140) error = '⚠️ Tweet is too long ⚠️';
    $('#error').slideUp(500, function() {
      $('#error').empty();
      if (error) {
        $('#error').append(`<p>${error}</p>`);
        $('#error').slideDown(500);
      } else {
        $("#new-tweet-form")[0].reset();
        $.post('/tweets/', tweet)
          .then(() => {
            loadTweets();
            $(".new-tweet").slideUp(500);
          });
      }
    });
  });

  //When window is scrolled, deal with top bottom
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
});