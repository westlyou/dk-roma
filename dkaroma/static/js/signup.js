$(document).ready(function() {

    const indicator = $(".indicator");
    const input = $("#password");
    const weak = $(".weak");
    const medium = $(".medium");
    const strong = $(".strong");
    const veryStrong = $(".very-strong");
    const text = $(".text");
    const feedback = $(".feedback-suggestion");
    const label = $(".password-label");

    $('#password').on('keyup focusout', function(e) {
        if (input.val() != "") {
            indicator.css('display', 'block');
            indicator.css('display', 'flex');
            label.css('display', 'inline-block');

            var result = zxcvbn(input.val());
            no = result.score;

            if (no == 0 || no == 1) {
                weak.addClass("active");
                text.css('display', 'inline-block');
                text.html('very weak');
                text.addClass("weak");
            }
            if (no == 2) {
                medium.addClass("active");
                text.css('display', 'inline-block');
                text.html("weak");
                text.addClass("medium");
            } else {
                medium.removeClass("active");
                text.removeClass("medium");
            }
            if (no == 3) {
                weak.addClass("active");
                medium.addClass("active");
                strong.addClass("active");
                text.css('display', 'inline-block');
                text.html("strong");
                text.addClass("strong");
            } else {
                strong.removeClass("active");
                text.removeClass("strong");
            }

            if (no == 4) {
                weak.addClass("active");
                medium.addClass("active");
                strong.addClass("active");
                veryStrong.addClass("active");
                text.css('display', 'inline-block');
                text.html("very strong");
                text.addClass("very-strong");

            } else {
                veryStrong.removeClass("active");
                text.removeClass("very-strong");
            }

            feedback.html(`${result.feedback.warning} ${result.feedback.suggestions}`);
        } else {
            indicator.css('display', 'none');
            text.css('display', 'none');
            feedback.css('display', 'none');
            label.css('display', 'none');
        }


    });


});


function validatePasswordStrength() {
    var result = zxcvbn($('#password').val());
    isValid = false;
    if (result.score >= 3) {
        isValid = true;
    }

    toggleValidationError($('#password'), isValid, isValid ? '' : 'Please enter a password of sufficient strength');

    return isValid;
}


function validateConfirmPassword() {
    var isValid = false;
    if ($('#password').val() == $('#confirmPassword').val()) {
        isValid = true;
    }
    toggleValidationError($('#confirmPassword'), isValid, isValid ? '' : 'Your password does not match');
    return isValid;
}

function validateForm() {


    if (!validateEmptyString($('#email'))) {
        return false;
    }

    if (!validateEmptyString($('#username'))) {
        return false;
    }

    if (!validateEmptyPassword($('#password'))) {
        return false;
    }

    if (!validatePasswordStrength()) {
        return false;
    }

    if (!validateConfirmPassword()) {
        return false;
    }


    return true;
}

function setPasswordIncorrect() {
    toggleValidationError($('#password'), false, 'Password incorrect');
}

$('.js-toggle-password-visibility').on('click', function() {

    var passwordFieldType = $(this).parent().find('.js-password').attr('type') === 'password' ? 'text' : 'password';
    $(this).parent().find('.js-password').attr('type', passwordFieldType);

    $(this).toggleClass('password-visible');

});


$('.back-button').on('click', function() {
    window.history.back();
});

$('.js-signup-submit').on('click', function(e) {

    if (!validateForm()) {
        e.preventDefault();
    }

});