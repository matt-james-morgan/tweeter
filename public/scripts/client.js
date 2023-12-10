/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(()=>{
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
    
    
    const renderTweets = (tweets) => {
        for(let tweet of tweets){
            let $tweet = createTweet(tweet);
            $("#tweet-container").append($tweet);
        }
    }
    
    const createTweet = (tweetObj) =>{
        let $tweet;
      
        $tweet = $(`<div>
        
        <header class="tweet-header">
        <div class="tweet-user">
          <img src="${tweetObj.user.avatars}">
        <h3>${tweetObj.user.name}</h3>
        </div>
        
        <h3 class="handle">${tweetObj.user.handle}</h3>
      </header>
      <textarea name="tweet">${tweetObj.content.text}</textarea>
      <footer>
        <p>${tweetObj.created_at}</p>
        <div class="tweet-icons-container">
          <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-repeat"></i>
        <i class="fa-solid fa-heart"></i>
        
        </div>`);
    
        return $tweet;
    }
    
    renderTweets(data);
    
    $(".new-tweet").submit((e)=>{
        e.preventDefault();
        const newText = $("#tweet-text").serialize();
        $.ajax({url: "/tweets", 
                type:"POST",
                data: newText
            }).then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err.message);
            })
    })
    
    
    
    
})
