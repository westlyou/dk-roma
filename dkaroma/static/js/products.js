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

    const URL_VALUES = {
        base_url: 'https://dk-aroma.odoo.com/dkaroma'
    };

    var currentPage = parseInt($('#currentPage').val());
    var lastPage = parseInt($('#lastPage').val());
    var pageCount = parseInt($('#pageCount').val());

    $(function() {

        if (pageCount > 1) {
            $('.js-paginator').css('display', 'block');
        } else {
            return;
        }

        $('.js-paginator-list li').each(function() {
            if (parseInt(jQuery.trim($(this).children('a').text())) == currentPage) {
                $(this).addClass('active-page');
            }
        });

        if (currentPage > 1) {
            // show prev
            $('.js-prev-btn').css('display', 'inline-block');
        }

        if (currentPage < lastPage) {
            //show next
            $('.js-next-btn').css('display', 'inline-block');
        }

        console.log('here 2');
    });

    $('#pageInput').inputFilter(function(value) {
        if (parseInt(value) < 1 || parseInt(value) > lastPage) {
            return currentPage;
        }

        return /^\d*$/.test(value);
    });

    $('#pageInput').focusout(function() {

        if ($(this).val() == '' || parseInt($(this).val()) < 1 || parseInt($(this).val()) > lastPage) {
            $(this).val(currentPage);
        }
    });


    $('.js-mobile-page-btn').on('click', function() {
        var selectedPageInput = parseInt($('#pageInput').val());
        if (selectedPageInput == currentPage) {
            return;
        }

        var pageLink = '';

        $('.js-paginator-list li').each(function() {
            if (parseInt(jQuery.trim($(this).children('a').text())) == selectedPageInput) {
                console.log($(this).children('a').attr('href'));
                pageLink = $(this).children('a').attr('href');
            }
        });

        location.href = URL_VALUES.base_url + pageLink;

    });


});


// product item add to cart form onsubmit
function addToCart() {

    var form = $(this).closest('form');

    return false;
}