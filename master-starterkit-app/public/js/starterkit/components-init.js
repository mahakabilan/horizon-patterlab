/*****  main.js is loaded first always *****/
window.CP = {
  components: {
    carousel: {
      selector: '.content-carousel',
      fnName: 'slick',
      params: {
        infinite: true,
        dots: true,
        prevArrow: "<a href='#' class='prev-arrow'><img src='/images/prev-arrow.png' alt='prev arrow'></a>",
        nextArrow: "<a href='#' class='next-arrow'><img src='/images/next-arrow.png' alt='next arrow'></a>",
        responsive: [{
          breakpoint: 768,
          settings: {
            dots: false
          }
        }]
      }
    },
    dosageChart: {
      selector: ".dosage-chart",
      params: {
        minWeight: 0,
        maxWeight: 400,
        defaultValue: 100,
        invalidTimer: 1000,
        errorMessageSelector: '.error',
        errorClass: 'hasError',
        outputs: [{
          selector: ".chart-1",
          mg: 10,
          vials: 500,
          ml: 10.5
        }, {
          selector: ".chart-2",
          mg: 20,
          vials: 500,
          ml: 10.5
        }]
      }
    }
  },
  addComponentInstance: function(componentName, component) {
    var found = false;
    if (typeof CP.components[componentName] !== null) {
      CP.components[componentName] = ($.isArray(CP.components[componentName]) ? CP.components[componentName] : [CP.components[componentName]]);
      CP.components[componentName].push(component);
      found = true;
    }
    if (!found) {
      console.log("component " + componentName + " not found");
    }
    return found;
  },
  updateComponent: function(componentName, selector, component, override) {
    var found = false;
    if (typeof CP.components[componentName] !== null) {
      var updated = ($.isArray(CP.components[componentName]) ? CP.components[componentName] : [CP.components[componentName]]).map(function(cmpt) {
        if (cmpt.selector === selector) {
          found = true;
          if (override) {
            return component;
          }
          cmpt = $.extend({}, cmpt, component);
        }
        return cmpt;
      });
      if (found) {
        if (updated.length == 1) {
          CP.components[componentName] = updated[0];
        } else {
          CP.components[componentName] = updated;
        }
      }
    }
    if (!found) {
      console.log("component " + componentName + " not found");
    }
    return found;
  },
  updateParams: function(componentName, selector, params, override) {
    var found = false;
    if (typeof CP.components[componentName] !== null) {
      ($.isArray(CP.components[componentName]) ? CP.components[componentName] : [CP.components[componentName]]).map(function(component) {
        if (component.selector === selector || (selector === null && !found)) {
          found = true;
          component.params = override ? params : $.extend({}, component.params, params);
        }
      });
    }
    if (!found) {
      console.log("component " + componentName + " not found");
    }
    return found;
  }
};

(function($) {
  $(function() {
    if (CP && CP.components) {
      Object.keys(CP.components).map(function(key) {
        var component = CP.components[key];
        ($.isArray(component) ? component : [component]).map(function(settings) {
          if (typeof settings.disabled === 'undefined' || !settings.disabled) {
            if (typeof settings.initialize === 'function') {
              settings.initialize();
            } else if (typeof settings.selector !== 'undefined') {
              var $target = $(settings.selector);
              if ($target.length) {
                var fnName = settings.fnName || key;
                if (typeof $target[fnName] === 'function') {
                  $target[fnName](settings.params);
                }
              }
            }
          }
        });
      });
    }
  });

})(window.jQuery);
$(document).ready(function() {
  $(".fancybox").fancybox();

  $(".play, .timecode").on("click", function(e) {
    e.preventDefault();
    var iframe = document.querySelector('.video-chapters iframe');
    var player = new Vimeo.Player(iframe);
    if ($(e.target).hasClass("timecode")) {
      var seekVal = $(e.target).attr("data-seek");
      player.setCurrentTime(seekVal);
      player.play();
    } else {
      player.play();
    }
  });

  $(".timecode").on("click", function(event) {
    event.preventDefault();
    if ($(window).width() < 768) {
      $('html, body').animate({
        scrollTop: $("div.video-chapters").offset().top
      }, 650);
    }
  });
  $(".modal-video").each(function() {
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
      } else {
        $('.menuIcon').addClass('open');
        $('.nav-bar, body').addClass('show');
        $(".nav-bar").css({
          "overflow-y": "scroll",
          "height": windowHeight
        });
        $('.body-content-wrapper').hide();
      }
    } else {
      redirectSearch();
    }
  });
  $('.text-carousel-wrap').slick({
    infinite: true,
    dots: true,
    prevArrow: "<a href='#' class='prev-arrow'><img src='../../images/starterkit/control-left-white.png' alt='prev arrow'></a>",
    nextArrow: "<a href='#' class='next-arrow'><img src='../../images/starterkit/control-right-white.png' alt='next arrow'></a>"
  });
});

/*******************************/
// Video Sscroll Play Starts
/*******************************/
function animateOnFullView(el, bottomOffset) {
  // Assign window and element variables
  var $window = $(window);
  var elDistance = $(el).offset().top;
  var elHeight = $(el).height();
  var windowHeight = $(window).height(); // Convert strings to integers

  elDistance = Number(elDistance);
  elHeight = Number(elHeight);
  windowHeight = Number(windowHeight); // Detect bottom position of element on scroll

  $window.scroll(function() {
    // Get window top value on scroll
    var windowTop = $window.scrollTop(); // Convert string to integer

    windowTop = Number(windowTop); // Find distance from top of viewport

    var windowDistanceFromTop = windowHeight + windowTop; // PX based distance from bottom
    // var elOffset = (elDistance + elHeight) - bottomOffset;
    // Percent based distance from bottom

    var elOffset = elDistance + elHeight - (elDistance + elHeight) * bottomOffset / 100;
    var elOffsetBottom = $(el).position().top + $(el).outerHeight(true);

    if (windowDistanceFromTop > elOffset) {
      $(el).addClass('in-view');
      // $(el).find("video")[0].play();
    } else {
      $(el).removeClass('in-view');
      // $(el).find("video")[0].pause();
    }
  });
}


$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};


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
  var chartId = '.video-scroll-play';
  if ($(chartId).length) {
    animateOnFullView(chartId, 7);
  }
});

/*******************************/
// Video Sscroll Play Ends
/*******************************/

//Fixed isi panel script start
$.fn.distFromViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return Math.min(elementBottom - viewportTop, viewportBottom - elementTop);
};

var viewportISI = {
  init: function() {
    viewportISI.enableISI();
  },
  enableISI: function() {
    if ($('.isi-tray-wrapper').distFromViewport() > 90) {
      $('.isi-tray').addClass("panel-none");
    } else {
      $('.isi-tray').removeClass("panel-none");
    }

    if ($(".isi-tray-wrapper").length) {
      $(document).on('load resize scroll', function() {
        if (($('.isi-tray-wrapper').distFromViewport() > 90)) {
          $('.isi-tray').addClass("panel-none");
        } else {
          if ($('footer').distFromViewport() < 0) {
            $('.isi-tray').removeClass("panel-none");
          }
        }
      });
    }
  }
}

$(document).ready(function() {
  if ($('.isi-tray-wrapper').length > 0) {
    viewportISI.init();
  }
  $(".buttons a").click(function() {
    $(".isi-tray").toggleClass("expand");
    $('body , html').toggleClass('no-scroll');
    var str = $.trim($(this).find('span').text());
    if ($(".isi-tray").hasClass("expand")) {
      var res = str.replace("expand", "collapse");
      $(this).find('.span').html(res);
    } else {
      var res1 = str.replace("collapse", "expand");
      $(this).find('span').html(res1);
    }
  });


  var windowHeight = $(window).height();
  $('.header-demo .menuIcon').click(function() {
    $(this).toggleClass('open');
    $('.nav-bar, .menuIcon, body').addClass('show');
    $(".nav-bar").css({
      "overflow-y": "scroll",
      "height": windowHeight
    });
    if ($(this).hasClass('open')) {
      $('.search-field').addClass('full-width').find('input').addClass('visible-mobile');
      $('.logo').addClass('hidden-mobile');
      $('.body-content-wrapper').hide();
    } else {
      $('.logo').removeClass('hidden-mobile');
      $('.search-field').removeClass('full-width').find('input').removeClass('visible-mobile').val('');
      // Hiding the expanded sub menu
      $('.has-subnav > .fa').removeClass('expanded');
      $('.sub-nav').removeClass('visible-mobile');
      $('.nav-bar, .menuIcon, body').removeClass('show');
      $('.body-content-wrapper').show();
    }
  });



  // Video Scrubber
  if ($(".video-scrubber")[0]) {
    var myvideo = document.getElementById('scrubber-video');
    jumplink = document.getElementById('scrubber-btn');
    var startingFrame = $("#scrubber-video").data("setframe");
    var setPosition = 1;
    var setTime = 0;
    myvideo.pause();
    if (startingFrame == 1) {
      setPosition = 1;
      setTime = 0;
    } else if (startingFrame == 2) {
      setPosition = 2;
      // setTime = 1.27;
      setTime = 0.06;
    } else if (startingFrame == 3) {
      setPosition = 3;
      setTime = 0.08;
      // setTime = 2.3;
    }


    setTimeout(function() {
      myvideo.currentTime = setTime;
    }, 500);

    var slider = new Slider("#ex5a", {
      id: "slider5a",
      min: 1,
      max: 3,
      value: setPosition

    }).on("slide", function(sliderValue) {
      if (sliderValue == 1) {
        myvideo.currentTime = 0;
      } else if (sliderValue == 2) {
        myvideo.currentTime = 0.06;
      } else if (sliderValue == 3) {
        myvideo.currentTime = 0.08;
      }
    });
    // setTimeout(function(){
    $("#slider5a").on("click", function(event) {
      event.preventDefault();
    });
    // },500);
  }
  /*videoscrubber*/

});
//Fixed isi panel script end



/*phase-table.js*/
jQuery(".drawer-outer .toggle").click(function() {
  jQuery(this).parent().next(".drawer-inner").slideToggle();
  jQuery(this).find(".open").toggle();
  jQuery(this).find(".close").toggle();
});

/*phase-table.js*/
function bannerSetCookie(key, value) {
  var now = new Date();
  now.setDate(now.getDate() + 1)
  now.setHours(0);
  now.setMinutes(0);
  now.setMilliseconds(0);
  var bannerdate = new Date(now);
  // bannerdate.setTime(bannerdate.getTime() + expiry);
  // document.cookie = key + '=' + value + ';' + bannerdate + ";path=/";
  document.cookie = key + '=' + value + ';path=/' + ';expires=' + bannerdate;
}


function bannerScroll() {
  if ($('.video-section-banner').length > 0 && $('.video-section-banner video').hasClass("play-inview")) {
    var hT = $('.video-section-banner').offset().top,
      hH = $('.video-section-banner').outerHeight(),
      wH = $(window).height(),
      wS = $(this).scrollTop();
    if (wS > (hT + hH - wH) && (hT > wS) && (wS + wH > hT + hH)) {
      $('.video-section-banner video')[0].play();
      bannerSetCookie("isPlayed", true);
    }
  }
}

$(window).scroll(function() {
  bannerScroll();
});



$(document).ready(function() {
  bannerScroll();
  $('.video-section-banner video').on('ended', function() {
    $(".video-section-banner video").hide();
    $(".video-section-banner img").show();
    $(".video-section-banner .play-btn").show();
  });
  $(".video-section-banner .play-btn").click(function() {
    $(".video-section-banner video").show();
    $('.video-section-banner video')[0].play();
    $(".video-section-banner img").hide();
    $(this).hide();
  });
  var checkVideoPlayed = getCookie("isPlayed");
  if (checkVideoPlayed) {
    $(".video-section-banner video").hide();
    $(".video-section-banner img").show();
    $(".video-section-banner .play-btn").show();
  }
});
