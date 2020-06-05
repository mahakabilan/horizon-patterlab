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
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
/*************************/
/* Get cookie */
/*************************/
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
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
/*************************/
/* Smooth scroll */
/*************************/
function smoothScrollingTo(target){
  if (target !== "") {
    $('html,body').animate({
      scrollTop:$(target).offset().top - 100
    },850);
  }
}
$(window).load(function(){
  setTimeout(function(){
    smoothScrollingTo(location.hash);
  }, 300);
  // Restore Scroll Position 
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'auto';
  }
});
$(document).ready(function(argument) {
  // Global Smooth scroll
  // Select all links with hashes
  $('a[href*="#"]').on('click', function(event){  
    if ((this.getAttribute("href").charAt(0) == "#") && ($(this).closest(".nav-tabs").length == 0)) {
      event.preventDefault();
      smoothScrollingTo(this.hash);
    }else{
      window.location.href;
    }
  });
  // Back to top
  $(".back-to-top a").on('click', function(event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 850);
  });


  // Get connected cta popup
  // check for home page cookie present
  var checkCookieHome = getCookie("mainDismissed");
  if (checkCookieHome != "" && checkCookieHome != undefined ) {
    if($(".banner.headerpop").length > 0){
      $(".banner.headerpop").hide();
    }
  }else{
    $(".banner.headerpop").show();
  }
  $('.banner.headerpop .close').click(function() {
    setCookie("mainDismissed","1", 30);
    var banner = $(this).closest('.banner');
    banner.hide();
  });
  // inner page cookie check
  var checkCookieInnerpage = getCookie("violatorDismissed");
  if (checkCookieInnerpage != "" && checkCookieInnerpage != undefined ) {
    if($(".banner.footer").length > 0){
      $(".banner.footer").hide();
    }
  }else{
      $(".banner.footer").show();
      $(".banner.footer .cta").hide();
     setTimeout(function(){
      $(".banner.footer .cta").slideDown(400);
    },2000);
  }
  $('.banner.footer .close').click(function() {
      setCookie("violatorDismissed","1", 30);
      var banner = $(this).closest('.banner');
      banner.hide();
  });

  // stop popup before footer on scroll
  $(window).scroll(function(){
    if($(".banner.footer").length > 0){
      var popupOffset = $('.banner.footer .cta').offset().top + $('.banner.footer .cta').height(),
      footerOffset = $(".hz-footer-wrapper").offset().top -10,
      windowPos = $(document).scrollTop() + window.innerHeight;
      if(popupOffset >= footerOffset){
        $(".banner.footer .cta").addClass("makeAbs");
      }
      if(windowPos < footerOffset) {
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
function showInterstitial(title, body, link) {
  var i = $('#external-link-dialog');
  i.on('show.bs.modal', function(e) {
    var m = $(this);
    m.find('.modal-title').text(title);
    m.find('.modal-body').text(body);
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
  var title = $(".externalHorzLinkHeading").text(),
    body = $(".externalHorzLinkBody").text();

  showInterstitial(title, body, link);
}

function goExternal(link) {
  var title = $(".externalLinkHeading").text(),
    body = $(".externalLinkBody").text();
  showInterstitial(title, body, link);
}

function goExternalProduct(link) {
  var title = $(".externalProductLinkHeading").text(),
    body = $(".externalProductLinkBody").text();
  showInterstitial(title, body, link);
}

var linkMap = {
  external: goExternal,
  externalHorizon: goExternalHorz,
  externalProduct: goExternalProduct
};

$('.external, .externalHorizon, .externalProduct').click(function(e) {
  e.preventDefault();
  var target = $(e.target);
  if (!target.is('a')) {
    target = target.closest('a');
  }
  var link = target.attr('href'),
    type = target.attr('class');
  linkMap[type](link);
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
  var trimSpaceID = $(".aside-nav ul").attr("id");
  var trimSpaceIDModal = $(".modal").attr("id");
  var trimmedContent = $.trim(trimSpaceID);
  var trimmedContentModal = $.trim(trimSpaceIDModal);
  $(".aside-nav ul").attr("id", trimmedContent);
  $(".modal").attr("id", trimmedContentModal);
  $(".aside-nav ul li").each(function(event) {
    //event.preventDefault();
    var trimSpaceHref = $(this).find("a").attr("href");
    var trimmedContent1 = $.trim(trimSpaceHref);
    $(this).find("a").attr("href", trimmedContent1);
  });
})(jQuery);
