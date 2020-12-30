(function($) {
    $.fn.inputFilter = function(inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    };
}(jQuery));



$('.inputfield-text').on('focusin', function() {
    var error = $(this).siblings('.error-message');

    $(error)
        .find('span')
        .remove();

    $(this).removeClass('error-text');
});

function validateEmptyString(input) {
    var trimmedValue = jQuery.trim(input.val());
    var isValid = trimmedValue.length > 0;
    toggleValidationError(input, isValid, isValid ? '' : 'Field cannot be empty');
    return isValid;
}

function validateEmptyPassword(input) {
    var isValid = input.val().length > 0;
    toggleValidationError(input, isValid, isValid ? '' : 'Field cannot be empty');
    return isValid;
}

function validateEmail(input) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var isValid = regex.test(input.val());
    toggleValidationError(input, isValid, isValid ? '' : 'Please enter a valid email address');
    return isValid;
}


function toggleValidationError(input, value, message) {
    var errorClasses = 'masked error js-validator-error error-text';

    var error = input.siblings('.error-message');

    if (!value) {

        if (error.find('span').length == 0) {
            error.append(
                `<span class="error js-validator-error error-text">
                    ${message}
                </span>`
            );
        }

        input.addClass(errorClasses);

        $([document.documentElement, document.body]).animate({
            scrollTop: input.parent().offset().top - 200
        }, 500);


    } else {
        $(error)
            .find('span')
            .remove();

        input.removeClass(errorClasses);
    }

}


function makeFieldReadOnly(input) {
    input.addClass('read-only');
    input.attr('readonly', true);
}


function startLoader(input) {
    input.addClass('btn--disabled button-loading');
    input.find('.loader-container').addClass('loader-visible');
}

function stopLoader(input) {
    input.removeClass('btn--disabled button-loading');
    input.find('.loader-container').removeClass('loader-visible');
}