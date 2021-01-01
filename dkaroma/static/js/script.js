var $grid;

var gutterSize = 30;
if (window.matchMedia('(max-width: 1024px)').matches && window.matchMedia('(min-width: 768px)').matches) {
    gutterSize = 10;
}

if (window.matchMedia('(min-width: 1024px)').matches) {
    gutterSize = 30;
}

if (window.matchMedia('(max-width: 767px)').matches) {
    gutterSize = 10;
    // itemFitWidth = true;
}


function getColumnWidthSelector() {

    if ($('.search-result-items').children().length == 1) {
        return '.search-result-items.grid-wrap .item:nth-of-type(1)';
    }

    return '.search-result-items.grid-wrap .item:nth-of-type(2)';
}

$grid = $('.search-result-items');

// $('.search-result-items').masonry({
//     // set itemSelector so .grid-sizer is not used in layout
//     itemSelector: '.search-result-items.grid-wrap .item',
//     // use element for option
//     columnWidth: getColumnWidthSelector(),
//     percentPosition: true,
//     horizontalOrder: true,
//     gutter: gutterSize,
//     transitionDuration: '0.9s',
//     stagger: 30
// });

$('.search-result-items').imagesLoaded(function() {
    $grid.masonry();
});


$(window).on('load', function() {
    $(window).trigger('scroll');
    $('.search-result-items').masonry({
        // set itemSelector so .grid-sizer is not used in layout
        itemSelector: '.search-result-items.grid-wrap .item',
        // use element for option
        columnWidth: getColumnWidthSelector(),
        percentPosition: true,
        horizontalOrder: true,
        gutter: gutterSize,
        transitionDuration: '0.9s',
        stagger: 30
    });
});

$(document).ready(function() {


    $(window).resize(function() {

        var gutterSize = 30;

        if (window.matchMedia('(max-width: 1024px)').matches && window.matchMedia('(min-width: 768px)').matches) {
            gutterSize = 10;
        }

        if (window.matchMedia('(min-width: 1024px)').matches) {
            gutterSize = 20;
        }

        if (window.matchMedia('(max-width: 767px)').matches) {
            gutterSize = 10;
        }

        $grid.masonry({
            gutter: gutterSize
        });

        $grid.masonry('layout');
    });

    // var gutterSize = 30;

    // if (window.matchMedia('(max-width: 1024px)').matches && window.matchMedia('(min-width: 768px)').matches) {
    //     gutterSize = 20;
    // }

    // if (window.matchMedia('(max-width: 767px)').matches) {
    //     gutterSize = 0;
    // }

    // $('.search-result-items').masonry({
    //     // set itemSelector so .grid-sizer is not used in layout
    //     itemSelector: '.search-result-items.grid-wrap .item',
    //     // use element for option
    //     columnWidth: '.search-result-items.grid-wrap .fixed-item',
    //     percentPosition: true,
    //     horizontalOrder: true,
    //     gutter: gutterSize
    // });






});