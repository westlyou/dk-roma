$(document).ready(function() {

    getProducts();

    $('select').selectric({ disableOnMobile: false, nativeOnMobile: false });


    $('.nav-item-link').click(function(e) {
        openNav(e, this);
    });

    function openNav(e, item) {
        e.preventDefault();

        if (e.target !== item) return;
        // if ($(this).hasClass('nav-first-layer')) return;
        var parent = $(item).parent();

        $('#navbarNavDropdown').find('.selected').toggleClass('selected');
        $(item).toggleClass('selected');
        $(parent).find('.nav-desktop-layer').addClass('visible');
        $(parent).find('.nav-desktop-layer').addClass('opened');
        $(parent).find('.close-desktop-nav').css('display', 'inline-block');
        $('.body-class').addClass('no-scroll');
    }

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
        $('.body-class').removeClass('no-scroll');

    });


    // Nav Links

    $('.nav-desktop-layer .nav-inner-subnav').on('click mouseover', '.inner-nav-link', function(e) {

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

    $('.nav-desktop-layer').on('click', '.close-desktop-nav', function(e) {
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


    $('.nav-item-link').on('click', function(e) {
        openMobileNav(e, this);
    });


    function openMobileNav(e, item) {
        e.preventDefault();

        if (e.target !== item) return;
        var parent = $(item).parent();

        $(parent).children('.nav-mobile-layer').toggleClass('visible');

        $(parent).siblings().children('.nav-desktop-layer.visible.opened').find('.nav-desktop-overlay').click(); //
        $('.body-class').addClass('no-scroll');
    }

    $('.nav-mobile-layer .js-nav-mobile-subnav').on('click', '.nav-mobile-subnav-link', function(e) {

        if (e.target !== this) return;
        var parent = $(this).parent();

        $(parent).children('.nav-mobile-layer').toggleClass('visible');

    });

    $('.nav-mobile-layer').on('click', '.nav-back', function(e) {
        e.preventDefault();

        if (e.target !== this) return;
        var parent = $(this).parent();

        $(parent).toggleClass('visible');

    });



    $('.nav-toggle').click(function(e) {
        e.preventDefault();

        var parent = $(this).parent();
        $(parent).find('.nav-mobile').toggleClass('visible');

        $('.body-class').toggleClass('no-scroll');
    });

    function activateSearch() {

        $('#headerActionLinks').addClass('search-expand');
        $('#headerSearch').addClass('focus-visible');
        $('#closeSearchButton').css('display', 'inline-block');
        $('#navToggleButton').addClass('fade-out');
        $('#headerLogo').addClass('fade-out');
    }

    function deactivateSearch() {

        $('#headerActionLinks').removeClass('search-expand');
        $('#headerSearch').removeClass('focus-visible');
        $('#closeSearchButton').css('display', 'none');
        $('#navToggleButton').removeClass('fade-out');
        $('#headerLogo').removeClass('fade-out');
    }

    $('#searchInputToggle').click(function(e) {
        var searchInput = $('#headerSearch');
        if (!searchInput.hasClass('focus-visible') || searchInput.val().length == 0) {
            e.preventDefault();
            activateSearch();
            searchInput.focus();
        }

    });

    $('#closeSearchButton').click(function(e) {

        e.preventDefault();
        deactivateSearch();
    });

    $('#headerSearch').on('focus', function() {

        activateSearch();

    });

    $('#headerSearch').on('focusout', function() {

        if ($('#headerSearch').val().length == 0) {
            deactivateSearch();
        }

    });


    // translations
    $('.js-header-top-bar .menu-top').on('click', '.js-lang-en', function() {
        setLanguage(LANG_KEYS.en);
    });

    $('.js-header-top-bar .menu-top').on('click', '.js-lang-ch', function() {
        setLanguage(LANG_KEYS.ch);
    });

    $('.js-header-top-bar .menu-top').on('click', '.js-lang-zh', function() {
        setLanguage(LANG_KEYS.zh);
    });


});




// Requests

function getProducts(category) {

    var url = 'https://dk-aroma.odoo.com/dkaroma/shop/get-child-categories?parent=';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                // unsuccesful request
            }
            return response.json();
        })
        .then(data => {

            let categoryRequests = [];
            let categoryResults = [];

            data.forEach((category) => {

                let param = encodeURIComponent(category.name);
                var subCategoryUrl = url + param;
                categoryRequests.push(getData(subCategoryUrl));
            });

            Promise.all(categoryRequests).then((allCategoryData) => {
                data.forEach((category, index) => {
                    categoryResults.push({
                        category: category,
                        subCategories: allCategoryData[index].sort((a, b) => (a.sequence > b.sequence) ? 1 : -1)
                    });
                });

                categoryResults.sort((a, b) => (a.category.sequence > b.category.sequence) ? 1 : -1);
                createProductMenu(categoryResults);
                $('#mobile-category-accordion').foundation();
            });



        })
        .catch(error => {
            console.log(error);
        });

}


function getData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                resolve(data);
            });
    });
}



const urlPaths = {
    products: '/shop/category/'
};

function createProductMenu(results) {

    results.forEach((item) => {

        let category = item.category;
        // let subCategories = item.subCategories.map((item) => item.name);
        let subCategories = item.subCategories;

        $('.js-dekstop-product-nav .nav-desktop-layer .nav-inner-subnav').append(
            renderList(category, subCategories)
        );

        $('.js-mobile-product-nav .nav-mobile-layer .js-nav-mobile-subnav').append(
            renderMobileList(category, subCategories)
        );

        $('.category-accordion .js-category-accordion-inner').append(
            renderFooterList(category, subCategories)
        );

        $('.mobile-category-accordion .accordion').append(
            renderMobileFooterList(category, subCategories)
        );

    });
}


function renderMobileFooterList(category, subCategories) {

    var createMobileSubCategories = subCategories.map(function(value) {

        // let param = encodeURIComponent(value);
        var link = urlPaths.products + value.id;
        return `

        <li>
            <a href="${link}"> 
                ${value.name}
            </a>
        </li>
        
        `;
    }).join('');

    headerLink = urlPaths.products + category.id;

    return `
    
        <li class="accordion-item" data-accordion-item>
    
            <a class="accordion-title" href="${headerLink}">${category.name}</a>

            <div class="accordion-content" data-tab-content>
                <ul>
                    ${createMobileSubCategories}
                </ul>
            </div>
     </li>


    `;

}

function renderFooterList(category, subCategories) {

    var createSubCategories = subCategories.map(function(value) {

        // let param = encodeURIComponent(value);
        var link = urlPaths.products + value.id;
        return `

        <li>
            <a href="${link}" class="accordion-link-inner "> 
                ${value.name}
            </a>
        </li>
        
        `;
    }).join('');

    headerLink = urlPaths.products + category.id;

    return `

    <div class="col-3 col-md-3 col-sm-12 item-holder">

        <div class="accordion-inner ">

            <a class="accordion-head-inner center-mobile" href="${headerLink}">
                ${category.name}
            </a>

            <div class="accordion-content-inner accordion-content ">

                <ul>
                    ${createSubCategories}
                </ul>

            </div>

        </div>

    </div>
    
    `;

}

function renderList(category, subCategories) {

    var navItem = function() {

        var className = '';
        var navLink = '';

        if (subCategories.length > 0) {
            className = 'inner-nav-link';
        } else {
            // let param = encodeURIComponent(category);
            navLink = urlPaths.products + category.id;
        }

        return `
        <a class="nav-link ${className} nav-mobile-subnav-link" href="${navLink}">
            <span>
                ${category.name}
            </span>
        </a>
      `;
    };


    var innerDesktopList = subCategories.map(function(value) {
        // let param = encodeURIComponent(value);
        var link = urlPaths.products + value.id;
        return `
                <li>
                    <a class="nav-link nav-desktop-subnav-link" href="${link}">
                        <span>${value.name}</span>
                    </a>
                </li>
        `;
    }).join('');


    return `
    
            <li>
                ${navItem()}
                <div class="nav-desktop-subnav-wrap">

                    <div class="nav-desktop-subnav-slide-in">

                        <button type="button" class="close-desktop-nav" style="display:inline-block;">
                                <span class="sr-only">Close navigation</span>
                                <img src="/dkaroma/static/img/icons/x.svg" width="24" height="24" class="d-inline-block align-baseline" alt="" loading="lazy">
                            </button>


                        <div class="nav-desktop-subnav-inner">

                            <ul class="nav-desktop-subnav">
                                ${innerDesktopList}
                            </ul>

                        </div>

                        <span class="bottom-gradient-el">
                            </span>
                    </div>

                </div>
            </li>

    
    `;
}

function renderMobileList(category, subCategories) {


    var innerMobileList = subCategories.map(function(value) {
        // let param = encodeURIComponent(value);
        var link = urlPaths.products + value.id;

        return `
        <li>
            <a class="nav-mobile-subnav-link" href="${link}">
                    ${value.name}
                </a>
        </li>
        `;
    }).join('');

    var createChildrenLists = function() {

        if (subCategories.length > 0) {
            return `
            <div class="nav-mobile-layer">

                <button type="button" class="nav-back">
                        <span class="sr-only"> 
                            Back
                        </span>
                    </button>

                <div class="nav-mobile-layer-inner">
                    <ul class="nav-mobile-subnav">
                        ${innerMobileList}
                    </ul>
                </div>

                <span class="bottom-gradient-el">

                    </span>

            </div>
            `;
        } else {
            return '';
        }

    };


    var navItem = function() {

        var navLink = '';
        var itemHead = '';
        var hasChildren = '';

        if (subCategories.length > 0) {
            hasChildren = 'has-children';
            itemHead = `
                <button type="button" class="nav-mobile-subnav-link">
                    <span>${category.name}</span>
                </button>
            `;

        } else {
            // let param = encodeURIComponent(category);
            navLink = urlPaths.products + category.id;
            itemHead = `
                <a class="mobile-third-level" href="${navLink}">
                    ${category.name}
                </a>
            `;

        }

        return `
       
        <li class="${hasChildren}">
                ${itemHead}
                ${createChildrenLists()}
            </li>
      `;
    };


    return navItem();

}