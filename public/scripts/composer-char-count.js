$(document).ready(function(){

  $("#tweet-text").on("input",function(){
    let userTweet = $(this).val();

    let charRemaining = 140 - userTweet.length;

    let form = $(this).parent();

    let charCount = $(form).find(".counter");

    if (charRemaining >= 0) {
      charCount.text(charRemaining);
      // Reset the text color to its default value
    } else {
      charCount.text(charRemaining);
      charCount.css("color", "red");
    }
  });  
})

