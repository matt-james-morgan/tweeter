$(document).ready(()=>{

    
  const $button = $(".scroll-up");
  const $navLink = $(".nav-link");
    
  //adds event listener so that when I scroll down the button will appear
  $(window).on("scroll", function() {
        
    if ($(this).scrollTop() > 0) {
      $button.fadeIn("fast");
      $navLink.fadeOut("fast");
           
    } else {
      $button.fadeOut("fast");
      $navLink.fadeIn("fast");
            
    }
       
  });

  $button.on("click",()=>{
    //pulls page to top when button is clicked
    $("html").animate({scrollTop: 0}, "slow");
        
  });
});