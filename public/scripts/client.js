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
  $(document).ready(function() {
    for (const tweet of tweets) {
      $('#tweets').append(createTweetElement(tweet));
    }
  });
}

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

renderTweets(data);