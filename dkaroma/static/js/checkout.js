$(document).ready(function() {

    $('select').selectric({ disableOnMobile: false, nativeOnMobile: false });


    toggleCityField();

    $('#location').selectric({

        onChange: function() {
            toggleCityField();
        }

    });


    function toggleCityField() {

        var result = isCityAvailable($('#location').val());

        if (result.isAvailable) {

            $('.js-district-input-row').removeClass('hide');

            var data = result.cities.map(function(value) {
                return `<option>${value}</option>`;
            }).join('');

            $('#district')
                .find('option')
                .remove();
            // .end()
            // .append('<option value="whatever">text</option>')
            // .val('whatever');

            $('#district').append(data).selectric();

        } else {
            $('.js-district-input-row').addClass('hide');
        }
    }


    // returns object, {bool, []}
    function isCityAvailable(location) {

        //check if city available

        return {
            isAvailable: true,
            cities: ['Lagos', 'Apapa', 'Oshodi']
        };
    }



    function validateForm() {

        if (!validateEmptyString($('#name'))) {
            return false;
        }

        if (!validateEmptyString($('#address'))) {
            return false;
        }

        if (!validateEmptyString($('#phoneNumber'))) {
            return false;
        }

        return true;
    }


    var utils = new Utils();

    $(window).scroll(function() {

        if (utils.isElementInView($('.js-main-footer'), false) || utils.isElementInView($('.js-header'), false)) {
            $('.js-checkout-sticky-bar').removeClass('show-bar');
        } else {
            $('.js-checkout-sticky-bar').addClass('show-bar');
        }

    });


    $('.input-radio').change(function() {
        var selectedOption = $("input[name='paymentOption']:checked").val();
        $('#selectedPaymentMethod').val(selectedOption);

        if (selectedOption == 'bank') {
            $('.js-bank .js-method-extra').addClass('expand');
        } else {
            $('.js-bank .js-method-extra').removeClass('expand');
        }

    });




    function animateMoveToNext(step) {
        $('html').animate({
            scrollTop: 0
        }, 700, function() {
            setDeliveryInfo();
            moveToStep(step);
        });

    }

    function setDeliveryInfo() {
        $('.checkout-review-box-user-address .name').html($('#name').val());
        $('.checkout-review-box-user-address .location').html($('#location').val());
        $('.checkout-review-box-user-address .district').html($('#district').val());
        $('.checkout-review-box-user-address .address').html($('#address').val());
        $('.checkout-review-box-user-address .number').html($('#phoneNumber').val());
    }




    function moveToStep(step) {

        var value = parseInt(step);
        if (value == 1) return;
        var prevStepName = `.js-step-${value-1}`;
        var prevStepContent = `.js-step-${value-1}-content`;

        var stepName = `.js-step-${value}`;
        var stepContent = `.js-step-${value}-content`;

        $(prevStepContent).addClass('hide');
        $(prevStepName).removeClass('selected current');

        $(stepName).removeClass('disabled');
        $(stepName).addClass('selected current');
        $(stepContent).removeClass('hide');

        switch (value) {
            case 2:
                $('.js-checkout-sticky-button').html('Continue to payment');
                break;
            case 3:
                $('.js-checkout-sticky-button').html('Proceed to payment');
                break;
        }
    }




    $('.js-checkout-back').click(function() {
        moveBack();
        currentStep -= 1;
    });

    $('.js-review-edit-address').click(function() {
        moveBack();
        currentStep -= 1;
    });

    $('.js-step-1-continue-btn').click(function() {
        if (!validateForm()) { return; }
        animateMoveToNext(currentStep + 1);
        currentStep += 1;
    });

    $('.js-step-2-continue-btn').click(function() {
        animateMoveToNext(currentStep + 1);
        currentStep += 1;
    });


    $('.js-checkout-sticky-button').click(function() {
        animateMoveToNext(currentStep + 1);
        currentStep += 1;
    });


});

var currentStep = 1;

function moveBack() {
    var value = currentStep;
    if (value == 1) return;
    var newStep = value - 1;

    var prevStepName = `.js-step-${value}`;
    var prevStepContent = `.js-step-${value}-content`;

    var stepName = `.js-step-${newStep}`;
    var stepContent = `.js-step-${newStep}-content`;

    $(prevStepContent).addClass('hide');
    $(prevStepName).removeClass('selected current');
    $(prevStepName).addClass('disabled');

    $(stepContent).removeClass('hide');
    $(stepName).addClass('selected current');

    switch (newStep) {
        case 1:
            $('.js-checkout-sticky-button').html('Continue to review');
            break;
        case 2:
            $('.js-checkout-sticky-button').html('Continue to payment');
            break;
    }

}


if (window.history && window.history.pushState) {

    history.pushState("nohb", null, "");
    $(window).on("popstate", function(event) {

        if (currentStep == 1) {
            window.history.back();
        } else {

            if (currentStep > 1) {
                moveBack();
                currentStep -= 1;
            }

            if (!event.originalEvent.state) {
                history.pushState("nohb", null, "");
                return;
            }
        }

    });

}