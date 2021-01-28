$(document).ready(function() {

    var utils = new Utils();

    var isBannerElementInView = utils.isElementInView($('#productBanner'), false);
    var isBannerAnimated = false;




    $(window).scroll(function() {
        if (isScrolledIntoView('.search-results-header')) {
            // alert('I am here')
            $('.search-results-header').removeClass('sticky-filters');
            $('.search-results-header').removeClass('sticky-filters-visible');
        } else {
            $('.search-results-header').addClass('sticky-filters');
            $('.search-results-header').addClass('sticky-filters-visible');
        }


        if (utils.isElementInView($('#productBanner'), false)) {

            if (!isBannerAnimated) {
                isBannerAnimated = true;
                animateCSS('#productBanner', 'pulse');
            }

        } else {
            isBannerAnimated = false;
        }

    });


    $('.cop-filters-list li').on('click', function() {

        var selectedTag = jQuery.trim($(this).children('a').text());

        $('.cop-filters-list li').each(function() {
            if (jQuery.trim($(this).children('a').text()) == selectedTag) {
                $(this).addClass('selected');
            }
        });

    });


    $('.remove-filter').on('click', function(e) {
        e.stopPropagation();

        var selectedTag = jQuery.trim($(this).siblings('a').html());

        $('.cop-filters-list li').each(function() {
            if (jQuery.trim($(this).children('a').text()) == selectedTag) {
                $(this).removeClass('selected');
            }
        });

    });

});


// product item add to cart form onsubmit
function addToCart() {

    var form = $(this).closest('form');

    return false;
}