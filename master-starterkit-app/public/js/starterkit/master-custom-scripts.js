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
/*************************/
/* Define is in viewport */
/*************************/
$.fn.inViewport = function(minHeightVisible){
	var $window = $(window),
		offset = $(this).offset(),
		height = $(this).height(),
		bottom = offset.top + height;
	if(typeof minHeightVisible === "undefined" || minHeightVisible === null){
		minHeightVisible = 20;
	}
	var isiHeight = $(".isi-tray-wrapper.isi-tray:visible").outerHeight() || 0;
	return ($window.scrollTop() <= offset.top && $window.scrollTop() + $window.height() - isiHeight >= offset.top + minHeightVisible) || 
		($window.scrollTop() >= offset.top && $window.scrollTop() < bottom - minHeightVisible);
};
/*************************/

$(document).ready(function (argument) {
  // Back to top
  $(".back-to-top a").on('click', function (event) {
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
  $('.banner.headerpop .close').click(function () {
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
    setTimeout(function () {
      $(".banner.footer .cta").slideDown(400);
    }, 2000);
  }
  $('.banner.footer .close').click(function () {
    setCookie("violatorDismissed", "1", 30);
    var banner = $(this).closest('.banner');
    banner.hide();
  });

  // stop popup before footer on scroll
  $(window).scroll(function () {
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
  if ($('[data-toggle="tooltip"]').length) {
    $('[data-toggle="tooltip"]').tooltip();
  }
});

/*************************/
/* Link popup modal */
/*************************/
function showInterstitial(title, body, btnContinue, btnCancel, linkType, link, gaTagType) {
  var i = $('#external-link-dialog');
  i.on('show.bs.modal', function (e) {
    var m = $(this);
    m.find('.modal-title').text(title);
    m.find('.modal-body').text(body);
    if (btnContinue !== "" && btnContinue !== undefined) {
      m.find('.btn-continue').text(btnContinue);
    }
    if (btnCancel !== "" && btnCancel !== undefined) {
      m.find('.btn-cancel').text(btnCancel);
    }
    m.find('.btn-continue').attr('ga-tag', linkType);
    m.find('.btn-cancel').click(function () {
      $('#external-link-dialog').modal('hide');
    });
    m.find('.btn-continue').attr('target', '_blank').attr('href', link).click(function () {
      $('#external-link-dialog').modal('hide');
    });
    if (gaTagType == "internal") {
      m.find('.btn-continue').removeAttr("target");
    }

  });
  i.modal();
}

function goExternal(link, gaTagType) {
  var title = $(".externalLinkHeading").text(),
  body = $(".externalLinkBody").text(),
  btnContinue = $(".externalButtonContinue").text(),
  btnCancel = $(".externalButtonCancel").text()
    linkType = "external";
  showInterstitial(title, body, btnContinue, btnCancel, linkType, link, gaTagType || "external");
}

function goExternalHorz(link, gaTagType) {
  var title = $(".externalHorizonLinkHeading").text(),
  body = $(".externalHorizonLinkBody").text(),
  btnContinue = $(".externalHorizonButtonContinue").text(),
  btnCancel = $(".externalHorizonButtonCancel").text()
    linkType = "externalHorizon";
  showInterstitial(title, body, btnContinue, btnCancel, linkType, link, gaTagType || "externalHorz");
}

function goExternalProduct(link, gaTagType) {
  var title = $(".externalProductLinkHeading").text(),
  body = $(".externalProductLinkBody").text(),
  btnContinue = $(".externalProductButtonContinue").text(),
  btnCancel = $(".externalProductButtonCancel").text()
    linkType = "externalProduct";
  showInterstitial(title, body, btnContinue, btnCancel, linkType, link, gaTagType || "externalProduct");
}

function goExternalAux1(link, gaTagType) {
  var title = $(".externalAux1LinkHeading").text(),
  body = $(".externalAux1LinkBody").text(),
  btnContinue = $(".externalAux1ButtonContinue").text(),
  btnCancel = $(".externalAux1ButtonCancel").text()
    linkType = "externalAux1";
  showInterstitial(title, body, btnContinue, btnCancel, linkType, link, gaTagType || "externalAux1");
}

function goExternalAux2(link, gaTagType) {
  var title = $(".externalAux2LinkHeading").text(),
  body = $(".externalAux2LinkBody").text(),
  btnContinue = $(".externalAux2ButtonContinue").text(),
  btnCancel = $(".externalAux2ButtonCancel").text()
    linkType = "externalAux2";
  showInterstitial(title, body, btnContinue, btnCancel, linkType, link, gaTagType || "externalAux2");
}

var linkMap = {
  external: goExternal,
  externalHorizon: goExternalHorz,
  externalProduct: goExternalProduct,
  externalAux1: goExternalAux1,
  externalAux2: goExternalAux2
};

$(document.body).on('click', '.external, .externalHorizon, .externalProduct, .externalAux1, .externalAux2', function (e) {

  e.preventDefault();
  var gaTag = $(this).attr("ga-tag");
  gaTagType = gaTag ? gaTag.toLowerCase() : "";
  var target = $(e.target);
  if (!target.is('a')) {
    target = target.closest('a');
  }
  var link = target.attr('href'),
  type = target.attr('class');
  var linkType = type.match('externalHorizon|externalProduct|externalAux1|externalAux2|external')[0];
  if (!gaTag) {
    console.log("gatag not found.  Substituting " + linkType + " instead"); //linkType is substituted in each method.
  }
  linkMap[linkType](link, gaTagType);
});

/*************************/
/* Social share */
/*************************/
$(document).ready(function () {
  $('.facebookBtn, .twitterBtn').click(function (e) {
    e.preventDefault();
    window.open($(this).attr('href'), 'fbShareWindow', 'height=450, width=550, top=' + ($(window).height() / 3 - 275) + ', left=' + ($(window).width() / 3 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
    return false;
  });
  /*social-media-js*/
  $(function () {
    var hideSocial = $("meta[name='page:hideSocial']");
    if (hideSocial != null && hideSocial.length > 0) {
      if ($(hideSocial).attr("content") === "true") {
        $(".social-media").addClass("d-none");
        $(".d-none").removeClass("social-media");
      } else {
        //Twitter-SocialShare
        if ($(".social-media .twitter-icon").length) {
          var twitTitle =
            $("meta[name='twitter:description']").attr("content") || "";
          $(".social-media .twitter-icon").attr(
            "href",
            $(".social-media .twitter-icon")
            .attr("href")
            .replace("{--Title--}", twitTitle));
          $(".social-media .twitter-icon").attr("aria-label", "twitter");
        }
        //Facebook-SocialShare
        if ($(".social-media .facebook-icon").length) {
          var FbTitle = $("meta[property='og:title']").attr("content") || "";
          var FbDescription =
            $("meta[property='og:description']").attr("content") || "";
          $(".social-media .facebook-icon").attr(
            "href",
            $(".social-media .facebook-icon")
            .attr("href")
            .replace("{--Title--}", FbTitle)
            .replace("{--Description--}", FbDescription));
          $(".social-media .facebook-icon").attr("aria-label", "facebook");
        }
        //Email-SocialShare
        if ($(".social-media .email-icon").length) {
          var emailTitle = $("meta[property='og:title:alternate']").attr(
              "content");
          var emailDesc = $("meta[property='og:description:alternate']").attr(
              "content");

          if (emailTitle && emailDesc) {
            $(".social-media .email-icon").attr(
              "href",
              $(".social-media .email-icon")
              .attr("href")
              .replace(
                "{--Description--}",
                emailDesc.replace("{--PageLink--}", window.location.href))
              .replace("{--Title--}", emailTitle));
          }

          $(".social-media .email-icon").attr("aria-label", "email");
        }
      }
    }
  });
});

// trim space
$('.modal').on('show.bs.modal', function (e) {
  var trimSpaceIDModal = $(this).attr("id");
  var trimmedContentModal = $.trim(trimSpaceIDModal);
  $(this).attr("id", trimmedContentModal);
});

/*************************/
/* Menu toggles */
/*************************/
// show selector menu
$(".drop-selector > ul > li > span").click(function (e) {
  e.preventDefault();
  $(this).closest(".drop-selector").addClass("show-menu");
});

// close selector menu
$(".drop-selector-close").click(function (e) {
  e.preventDefault();
  $(this).closest(".drop-selector").removeClass("show-menu");
});

$(document).ready(function () {
  $('.video-show-content').click(function (e) {
    e.preventDefault();
    $(this).parent().find('.videobox-hidden-content').slideToggle();
    $(this).toggleClass("content-shown");
  });
});

$(document).on('click', '.video-cover', function (e) {
  playInlineVideo($(this));
  e.preventDefault();
});

function playInlineVideo(e) {
  $(e).hide();
  var t = $(e).next();
  new Vimeo.Player(t).play()
}

// ADA - Show submenu on enter keypress
$('li.menu-item-has-children').keydown(function (event) {
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') {
    event.preventDefault();
    // $("li.menu-item-has-children").find(".slide").hide();
    $(this).toggleClass("show-submenu");
    $(this).siblings().removeClass("show-submenu");
  }
});

$("li.menu-item-has-children").each(function () {
  var itemLen = $(this).find(".slide li").length;
  var ariaLabel = "Has submenu with" + itemLen + "items";
  $(this).find("> a").attr("aria-label", ariaLabel);
});
/*npi modal*/
var limit = 5;
var step = 5;
var isAppend = true;

$(document).ready(function () {
  $(".npi-modal .modal-content").addClass("restrict-scroll");
  $(".npi-lookup-fail").click(function(){
	  $('#npimodal').modal('hide');
  });
  $('.npi-modal form button').click(function () {
    var $form = $('.npi-modal form')
      if ($form.valid()) {
        $(".npi-modal form button").attr("disabled", "disabled");
        var stateID = $(".form-block #state").val();
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var zcode = $("#zipCode").val();
        isAppend = true;
        limit = 5;
		var errors = $(".npi-modal form .npi-error");
		errors.hide();
        $('.loader').show();
		$(".unknown-npi-error").hide();
        $.post("/Platform/Process",
          $form.serialize(),
          function (result) {
          $('.loader').hide();
          $(".npi-modal form button").removeAttr("disabled");
          if (result.Errors || typeof result.result_count === 'undefined') {
            //display error to the user
            //Example: result.Errors = [{"field":"last_name","number":"05","description":"Field contains special character(s) or wrong number of characters"}];
			var errorHandled = false,
			  unhandledError = false;
			result.Errors.map(function(e){
				if(e.field && e.number){
					var match = errors.filter(function(i, p){ var data = $(p).data(); return data.npiField === e.field && data.npiNumber === e.number; });
					if(match.length === 0){
						match = errors.filter(function(i, p){ var data = $(p).data(); return data.npiField === e.field && data.npiNumber === "unknown"; });
					}
					if(match.length > 0){
						errorHandled = true;
						match.show();
					}else{
						unhandledError = true;
					}
				}
			});
			if(!errorHandled || unhandledError){
				$(".unknown-npi-error").show();
			}
			var visibleErrors = $(".npi-modal form .npi-error:visible, .unknown-npi-error:visible");
			if(!visibleErrors.eq(0).inViewport()){
				$('.npi-modal .modal-content').animate({
				  scrollTop: visibleErrors.last().offset().top + visibleErrors.last().height()
				});
			}
          } else {
            if (result.result_count !== 0) {
              localStorage.res = JSON.stringify(result);
              $('#npi_res tbody').html(createTrTemplate(result.results, limit, 0));
              $(".form-block").hide();
              $(".results-block").show();
              $(".npi-modal .modal-content").removeClass("restrict-scroll");
              $(".no-results").removeClass("show");
            } else {
              $(".no-results").addClass("show");
            }
            if (result.result_count < 6) {
              $(".show-more").hide();
            } else if (result.result_count > 5) {
              $(".show-more").show(); //fallback when searching above 6 results
            }
          }
        }).fail(function(err){
			$(".npi-lookup-fail").show();
		});
      }
  })
});

$(document).on('click', '.add-form', function (e) {
  e.preventDefault();
  $('#NPI').val($(this).data('npiid')).attr("readonly", "");
  $('.form-control.first-name').val($(this).data('fnameid'));
  $('.form-control.last-name').val($(this).data('lnameid'));
  $('.form-control.optional-phone').val($(this).data('phoneid'));
  $('.form-control.adress-input').val($(this).data('adress'));
  $('.form-control.city-input').val($(this).data('cityid'));
  $('.form-control.zip-input').val($(this).data('zipid'));
  $('.form-control.state-input').val($(this).data('stateid')).attr("selected");

  $('#npimodal').modal('hide');
});

$(document).ready(function () {
  $('#npimodal').on('hide.bs.modal', function () {
    $(".form-block").show();
    $(".results-block").hide();
    $("#npimodal form").trigger('reset');
  })
});

$(document).on('click', '.show-more', function () {
  if (isAppend) {
    var res = JSON.parse(localStorage.res);
    limit = limit + step;
    if (limit >= res.results.length) {
      limit = res.results.length;
      isAppend = false;
      $(this).hide();
    }

    $('#npi_res tbody').append(createTrTemplate(res.results, limit, limit - step));

    //Require jQuery
    var scrollingElement = $('.results-table');
    $(scrollingElement).animate({
      scrollTop: document.body.scrollHeight
    }, 2000);
  }
});

var createTrTemplate = function (arr, arlimit, start) {
  if (arr.length < 5) {
    arlimit = arr.length;
  }
  var temp = '';
  for (var i = start; i < arlimit; i++) {
    var first_name = arr[i].basic.first_name || '';
    var middle_name = arr[i].basic.middle_name || '';
    var last_name = arr[i].basic.last_name || '';
    var credential = arr[i].basic.credential || '';
    var add_one = arr[i].addresses[0].address_1 || '';
    var add_two = arr[i].addresses[0].address_2 || '';
    var address_id = add_one + ", " + add_two;
    if (add_two == "") {
      address_id = add_one;
    }

    var zipTrunc = arr[i].addresses[0].postal_code.slice(0, 5);

    temp += '<tr>' +
    ' <td>' + arr[i].number + '</td>' +
    ' <td>' + first_name + ' ' + middle_name + ' ' + last_name + '<span><a href="#" ga-tag="internal" class="add-form" data-npiid="' + arr[i].number + '"  data-fnameid="' + first_name + '" data-lnameid="' + last_name + '"  data-phoneid="' + arr[i].addresses[0].telephone_number + '"data-adress="' + address_id + '"  data-cityid="' + arr[i].addresses[0].city + '" data-stateid="' + arr[i].addresses[0].state + '"  data-zipid="' + zipTrunc + '">Add to Form</a></span></td>' +
    '  <td>' + credential + '</td>' +
    ' <td>' + arr[i].addresses[0].city + ', ' + arr[i].addresses[0].state + ' ' + zipTrunc + '</td>' +
    '  <td><a href="#" ga-tag="submit" class="add-form" data-npiid="' + arr[i].number + '"  data-fnameid="' + first_name + '" data-lnameid="' + last_name + '"  data-phoneid="' + arr[i].addresses[0].telephone_number + '"data-adress="' + address_id + '"  data-cityid="' + arr[i].addresses[0].city + '" data-stateid="' + arr[i].addresses[0].state + '"  data-zipid="' + arr[i].addresses[0].postal_code + '">Add to form</a></td>' +
    '  </tr>'
  }
  return temp;
}
$(document).on('click', '.back-search', function (e) {
  e.preventDefault();
  $(".form-block").show();
  $(".results-block").hide();
});

/*npi modal*/

/*news-banner*/
$(document).ready(function () {
  // Show/hide news banner based on cookie
  var checkCookieHome = sessionStorage.getItem("newsBanner");
  if (checkCookieHome != "" && checkCookieHome != undefined) {
    if ($(".news-banner-wrapper").length > 0) {
      $(".news-banner-wrapper").hide();
    }
  } else {
    $(".news-banner-wrapper").show();
  }
  $('.news-banner-wrapper .news-banner-close').click(function () {
    // setCookie("newsBanner", "1");
    sessionStorage.setItem("newsBanner", "1");
    $(this).closest('.news-banner-wrapper').hide();
  });
  /*full-width-banner-arrow*/

  $('.banner-container .banner-arrow').on('click', function () {
    checkCookieHome = sessionStorage.getItem("newsBanner");
    var scrollposition = $(".banner-container").outerHeight();
    if (!$('.hz-header-wrap').hasClass('affix')) {
      scrollposition = $(".banner-container").outerHeight() + $('.hz-header-wrap').outerHeight();
    }
    if (checkCookieHome !== "1") {
      scrollposition = $(".banner-container").outerHeight() + ($('.hz-header-wrap').outerHeight() - $('.news-banner-wrapper').outerHeight());
    } else {
      scrollposition = $(".banner-container").outerHeight()
    }

    $('html, body').animate({
      scrollTop: scrollposition
    });
  });
});

/*news-banner*/
$(document).ready(function () {
  if ($('#schematype').val() && $('#schematype').val() == "faq") {
    $("html").attr("itemscope", '');
    $("html").attr("itemtype", "https://schema.org/FAQPage");
  }
});