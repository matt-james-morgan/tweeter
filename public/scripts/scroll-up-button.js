$(document).ready(()=>{
    const $button = $(".scroll-up");
    const $navLink = $(".nav-link");
   
    $(window).on("scroll", function(){
        
        if($(this).scrollTop() > 0){
            $button.fadeIn("fast");
            $navLink.fadeOut("fast");
           
        }else{
            $button.fadeOut("fast");
            $navLink.fadeIn("fast");
            
        }
       
    })
    $button.on("click",()=>{
        
        $("html").animate({scrollTop: 0}, "slow");
        
    })
})