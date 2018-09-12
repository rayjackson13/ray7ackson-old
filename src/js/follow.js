$(document).ready(function(){
    $follow = $('.header-follow');
    $header = $('.header-follow > .navbar');
    $follow.waypoint(function(){
        $header.addClass('fixed-top');
    }, {
        offset: '-1px',
    });
    $follow.waypoint(function(){
        $header.removeClass('fixed-top');
    }, {
        offset: '0px',
    });
});