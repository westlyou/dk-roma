var controller = new ScrollMagic.Controller();

var pageEndPos = $('.js-extend-image-pin').offset().top / 1.2 + $('.js-extend-image-pin').outerHeight() / 5;
var offsetPos = $(window).innerHeight() / 3;

var scene1 = new ScrollMagic.Scene({
        triggerElement: ".js-scroll-magic-trigger", // point of execution
        duration: pageEndPos, // pin the element for a total of 400px
        offset: offsetPos
    })
    .setPin(".js-product-images", { pushFollowers: false }) // the element we want to pin
    .addTo(controller)
    .on("change progress", callback);

function callback(event) {
    // if (scene1.progress() > 0.2) {

    //     $('.js-product-details-container').addClass('opaque');
    // }

    // if (event.type == "leave") {
    //     $('.js-product-details-container').removeClass('opaque');
    // }

    // if (scene1.progress() == 1) {
    //     $('.js-product-details-container').removeClass('opaque');
    // }

    if (scene1.progress() > 0) {
        $('.js-product-details-container').addClass('opaque');
    }

    if (scene1.progress() == 1 || scene1.progress() < 0.2) {
        $('.js-product-details-container').removeClass('opaque');
    }

}

// $(document).foundation();
$('#product-details-tabs').foundation();

function addToCart() {
    return false;
}

$(document).ready(function() {


    $('.js-scroll-ingredients, .more').on('click', function() {

        $([document.documentElement, document.body]).animate({
            scrollTop: $('.js-product-tabs').offset().top - 200
        }, 500, function() {

            $('#ingredients').click();

        });


    });



    var utils = new Utils();

    $(window).scroll(function() {

        if (utils.isElementInView($('.js-how-to-use-block'), false) || utils.isElementInView($('.js-product-tabs'), false)) {
            $('.js-sticky-add-to-cart').addClass('show-bar');
        } else {
            $('.js-sticky-add-to-cart').removeClass('show-bar');
        }

    });

});