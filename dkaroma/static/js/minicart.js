$(document).ready(function() {


    requirejs(["ext/body-scroll-lock"], function(bodyScrollLock) {
        //This function is called when scripts/helper/util.js is loaded.
        //If util.js calls define(), then this function is not fired until
        //util's dependencies have loaded, and the util argument will hold
        //the module value for "helper/util".

        // const bodyScrollLock = require('body-scroll-lock');
        const disableBodyScroll = bodyScrollLock.disableBodyScroll;
        const enableBodyScroll = bodyScrollLock.enableBodyScroll;

        const targetElement = document.querySelector('.body-class');


        $('.js-filter-trigger-btn').click(function(e) {
            e.preventDefault();
            $('.filter-flyin').addClass('refinements-visible');
            $('.body-class').addClass('no-scroll');
        });

        $('.js-filter-x-close').click(function(e) {
            $('.filter-flyin').removeClass('refinements-visible');
            $('.body-class').removeClass('no-scroll');
        });

        $('.js-filter-overlay').click(function(e) {
            $('.filter-flyin').removeClass('refinements-visible');
            $('.body-class').removeClass('no-scroll');
        });


        $('.js-filter-item').click(function(e) {
            var check = $(this).find('.option');
            check.prop("checked", !check.prop("checked"));
        });


        $('.js-close-flyout').click(function(e) {
            $('.js-minicart-flyout-container').removeClass('open');
            $('.body-class').removeClass('no-scroll');
            $('.js-modal-overlay').removeClass('visible');
        });

        $('.js-open-minicart').click(function(e) {
            e.preventDefault();
            $('.js-minicart-flyout-container').addClass('open');
            disableBodyScroll(targetElement);
            $('.js-modal-overlay').addClass('visible');
        });

        $('.js-modal-overlay').click(function(e) {
            $('.flyout-container').removeClass('open');
            enableBodyScroll(targetElement);
            $('.js-modal-overlay').removeClass('visible');
        });



    });




});