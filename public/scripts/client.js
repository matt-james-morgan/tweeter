/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//waits for document to load before exacuting JS logic
$(document).ready(()=>{
    
    
    //looops through an array of data and appends new html to index
    const renderTweets = (tweets) => {
        for(let tweet of tweets){
            let $tweet = createTweet(tweet);
            $("#tweet-container").append($tweet);
        }
    }
    
    //creates html to render new tweet
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
        <p>${timeago.format(tweetObj.created_at)}</p>
        <div class="tweet-icons-container">
          <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-repeat"></i>
        <i class="fa-solid fa-heart"></i>
        
        </div>`);
    
        return $tweet;
    }
    
   
    //adds event listner on the submit of a new tweet and posts data to server
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
    
    //uses ajax to request data from server and then calls renderTweets upon success
    const loadTweets = () =>{
         $.ajax({
            url: "/tweets",
            type: "GET",
        }).then((res)=>{
            renderTweets(res);
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    loadTweets();
})
