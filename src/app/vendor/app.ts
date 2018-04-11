import * as $ from "jquery";
import * as FastClick from "fastclick";
var resizefunc=[];
var w,h,dw,dh;
let changeptype = function(){
    w = $(window).width();
    h = $(window).height();
    dw = $(document).width();
    dh = $(document).height();

    if($.browser.mobile === true){
        $("body").addClass("mobile").removeClass("fixed-left");
    }
    if(!$("#wrapper").hasClass("forced")){
      if(w > 1024){
        $("body").removeClass("smallscreen").addClass("widescreen");
          $("#wrapper").removeClass("enlarged");
      }else{
        $("body").removeClass("widescreen").addClass("smallscreen");
        $("#wrapper").addClass("enlarged");
        $(".left ul").removeAttr("style");
      }
      if($("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left")){
        $("body").removeClass("fixed-left").addClass("fixed-left-void");
      }else if(!$("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left-void")){
        $("body").removeClass("fixed-left-void").addClass("fixed-left");
      }

  }
  toggle_slimscroll(".slimscrollleft");
}


 function debounce(func, wait, immediate) {
  var timeout, result;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) result = func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) result = func.apply(context, args);
    return result;
  };
}



function initscrolls(){
    if($.browser.mobile !== true){
      //SLIM SCROLL
      $('.slimscroller').slimscroll({
        height: 'auto',
        size: "5px"
      });

      $('.slimscrollleft').slimScroll({
          height: 'auto',
          position: 'right',
          size: "5px",
          color: '#98a6ad',
          wheelStep: 5
      });
  }
}
function toggle_slimscroll(item){
    if($("#wrapper").hasClass("enlarged")){
      $(item).css("overflow","inherit").parent().css("overflow","inherit");
      $(item). siblings(".slimScrollBar").css("visibility","hidden");
    }else{
      $(item).css("overflow","hidden").parent().css("overflow","hidden");
      $(item). siblings(".slimScrollBar").css("visibility","visible");
    }
}


function resizeitems(){
  if($.isArray(resizefunc)){  
    for (let i = 0; i < resizefunc.length; i++) {
        window[resizefunc[i]]();
    }
  }
}

let _App ={
    
        VERSION : "2.0.0",
        AUTHOR : "Coderthemes", 
        SUPPORT : "coderthemes@gmail.com", 
        pageScrollElement : "html, body", 
        body : $("body"),

        
     //on doc load
    onDocReady : function(e) {
      FastClick.attach(document.body);
      //resizefunc.push("initscrolls");
     // resizefunc.push("changeptype");

      $('.animate-number').each(function(){
        $(this).animateNumbers($(this).attr("data-value"), true, parseInt($(this).attr("data-duration"))); 
      });
    
      //RUN RESIZE ITEMS
      $(window).resize(debounce(resizeitems,100,null));
      $("body").trigger("resize");
      // right side-bar toggle
      $('.right-bar-toggle').on('click', function(e){
          $('#wrapper').toggleClass('right-bar-enabled');
      });       
    },
    //initilizing 
    init : function() {
        var $this = this;
        //document load initialization
        $(document).ready($this.onDocReady);
        //init side bar - left
        //$.Sidemenu.init();
        //init fullscreen
        //$.FullScreen.init();
    }

} 


export default{_App}