$(document).ready(function(){
  $('.cystinosis-carousal').slick({
    infinite: false,
    dots:true,
    prevArrow:"<a href='#' class='prev-arrow'><img src='../../images/starterkit/control-left.svg' alt='prev arrow'></a>",
    nextArrow:"<a href='#' class='next-arrow'><img src='../../images/starterkit/control-right.svg' alt='next arrow'></a>"
  });
    $('.featured-content-carousel .image-carousal').not('.slick-initialized').slick({
    infinite: true,
    dots: true,
    prevArrow: "<a href='#' class='prev-arrow'><img src='../../images/starterkit/arrow-left.png' alt='prev arrow'></a>",
    nextArrow: "<a href='#' class='next-arrow'><img src='../../images/starterkit/arrow-right.png' alt='next arrow'></a>",
    appendArrows: ".slider-arrow-container"
	});
});