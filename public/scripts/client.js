/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//waits for document to load before exacuting JS logic
$(document).ready(()=>{
  ///////////////////////////////////////////////////////////////////////////////
  /////////////////// HELPER FUNCTIONS/////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  
  //looops through an array of data and appends new html to index
  const renderTweets = (tweets) => {
    $tweetContainer = $("#tweet-container");
    $tweetContainer.empty();
    for (let tweet of tweets) {
      let $tweet = createTweet(tweet);
      $tweetContainer.prepend($tweet);
    }
  };
    
  //creates html to render new tweet
  const createTweet = (tweetObj) =>{
    let $tweet;
      
    $tweet = $(`<article>
        
        <header class="tweet-header">
        <div class="tweet-user">
          <img src="${tweetObj.user.avatars}">
        <h3>${tweetObj.user.name}</h3>
        </div>
        
        <h3 class="handle">${tweetObj.user.handle}</h3>
      </header>
      <p name="tweet">${tweetObj.content.text}</p>
      <footer>
        <p>${timeago.format(tweetObj.created_at)}</p>
        <div class="tweet-icons-container">
          <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-repeat"></i>
        <i class="fa-solid fa-heart"></i>
        
        </article>`);
    
    return $tweet;
  };

  const createErrorMessage = (text) => {
    let $newTweetErrorMessage;

    $newTweetErrorMessage = $(
      `<div class="new-tweet-error-message-container">
            <h3>${text}</h3>
            </div>`
    );
        
    return $newTweetErrorMessage;
        
  };

  //creates slide animation for error message
  const slideErrorMessage = (text)=>{
        
    const $message = createErrorMessage(text);
    $message.css("display", "none");
    $("#new-tweets").prepend($message);
          
    $message.slideDown("4000", ()=>{
      $("#tweet-text").on("click", ()=>{
        $message.slideUp("4000");
      });
    });
  };

  ///////////////////////////////////////////////////////////////////////////
  /////////////////////////// EVENT LISTNERERS ///////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
   
  //adds event listner on the submit of a new tweet and posts data to server
  $(".new-tweet").submit((e)=>{
    e.preventDefault();
    const userInput = $("#tweet-text").val();
    if (userInput === null || userInput === '') {

      slideErrorMessage("Cannot have emtpy tweet!");
            
            
    } else if (userInput.length > 140) {
      slideErrorMessage("Tweet is too long");
    } else {
      const newText = $("#tweet-text").serialize();
      $.ajax({url: "/tweets",
        type:"POST",
        data: newText
      }).then(()=>{
        $("#tweet-text").val("")
        loadTweets();
      })
        .catch((err)=>{
          console.log(err.message);
        });
    }
        
        
  });

  $(".nav-link").click(()=>{
    $("#new-tweets").toggle("slow");
  });
    
  //uses ajax to request data from server and then calls renderTweets upon success
  const loadTweets = () =>{
    $.ajax({
      url: "/tweets",
      type: "GET",
    }).then((res)=>{
      renderTweets(res);
    }).catch((err)=>{
      console.log(err);
    });
  };
    
  loadTweets();
});
