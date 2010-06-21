
/// <reference path="jquery-1.4.1-vsdoc.js" />

var contactCreateModule = (function () {
    var public = {},
        dialogWidth = 800;

    public.createDialog;
    public.createPost;

    public.init = function () {
        public.createDialog = $("#createDialog");
        public.createPost = $("#createPost");

        public.initEventHandlers();
    };

    public.initEventHandlers = function () {
        public.initToolbar();

        public.initDialog();
    };

    public.initToolbar = function () {
        $("#toolbar button").button();

        $("#createContact").click(function () {
            public.displayCreate();
        });
    };

    public.initDialog = function () {
        $(".datePicker").datepicker();

        public.createDialog.dialog({
            autoOpen: false
            , width: dialogWidth
            , modal: true
            , open: validationModule.clearValidationMessages
            , buttons: {
                "Cancel": function () {
                    public.createDialog.dialog("close");
                },
                "Save": function () {
                    if (public.createPost.valid()) {
                        public.createDialog.dialog("close");
                        public.postContact();
                    }
                }
            }
        });
    };

    public.displayCreate = function () {
        public.createDialog
            .dialog("open")
            .find("input:first")
            .focus();
    };

    public.postContact = function (callback) {
        $.ajaxSettings.traditional = true;
        $.ajax({
            url: public.createPost.attr("action"),
            data: public.createPost.serialize(),
            type: "POST",
            success: function (data, textStatus, xhr) {
                public.postContactSuccess(data, textStatus, xhr);
                callback(data && data.Success);
            },
            error: public.postContactError
        });
    };

    public.postContactSuccess = function (data, textStatus, xhr) {
        if (data && data.Success) {
            commonModule.displayMessage(true, "Your contact has been created!");
        } else {
            commonModule.displayMessages(data.Success, data.Messages);
        }
    };

    public.postContactError = function (xhr, textStatus, error) {
        var errorMessage = exception ? exception : xhr.statusText;
        commonModule.displayMessage(false, "There was an error creating your contact: " + errorMessage);
    };

    return public;
} ());
