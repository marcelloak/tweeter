/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 const escape = function(text) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
 }

const createTweetElement = function(tweet) {
  return $(`
  <article class="tweet">
    <header>
      <div>
        <div>${tweet.user.avatars}</div>
        <div>${tweet.user.name}</div>
      </div>
      <div>
        <div id="tag">${tweet.user.handle}</div>
      </div>
    </header>
    <p>${escape(tweet.content.text)}</p>
    <footer>
      <div>
        <div>${Math.ceil((new Date() - new Date(tweet.created_at)) / (1000 * 60 * 60 * 24))} days ago</div>
      </div>
      <div>
        <div>F</div>
        <div>R</div>
        <div>L</div>
      </div>
    </footer>
  </article>
  `);
}

const renderTweets = function(tweets) {
  tweets.reverse();
  $('#tweets').empty();
  for (const tweet of tweets) {
    $('#tweets').append(createTweetElement(tweet));
  }
}

const loadTweets = function() {
  $.ajax('/tweets/', { method: 'GET' })
    .then(function(tweets) {
      renderTweets(tweets);
    });
}

$(document).ready(function() {
  loadTweets();

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
      }
      else {
        $("#new-tweet-form")[0].reset();
        $.post('/tweets/', tweet)
        .then(() => {
          loadTweets();
          $(".new-tweet").slideUp(500);
        });
      }
    });
  });

  window.onscroll = function() {
    const pageOffset = document.documentElement.scrollTop || document.body.scrollTop;
    if (pageOffset > 100) {
      $("#top").show();
      $("#write-tweet").hide();
    }
    else {
      $("#top").hide();
      $("#write-tweet").show();
    }
  };

  $("#write-tweet").click(function() {
    if ($(".new-tweet").is(':visible')) $(".new-tweet").slideUp(500);
    else {
      $(".new-tweet").slideDown(500);
      $("#tweet-text").focus();
    }
  });

  $("#top").click(function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    if (!$(".new-tweet").is(':visible')) {
      $(".new-tweet").slideDown(500);
      $("#tweet-text").focus();
    }
  });
});