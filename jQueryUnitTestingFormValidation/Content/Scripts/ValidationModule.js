
var validationModule = (function () {
    var public = {};

    public.init = function () {
    };

    public.clearValidationMessages = function () {
        $(".input-validation-error").removeClass("input-validation-error");
        $("span.field-validation-error span").hide();
    }

    return public;
} ());