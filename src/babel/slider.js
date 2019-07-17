const $ = require('jquery');
require('slick-carousel');

module.exports = () => { 
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
        autoplay: false,
        autoplaySpeed: 2500,
        focusOnSelect: false,
    });
    $('.topper-slider .slide').css('display', 'flex'); 
} 
