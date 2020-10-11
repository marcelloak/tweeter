// Escapes the given text, removing any XSS
const escape = function(text) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
};

// Creates a tweet html element from a given tweet
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

// Renders all tweets given, creating html elements for all of them and appending them to the tweets section
const renderTweets = function(tweets) {
  tweets.reverse();
  $('#tweets').empty();
  for (const tweet of tweets) {
    $('#tweets').append(createTweetElement(tweet));
  }
};

// Loads all tweets stored at /tweets/
const loadTweets = function() {
  $.ajax('/tweets/')
    .then(function(tweets) {
      renderTweets(tweets);
    });
};

export { loadTweets };