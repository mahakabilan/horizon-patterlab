$(document).ready(function() {
  $(window).resize(function(e) {
    if ($(window).width() > 1024) {
      // Restoring back the action done to initial
      $('.logo').removeClass('hidden-mobile');
      $('.search-field').removeClass('full-width').find('input').removeClass('visible-mobile').val('');
      $('.menuIcon').removeClass('open');
      $('.nav-bar').removeClass('show');
      $('.menu-item-has-children > a').removeClass('expanded');
      // $('.slide').removeClass('visible-mobile');
    }
  });
  var dev_width = $(window).width();
  if (dev_width < 992) {
    // For small devices start
    $('.main-nav > .menu-item-has-children').not(".header-demo .slide .menu-item-has-children").click(function(e) {
      //e.stopPropagation();//why are we stopping the propagation?
      var $li = $(this),
        $e = $(e.target);
      if ($e.is("a") && $e.attr('href') === '#') {
        e.preventDefault();
      }
      if ($li.hasClass("mob-active")) {
        $li.addClass('isactive');
        $li.removeClass('mob-active');
      } else {
        $li.closest('.main-nav').find("> .menu-item-has-children").removeClass('mob-active');
        $li.removeClass('isactive');
        $li.addClass('mob-active');
      }
    });
    $(".header-demo .slide .menu-item-has-children").on("click", function(e) {
      e.stopPropagation();
      if ($(this).hasClass("mob-active")) {
        $(this).addClass('isactive');
        $(this).removeClass('mob-active');
      } else {
        $(".slide .menu-item-has-children").removeClass('mob-active');
        $(this).removeClass('isactive');
        $(this).addClass('mob-active');
      }
    });
    // For small devices end
  } else {
    // For Desktop start
    $(".header-demo .main-nav .slide > .menu-item-has-children").click(function(e) {
      e.stopPropagation();
      if ($(this).find('a:first').attr('href') === "#") {
        if ($(this).hasClass("mob-active")) {
          $(this).addClass('isactive');
          $(this).removeClass('mob-active');
        } else {
          $(".header-demo .slide .menu-item-has-children").removeClass('mob-active');
          $(this).removeClass('isactive');
          $(this).addClass('mob-active');
        }
      }
    });
    // For Desktop start
  }
  $('.nav ul li.active.menu-item-has-children').addClass("isactive").find(".slide").show();
  $('.nav ul li.menu-item-has-children > a').click(function(e) {
    e.preventDefault();
    $(this).parent("li").find('.slide').toggle('500');
    $(this).closest("li").siblings().find('.slide').hide('500');
    $(this).closest("li").siblings().removeClass("isactive");
    if ($(this).parent("li").hasClass('isactive')) {
      $(this).parent("li").removeClass('isactive');
    } else {
      $(this).parent("li").addClass('isactive');
    }
  });
});
