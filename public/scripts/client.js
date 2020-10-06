/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
    <p>${tweet.content.text}</p>
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
    $("#new-tweet-form")[0].reset();
    $.post('/tweets/', tweet)
    .then(function() {loadTweets();});
  });
});