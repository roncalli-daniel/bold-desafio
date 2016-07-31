/**
Base Controller
**/
var App = {
    settings: {
        production: false
    },

    request_params: {
        url: null,
        type: 'POST',
        dataType: 'json',
        callback_success: null,
        callback_error: null,

        success: function (data) {
            App.request_process(data, this.callback_success, this.callback_error);
        },

        error: function (xhr, ajaxOptions, thrownError) {
            App.request_error();
        }
    },

    request: function (params) {
        var p = jQuery.extend({}, this.request_params, params);
        jQuery.ajax(p);
    },

    request_process: function (data, callback_success, callback_error) {
        try {
            if (data.status) {
                this.custom_success(data);

                if (callback_success)
                    callback_success(data);
            }
            else
                if (callback_error)
                    callback_error(data);
                else
                    this.custom_error(data);
        }
        catch (err) {
            this.request_error({ error: err });
        }
    },

    request_error: function (data) {
        this.custom_error();
    },

    custom_success: function (data, callback) {
        if (data)
            if (data.message)
                toastr.success(data.message);
            else
                if (callback)
                    callback();
                else
                    if (callback)
                        callback();
    },

    custom_error: function (data, callback) {
        if (!data)
            toastr.error('Ocorreu um erro na solicitação... tente novamente.', callback);
        else {
            if (data.error) {
                toastr.error(data.error, callback);
            }
        }
    },

    ajaxLoad: function () {
        jQuery(document)
		  .ajaxStart(function () {
              jQuery.blockUI({
                  message: '<div class="loading-message loading-message-boxed"><img src="../assets/imgs/loading_spinner.gif" align=""><span>&nbsp;&nbsp; Aguarde...</span></div>',
                  css: {
                      border: '0',
                      padding: '0',
                      backgroundColor: 'none'
                  },
                  overlayCSS: {
                      backgroundColor: '#F9F9F9',
                      opacity: 0.1,
                      cursor: 'wait'
                  }
              });
		  })
		  .ajaxStop(function () {
              jQuery.unblockUI();
		  });
    },

    execute_func_by_name: function (functionName, context /*, args */) {
        try {
            var args = [].slice.call(arguments).splice(2);
            var namespaces = functionName.split(".");
            var func = namespaces.pop();

            for(var i = 0; i < namespaces.length; i++) {
                context = context[namespaces[i]];
            }
            
            return context[func].apply(this, args);
        }
        catch (err) {
            this.request_error({ error: err });
        }
    },

    execute_action_by_name: function (functionName, context, obj) {
        try {
            return App.execute_func_by_name(functionName, context, obj)
        }
        catch (err) {
            this.request_error({ error: err });
        }
    },

    triggers: {
        links: function () {
            $(".alk-link").click(function () {
                App.execute_action_by_name($(this).attr('data-a'), window, this);
            });
        },

        submits: function () {
            $(".alk-submit").validate({ ignore: [] });

            $(".alk-submit").submit(function () {
                App.execute_action_by_name($(this).attr('data-a'), window, this);
                return false;
            });
        },

        asubmits: function () {
            $(".alk-asubmit").validate({ ignore: [] });

            $(".alk-asubmit").submit(function () {
                var callback = null;

                if ($(this).hasClass('alk-msg-custom')) {
                    callback = function (data) {
                        App.funcs.renderFlashMessage(data.data.flash);
                    }
                }

                if ($(this).valid()) {
                    var params = {
                        url: $(this).attr('data-u'),
                        data: $(this).serialize(),
                        callback_success: callback
                    };

                    App.request(params);
                }

                return false;
            });
        }
    },

    init: function () {
        this.ajaxLoad();
    }
}

App.init();