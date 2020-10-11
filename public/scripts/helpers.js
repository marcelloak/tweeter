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