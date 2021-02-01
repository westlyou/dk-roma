$(document).ready(function() {

});

function validateForm() {


    if (!validateEmptyString($('#email'))) {
        return false;
    }

    if (!validateEmptyString($('#username'))) {
        return false;
    }

    // if (!validateEmail($('#email'))) {
    //     return false;
    // }

    if (!validateEmptyPassword($('#password'))) {
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