$(document).ready(function() {


    // document.getElementById('form').onsubmit = function(e){
    //     if(!validateForm()){

    //     }
    // }





});


function validateForm() {


    if (!validateEmptyString($('#email'))) {

        return false;
    }

    if (!validateEmail($('#email'))) {
        return false;
    }

    return true;
}

$('.js-account-back').click(function() {
    validateForm();
});