$(document).ready(function() {
  handleCarousel();
});

var carousel;
function handleCarousel () {
  var option = {};
  carousel = $("#carousel").waterwheelCarousel(option);
}

function carouselNext () {
  carousel.next();
}

function carouselPrev () {
  carousel.pev();
}
