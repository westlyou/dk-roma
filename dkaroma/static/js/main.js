$(document).ready(function() {



});

//Filter and Minicart
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
        disableBodyScroll(targetElement);
    });

    $('.js-filter-x-close').click(function(e) {
        $('.filter-flyin').removeClass('refinements-visible');
        enableBodyScroll(targetElement);
    });

    $('.js-filter-overlay').click(function(e) {
        $('.filter-flyin').removeClass('refinements-visible');
        enableBodyScroll(targetElement);
    });


    $('.js-filter-item').click(function(e) {
        var check = $(this).find('.option');
        check.prop("checked", !check.prop("checked"));
    });


    $('.js-close-flyout').click(function(e) {
        $('.js-minicart-flyout-container').removeClass('open');
        enableBodyScroll(targetElement);
        $('.js-modal-overlay').removeClass('visible');
    });

    $('.js-open-minicart').click(function(e) {
        $('.js-minicart-flyout-container').addClass('open');
        disableBodyScroll(targetElement);
        $('.js-modal-overlay').addClass('visible');
    });

    $('.js-modal-overlay').click(function(e) {
        $('.flyout-container').removeClass('open');
        enableBodyScroll(targetElement);
        $('.js-modal-overlay').removeClass('visible');
    });

    function openMiniCart() {
        $('.js-minicart-flyout-container').addClass('open');
        disableBodyScroll(targetElement);
        $('.js-modal-overlay').addClass('visible');
    }


    $(function() {
        getCartProducts();
    });


});

const API_VALUES = {
    base_url: 'https://dk-aroma.odoo.com',
};

function getCartProducts() {

    var cartUrl = API_VALUES.base_url + "/dkaroma/shop/get-cart";

    $.ajax({
        method: "GET",
        url: cartUrl,
        dataType: "json",

        success: function(data) {

            $('.js-minicart-flyout-container .wrapper--minicart__list').append(
                addMiniCartItems(data)
            );

            if (data.length == 0) {
                $('.js-minicart-empty').removeClass('hide');
                $('.js-minicart-not-empty').addClass('hide');

            } else {
                var productString = data.length > 1 ? 'products' : 'product';
                $('.cart-number').html(data.length > 0 ? data.length : '');
                $('.js-selected-products').html(data.length + ' ' + productString);

                $('.js-total-price').html('$' + data[0].total);
                $('.js-minicart-flyout-checkout').removeClass('hide');
            }

        },

        error: function(data) {

        }
    });


}

function addMiniCartItems(data) {

    $('.js-minicart-flyout-container .wrapper--minicart__list').find('.mini-cart-product').remove();

    var items = data.map(function(value) {

        var quantity = value.quantity;
        var productUrl = '/shop/product/' + value.product_id;
        var subtotal = '$' + value.sub_total;

        return `

        
        <div class="mini-cart-product">
            
            <div class="mini-cart-info">
                <div class="mini-cart-small-title">
                    <!-- Five Element Essential Oils -->
                </div>

                <div class="mini-cart-name mini-cart-product-name">
                    <a href="${productUrl}" class="">
                        ${value.product_name}
                    </a>
                </div>

                <div class="mini-cart-attributes">
                </div>

                <div class="mini-cart-details-bottom">
                    <div class="mini-cart-pricing">
                        <span class="label">
                            Quantity:
                        </span>

                        <span class="value">
                            ${quantity}
                        </span>
                    </div>

                    <div class="mini-cart-price-wrapper js-mini-cart-price-wrapper">
                        <span class="mini-cart-price">
                           ${subtotal}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        
        `;
    }).join('');


    return items;

}