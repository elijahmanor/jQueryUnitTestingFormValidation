
var notificationModule = (function () {
    var public = {},
        contentSelector = "#main",
        blockOptions = { message: '<div style="padding-top: 8px; padding-bottom: 5px;"><img style="padding-right: 15px;" src="' + basePath + 'content/images/ajax-loader-progress-bar.gif" /></div>' };

    public.init = function () {
        public.initAjaxBlocking();
    };

    public.initAjaxBlocking = function () {
        $(contentSelector)
            .ajaxStart(function () {
                $.blockUI(blockOptions);
            })
            .ajaxStop(function () {
                $.unblockUI();
            });
    };

    public.notify = function (title, type, text, icon) {
        $.pnotify({
            pnotify_title: title,
            pnotify_type: type,
            pnotify_text: text,
            pnotify_notice_icon: 'ui-icon ' + icon,
            pnotify_history: false
        });
    };

    public.displayMessage = function (success, message) {
        public.displayMessages(success, [{ Description: message}]);
    };

    public.displayMessages = function (success, messages) {
        var icon = success ? 'ui-icon-info' : 'ui-icon-alert';
        var type = success ? 'notice' : 'error';
        var length = messages.length;
        for (var i = 0; i < length; ++i) {
            public.notify(success ? 'Success' : 'Error', type, messages[i].Description, icon);
        }
    };

    return public;
} ());