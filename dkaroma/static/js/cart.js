$(document).ready(function() {

    const CART_VALUES = {
        max: 999
    };


    $('.js-quantity').inputFilter(function(value) {
        if (parseInt(value) < 1) {
            return 1;
        }
        return /^\d*$/.test(value); // Allow digits only, using a RegExp
    });

    $('.js-quantity').focusout(function() {

        if ($(this).val() == '' || parseInt($(this).val()) < 1) {
            $(this).val('1');
        }
    });


    $('.js-increment').click(function(e) {

        var quantityInput = $(this).siblings('.js-quantity');
        var availableQty = parseInt($(this).closest('.cart-product-quantity').find('[name=qty]').val());
        var pid = parseInt($(this).closest('.cart-product-quantity').find('[name=pid]').val());

        if (parseInt(quantityInput.val()) == availableQty) {
            return;
        }
        quantityInput.val(parseInt(quantityInput.val()) + 1);
        addProductToCart(pid, quantityInput.val());

    });

    $('.js-decrement').click(function(e) {

        var quantityInput = $(this).siblings('.js-quantity');
        var pid = parseInt($(this).closest('.cart-product-quantity').find('[name=pid]').val());

        if (parseInt(quantityInput.val()) - 1 < 1) {
            return;
        }
        quantityInput.val(parseInt(quantityInput.val()) - 1);
        addProductToCart(pid, quantityInput.val());

    });

    $('.js-remove-product-btn').on('click', function() {
        var pid = $(this).closest('.js-cart-row').find('[name=pid]').val();
        addProductToCart(pid, 0);

    });



    $(function() {

        refreshCart();

    });


    function refreshCart() {
        var cartItems = $('#cart--items-form .js-cart-items').find('.js-cart-row').length;

        if (cartItems == 0) {

            $('.shopping-cart-product-number ').addClass('hide');
            $('.shopping-cart-empty').removeClass('hide');
        } else {
            $('.page-layout-right').removeClass('hide');
            $('#cart--items-form').removeClass('hide');
            $('.cart-number').html(cartItems > 0 ? cartItems : '');
        }
    }

    function findProduct(id, pArray) {
        for (var i = 0; i < pArray.length; i++) {
            if (pArray[i].product_id == id) {
                return pArray[i];
            }
        }

        return null;
    }


    const URL_VALUES = {
        base_url: 'https://dk-aroma.odoo.com',
    };


    function addProductToCart(pid, qty) {

        var cartUrl = URL_VALUES.base_url + "/shop/cart/update_json";

        $.ajax({
            method: "POST",
            url: cartUrl,
            dataType: "json",
            data: { product_id: pid, set_qty: qty },

            success: function(data) {
                updateCart(pid);
            },

            error: function(data) {

            }
        });


    }



    function updateCart(pid) {

        var cartUrl = URL_VALUES.base_url + "/dkaroma/shop/get-cart";

        $.ajax({
            method: "GET",
            url: cartUrl,
            dataType: "json",

            success: function(data) {

                if (data.length == 0) {
                    refreshCart();
                    return;
                } else {

                    var productString = data.length > 1 ? 'products' : 'product';
                    $('.cart-number').html(data.length > 0 ? data.length : '');
                    $('.js-cart-product-number').html(data.length + ' ' + productString);
                }

                var productRow = null;
                var product = null;

                $('.js-cart-row').each(
                    function() {
                        if ($(this).find('[name=pid]').val() == pid) {
                            productRow = $(this);
                        }
                    }
                );

                if (productRow == null) {
                    return;
                }

                product = findProduct(pid, data);

                if (product == null) {
                    productRow.remove();
                } else {

                    $(productRow).find('.js-cart-product-price .price-total').html('$' + product.sub_total);
                }

                $('.js-order-value').html('$' + data[0].total);


            },

            error: function(data) {

            }
        });

    }


});