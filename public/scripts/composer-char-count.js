$(document).ready(function(){

  $("#tweet-text").on("input",function(){
    //Get values of user input
    let userTweet = $(this).val();

    //determines how many chars are left
    let charRemaining = 140 - userTweet.length;

    //navigates up and down dom tree to select output char count
    let form = $(this).parent();
    let charCount = $(form).find(".counter");

    //if count is over 140 set the color of output to red
    if (charRemaining >= 0) {
      charCount.text(charRemaining);
    } else {
      charCount.text(charRemaining);
      charCount.css("color", "red");
    }
  });  
})

