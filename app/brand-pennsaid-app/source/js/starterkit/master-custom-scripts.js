/*************************/
/* Redirect to search page */
/*************************/
function redirectSearch() {
  var searchValue = $(".search-field input").val();
  if (searchValue !== undefined) {
    window.location.href = "/search/searchresults.aspx?q=" + searchValue;
  }
}
/*************************/
/* Set cookie for popup */
/*************************/
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
/*************************/
/* Get cookie */
/*************************/
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

$(document).ready(function(argument) {
  // Back to top
  $(".back-to-top a").on('click', function(event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 850);
  });

  // Cta Popup
  // check for home page cookie present
  var checkCookieHome = getCookie("mainDismissed");
  if (checkCookieHome != "" && checkCookieHome != undefined) {
    if ($(".banner.headerpop").length > 0) {
      $(".banner.headerpop").hide();
    }
  } else {
    $(".banner.headerpop").show();
  }
  $('.banner.headerpop .close').click(function() {
    setCookie("mainDismissed", "1", 30);
    var banner = $(this).closest('.banner');
    banner.hide();
  });
  // inner page cookie check
  var checkCookieInnerpage = getCookie("violatorDismissed");
  if (checkCookieInnerpage != "" && checkCookieInnerpage != undefined) {
    if ($(".banner.footer").length > 0) {
      $(".banner.footer").hide();
    }
  } else {
    $(".banner.footer").show();
    $(".banner.footer .cta").hide();
    setTimeout(function() {
      $(".banner.footer .cta").slideDown(400);
    }, 2000);
  }
  $('.banner.footer .close').click(function() {
    setCookie("violatorDismissed", "1", 30);
    var banner = $(this).closest('.banner');
    banner.hide();
  });

  // stop popup before footer on scroll
  $(window).scroll(function() {
    if ($(".banner.footer").length > 0) {
      var popupOffset = $('.banner.footer .cta').offset().top + $('.banner.footer .cta').height(),
        footerOffset = $(".hz-footer-wrapper").offset().top - 10,
        windowPos = $(document).scrollTop() + window.innerHeight;
      if (popupOffset >= footerOffset) {
        $(".banner.footer .cta").addClass("makeAbs");
      }
      if (windowPos < footerOffset) {
        $(".banner.footer .cta").removeClass("makeAbs");
      }
    }
  });

  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();
});

/*************************/
/* Link popup modal */
/*************************/
function showInterstitial(title, body, linkType, link) {
  var i = $('#external-link-dialog');
  i.on('show.bs.modal', function(e) {
    var m = $(this);
    m.find('.modal-title').text(title);
    m.find('.modal-body').text(body);
    m.find('.btn-continue').attr('ga-tag', linkType);
    m.find('.btn-cancel').click(function() {
      $('#external-link-dialog').modal('hide');
    });
    m.find('.btn-continue').attr('target', '_blank').attr('href', link).click(function() {
      $('#external-link-dialog').modal('hide');
    });
  });
  i.modal();
}

function goExternalHorz(link) {
  var title = $(".externalHorizonLinkHeading").text(),
    body = $(".externalHorizonLinkBody").text(),
    linkType = "externalHorizon";
  showInterstitial(title, body, linkType, link);
}

function goExternal(link) {
  var title = $(".externalLinkHeading").text(),
    body = $(".externalLinkBody").text(),
    linkType = "external";
  showInterstitial(title, body, linkType, link);
}

function goExternalProduct(link) {
  var title = $(".externalProductLinkHeading").text(),
    body = $(".externalProductLinkBody").text(),
    linkType = "externalProduct";
  showInterstitial(title, body, linkType, link);
}

var linkMap = {
  external: goExternal,
  externalHorizon: goExternalHorz,
  externalProduct: goExternalProduct
};

$(document.body).on('click','.external, .externalHorizon, .externalProduct', function(e) {
  e.preventDefault();
  var target = $(e.target);
  if (!target.is('a')) {
    target = target.closest('a');
  }
  var link = target.attr('href'),
    type = target.attr('class');
  var linkType = type.match(/externalHorizon|external|externalProduct/)[0];
  linkMap[linkType](link);
});


/*************************/
/* Social share */
/*************************/
$(document).ready(function() {
  $('.facebookBtn, .twitterBtn').click(function(e) {
    e.preventDefault();
    window.open($(this).attr('href'), 'fbShareWindow', 'height=450, width=550, top=' + ($(window).height() / 3 - 275) + ', left=' + ($(window).width() / 3 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
    return false;
  });
});

(function($) {
  // trim space
  var trimSpaceIDModal = $(".modal").attr("id");
  var trimmedContentModal = $.trim(trimSpaceIDModal);
  $(".modal").attr("id", trimmedContentModal);
})(jQuery);

/*************************/
/* Menu toggles */
/*************************/
// show selector menu
$(".drop-selector > ul > li > span").click(function(e) {
  e.preventDefault();
  $(this).closest(".drop-selector").addClass("show-menu");
});

// close selector menu
$(".drop-selector-close").click(function(e) {
  e.preventDefault();
  $(this).closest(".drop-selector").removeClass("show-menu");
});


$(document).ready(function() {

  $('.video-show-content').click(function(e) {
    e.preventDefault();
    $(this).parent().find('.videobox-hidden-content').slideToggle();
    $(this).toggleClass("content-shown");
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


});

$(document).on('click', '.video-cover', function(e) {
  playInlineVideo($(this));
  e.preventDefault();
});

function playInlineVideo(e) {
  $(e).hide();
  var t = $(e).next();
  new Vimeo.Player(t).play()
}

/*phase-table.js*/
jQuery(".drawer-outer .toggle").click(function() {
  jQuery(this).parent().next(".drawer-inner").slideToggle();
  jQuery(this).find(".open").toggle();
  jQuery(this).find(".close").toggle();
});

/*phase-table.js*/
