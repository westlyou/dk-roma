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
        api_url: 'https://dk-aroma.odoo.com'
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

            if (pageCount > 7) {
                $('.js-first-btn').css('display', 'inline-block');
            }
        }

        if (currentPage < lastPage) {
            //show next
            $('.js-next-btn').css('display', 'inline-block');

            if (pageCount > 7) {
                $('.js-last-btn').css('display', 'inline-block');
            }
        }

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

        var lastLink = $('.js-last-btn').attr('href');
        if (lastLink == '' || lastLink == null) {
            return;
        }

        var index = lastLink.lastIndexOf("page");
        if (index == -1) {
            return;
        }
        pageLink = lastLink.substring(0, index) + 'page/' + selectedPageInput;

        location.href = pageLink;

    });


    $('.dk-form').on('click', '.btn-add-to-cart', function(e) {
        var pid = $(this).closest('form').find('[name=pid]').val();

        addProductToCart(pid);

    });


});


// product item add to cart form onsubmit
function addToCart() {

    return false;
}