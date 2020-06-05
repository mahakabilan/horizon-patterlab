$(document).ready(function(){
	$(".fancybox").fancybox();
  // $("a.fancybox").on('click',function(e){
  //   e.preventDefault();
  //   e.stopPropogation();
  //   $(this).fancybox();
  // })
	$(".play, .timecode").on("click", function(e) {
		e.preventDefault();
	    var iframe = document.querySelector('.video-chapters iframe');
	    var player = new Vimeo.Player(iframe);
	    if ($(e.target).hasClass("timecode")) {
	        var seekVal = $(e.target).attr("data-seek");
	        player.setCurrentTime(seekVal);
	        player.play();
	    }
	    else{
	      player.play();
	    }
	});

	$(".timecode").on("click",function(event){
		event.preventDefault();
    if($(window).width() < 768){
      $('html, body').animate({
        scrollTop: $("div.video-chapters").offset().top
      }, 650);
    }
	});
	$(".modal-video").each(function(){
    var modalId = $(this).attr("data-modal-id");
    $(this).attr("id", modalId);
	});
	 // Search menu expanding in mobile
   $('.search-field .search-btn').on('click', function(event) {
    event.preventDefault();
    // Only for mobile
    if ($(window).width() < 1024) {
      $('.search-field').addClass('full-width').find('input').addClass('visible-mobile');
      $('.logo').addClass('hidden-mobile');
      // opening the menu
      if ($(".menuIcon").hasClass('open')) {
          redirectSearch();
      }else{
        $('.menuIcon').addClass('open');
        $('.nav-bar, body').addClass('show');
        $(".nav-bar").css({
          "overflow-y": "scroll",
          "height":windowHeight
        });
        $('.body-content-wrapper').hide();
      }
    }else {
      redirectSearch();
    }
   });
  $('.text-carousel-wrap').slick({
      infinite: true,
      dots:true,
      prevArrow:"<a href='#' class='prev-arrow'><img src='../../images/starterkit/control-left-white.png' alt='prev arrow'></a>",
      nextArrow:"<a href='#' class='next-arrow'><img src='../../images/starterkit/control-right-white.png' alt='next arrow'></a>"
  });
});


// Video Scroll Play
var videoScrollPlay = {
  elements: {
    videos: $("video")
  },
  init: function() {
    window.addEventListener("scroll", this.videoPlayOnScroll, !1),
      window.addEventListener("resize", this.videoPlayOnScroll, !1)
  },
  videoPlayOnScroll: function() {
    for (var e = 0; e < $("video").length; e++) {
      var t = $("#video" + (e + 1)),
        n = t.offset().top,
        i = t.height(),
        r = n + i;
      window.pageYOffset,
        window.innerHeight,
        window.pageYOffset;
      bottomWindow = window.pageYOffset + window.innerHeight,
        isVideoBottomAboveBottomScreen = n + i - 100 < window.pageYOffset + window.innerHeight,
        isVideoTopBellowBottomScreen = n + 100 > window.pageYOffset,
        isVideoBottomAboveBottomScreen && isVideoTopBellowBottomScreen ? t[0].play() : t[0].pause()
    }
  }
};
$(function() {
  $("div").hasClass("video-scroll-play") && videoScrollPlay.init();
});
