$(document).ready(function() {

    // if (window.matchMedia('(max-width: 768px)').matches) {

    // } else {
    //     $(function() {
    //         $('select').selectric();
    //     });
    // }

    $('select').selectric({ disableOnMobile: false, nativeOnMobile: false });

    // $('.selectric-wrapper').click(function(e) {
    //     alert('I see click');
    // });

    // $('.selectic-custom-select').on('click touchstart', function() {
    //     alert('I see');
    // });

    $('.nav-item-link').click(function(e) {
        e.preventDefault();

        if (e.target !== this) return;
        // if ($(this).hasClass('nav-first-layer')) return;
        var parent = $(this).parent();

        $('#navbarNavDropdown').find('.selected').toggleClass('selected');
        $(this).toggleClass('selected');
        $(parent).find('.nav-desktop-layer').addClass('visible');
        $(parent).find('.nav-desktop-layer').addClass('opened');
        $(parent).find('.close-desktop-nav').css('display', 'inline-block');
        $('.body-class').addClass('no-scroll');

    });

    $('.nav-desktop-overlay').click(function(e) {
        e.preventDefault();

        if (e.target !== this) return;
        var parent = $(this).parent();

        $(parent).toggleClass('visible');
        $(parent).toggleClass('opened');


        var overParent = $(parent).parent();
        $(overParent).find('.visible').toggleClass('visible');
        $(overParent).find('.opened').toggleClass('opened');
        $(overParent).find('.selected').toggleClass('selected');
        $(overParent).find('.active').toggleClass('active');

        $('.body-class').removeClass('no-scroll');

    });

    $('.return-scroll').click(function(e) {

        e.preventDefault();
        // if (e.target !== this) return;

        $('.body-class').removeClass('no-scroll');

    });


    $('.close-desktop-nav').click(function(e) {
        e.preventDefault();

        // if (e.target !== this) return;
        var overParent = $(this).parent().parent();

        $(overParent).toggleClass('visible');
        $(overParent).toggleClass('opened');

        var parent = $(overParent).parent();
        $(parent).find('.selected').toggleClass('selected');
        $(parent).find('.active').toggleClass('active');

        var firstLayerParent = $(parent).parent().parent().parent();
        if (!firstLayerParent) return;
        $(firstLayerParent).children('button.close-desktop-nav').css('display', 'inline-block');


    });


    $('.inner-nav-link').hover(function(e) {
        e.preventDefault();

        if (e.target !== this) return;
        // if ($(this).hasClass('nav-first-layer')) return;
        var parent = $(this).parent();
        var overParent = $(parent).parent();
        var firstLayerParent = $(overParent).parent().parent();

        $(overParent).find('.visible').toggleClass('visible');
        $(overParent).find('.opened').toggleClass('opened');
        $(overParent).find('.active').toggleClass('active');

        $(this).toggleClass('active');
        $(parent).find('.nav-desktop-subnav-wrap').toggleClass('visible');
        $(parent).find('.nav-desktop-subnav-wrap').toggleClass('opened');

        $(firstLayerParent).children('button.close-desktop-nav').css('display', 'none');

    });


    $('.nav-item-link').click(function(e) {
        e.preventDefault();

        if (e.target !== this) return;
        var parent = $(this).parent();

        $(parent).children('.nav-mobile-layer').toggleClass('visible');

    });

    $('.nav-mobile-subnav-link').click(function(e) {
        // e.preventDefault();

        if (e.target !== this) return;
        var parent = $(this).parent();

        $(parent).children('.nav-mobile-layer').toggleClass('visible');

    });

    $('.nav-back').click(function(e) {
        e.preventDefault();

        if (e.target !== this) return;
        var parent = $(this).parent();

        $(parent).toggleClass('visible');

    });

    $('.nav-toggle').click(function(e) {
        e.preventDefault();

        // if (e.target !== this) return;
        var parent = $(this).parent();
        $(parent).find('.nav-mobile').toggleClass('visible');

        $('.body-class').toggleClass('no-scroll');
    });

    $('#searchInputToggle').click(function(e) {

        e.preventDefault();

        $('#headerActionLinks').addClass('search-expand');
        $('#headerSearch').addClass('focus-visible');
        $('#closeSearchButton').css('display', 'inline-block');
        $('#navToggleButton').addClass('fade-out');
        $('#headerLogo').addClass('fade-out');
    });

    $('#closeSearchButton').click(function(e) {

        e.preventDefault();

        $('#headerActionLinks').removeClass('search-expand');
        $('#headerSearch').removeClass('focus-visible');
        $('#closeSearchButton').css('display', 'none');
        $('#navToggleButton').removeClass('fade-out');
        $('#headerLogo').removeClass('fade-out');
    });

    // $('.nav-item').click(function(e) {
    //     e.preventDefault();

    //     $(this).find('#productDiv').toggleClass('visible');
    //     $(this).find('#productDiv').toggleClass('opened');

    //     var con = $(this).find('#productDiv');
    //     if (!con) return;

    //     var firstLayer = $(con).find('.nav-first-layer');
    //     if (!firstLayer) return;

    //     if (con.hasClass('visible')) {
    //         firstLayer.css('left', 0);
    //     } else {
    //         firstLayer.css('left', '-50%');
    //     }

    //     firstLayer.on("transitionEnd webkitTransitionEnd onTransitionEnd MSTransitionEnd", function() {
    //         $(this).find('#productDiv').toggleClass('visible');
    //         $(this).find('#productDiv').toggleClass('opened');
    //     });

    // });



});

function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
}