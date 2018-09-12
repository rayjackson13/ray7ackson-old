$(document).ready(function(){
    $('.topper-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        speed: 500,
        prevArrow: $('.topper-content .arrow-left'),
        nextArrow: $('.topper-content .arrow-right'),
        dots: true,
        appendDots: $('.topper-content .dots'),
        dotsClass: 'slider-dots',
        autoplay: true,
        autoplaySpeed: 2500,
    });
});