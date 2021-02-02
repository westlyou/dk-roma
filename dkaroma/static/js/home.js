$("#topSlider").imagesLoaded(function() {

    $('.js-top-slider').insertAfter($('.js-top-skeleton'));
    $('.js-top-skeleton').remove();
    $('.js-top-slider').removeClass('hide');

    var topSlider = $("#topSlider").lightSlider({
        autoWidth: false,

        mode: "slide",
        useCSS: true,
        cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
        easing: 'linear',

        pager: false,

        enableTouch: true,
        enableDrag: true,
        freeMove: true,
        controls: false,

        gallery: true,
        item: 5,
        galleryMargin: 10,
        slideMargin: 20,

        responsive: [{
                breakpoint: 2561,
                settings: {
                    item: 6,
                    slideMargin: 10,
                    slideMove: 1
                }
            },

            {
                breakpoint: 1441,
                settings: {
                    item: 4,
                    slideMargin: 10,
                    slideMove: 1
                }
            },

            {
                breakpoint: 1281,
                settings: {
                    item: 4,
                    slideMargin: 10,
                    slideMove: 1
                }
            },


            {
                breakpoint: 1025,
                settings: {
                    item: 3,
                    slideMove: 1,
                    slideMargin: 6,
                }
            },


            {
                breakpoint: 768,
                settings: {
                    item: 1,
                    slideMove: 1,
                    slideMargin: 0,
                }
            },

        ]

    });

    $('#leftTopSliderBtn').click(function() {
        topSlider.goToPrevSlide();
    });

    $('#rightTopSliderBtn').click(function() {
        topSlider.goToNextSlide();
    });


    $(function() {
        refreshSliderButtons($('#topSlider'));
    });

    $(window).resize(function() {
        refreshSliderButtons($('#topSlider'));
    });

});


$("#promotionSlider").imagesLoaded(function() {

    $('.js-promotion-slider').insertAfter($('.js-promotion-skeleton'));
    $('.js-promotion-skeleton').remove();
    $('.js-promotion-slider').removeClass('hide');

    var promotionSlider = $("#promotionSlider").lightSlider({
        autoWidth: false,

        mode: "slide",
        useCSS: true,
        cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
        easing: 'linear',

        pager: false,

        enableTouch: true,
        enableDrag: true,
        freeMove: true,
        controls: false,

        gallery: true,
        item: 5,
        galleryMargin: 10,
        slideMargin: 20,

        responsive: [{
                breakpoint: 2561,
                settings: {
                    item: 6,
                    slideMargin: 10,
                    slideMove: 1
                }
            },

            {
                breakpoint: 1441,
                settings: {
                    item: 4,
                    slideMargin: 10,
                    slideMove: 1
                }
            },

            {
                breakpoint: 1281,
                settings: {
                    item: 4,
                    slideMargin: 10,
                    slideMove: 1
                }
            },


            {
                breakpoint: 1025,
                settings: {
                    item: 3,
                    slideMove: 1,
                    slideMargin: 6,
                }
            },


            {
                breakpoint: 768,
                settings: {
                    item: 1,
                    slideMove: 1,
                    slideMargin: 0,
                }
            },

        ],


    });



    $('#leftPromotionSliderBtn').click(function() {
        promotionSlider.goToPrevSlide();
    });

    $('#rightPromotionSliderBtn').click(function() {
        promotionSlider.goToNextSlide();

    });

    $(function() {
        refreshSliderButtons($('#promotionSlider'));
    });

    $(window).resize(function() {
        refreshSliderButtons($('#promotionSlider'));
    });

});

function refreshSliderButtons(sliderObject) {


    var productsCount = sliderObject.find('li').length;

    var buttons = sliderObject.closest('.product-list-slider').find('.drag-list-controls').find('button');

    buttons.removeClass('hide');

    if (productsCount <= 6 && window.matchMedia('(min-width: 1441px)').matches) {
        buttons.addClass('hide');
    }

    if (productsCount <= 4 && window.matchMedia('(min-width: 1280px)').matches && window.matchMedia('(max-width: 1440px)').matches) {
        buttons.addClass('hide');
    }

    if (productsCount <= 3 && window.matchMedia('(min-width: 1024px)').matches && window.matchMedia('(max-width: 1280px)').matches) {
        buttons.addClass('hide');
    }

    if (productsCount <= 3 && window.matchMedia('(min-width: 768px)').matches && window.matchMedia('(max-width: 1023px)').matches) {
        buttons.addClass('hide');
    }

    if (productsCount <= 2 && window.matchMedia('(max-width: 767px)').matches) {
        buttons.addClass('hide');
    }


}

(function($) {

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *     the user visible viewport of a web browser.
     *     only accounts for vertical position, not horizontal.
     */

    $.fn.visible = function(partial) {

        var $t = $(this),
            $w = $(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

    };

})(jQuery);

var win = $(window);

var allMods = $(".module");

allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
        el.addClass("already-visible");
    }
});

win.scroll(function(event) {

    allMods.each(function(i, el) {
        var el = $(el);
        if (el.visible(true)) {
            el.addClass("come-in");
        }
    });

});

(function($) {

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *     the user visible viewport of a web browser.
     *     only accounts for vertical position, not horizontal.
     */

    $.fn.visible = function(partial) {

        var $t = $(this),
            $w = $(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

    };

})(jQuery);

var win = $(window);

var allMods = $(".module");

allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
        el.addClass("already-visible");
    }
});

win.scroll(function(event) {

    allMods.each(function(i, el) {
        var el = $(el);
        if (el.visible(true)) {
            el.addClass("come-in");
        }
    });

});