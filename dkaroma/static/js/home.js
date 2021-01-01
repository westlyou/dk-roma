$(document).ready(function() {



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
                    item: 8,
                    slideMargin: 10,
                    slideMove: 1
                }
            },

            {
                breakpoint: 1441,
                settings: {
                    item: 5,
                    slideMargin: 10,
                    slideMove: 1
                }
            },

            {
                breakpoint: 1281,
                settings: {
                    item: 5,
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
                    item: 8,
                    slideMargin: 10,
                    slideMove: 1
                }
            },

            {
                breakpoint: 1441,
                settings: {
                    item: 5,
                    slideMargin: 10,
                    slideMove: 1
                }
            },

            {
                breakpoint: 1281,
                settings: {
                    item: 5,
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


    $('#leftTopSliderBtn').click(function() {
        topSlider.goToPrevSlide();
    });

    $('#rightTopSliderBtn').click(function() {
        topSlider.goToNextSlide();
    });

    $('#leftPromotionSliderBtn').click(function() {
        promotionSlider.goToPrevSlide();
    });

    $('#rightPromotionSliderBtn').click(function() {
        promotionSlider.goToNextSlide();

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